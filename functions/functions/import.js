const functions = require('firebase-functions')
const admin = require('firebase-admin')
const _ = require('lodash')
const moment = require('moment')
require('moment/locale/de')
moment.locale('de')

const db = admin.firestore()
const auth = admin.auth()
const users = require('../data/users.json')
const breaks = require('../data/breaks.json')
const rents = require('../data/rents.json')
const { getAllUser, checkUsersBills } = require('../util/bills')
const { calcRentAsCents } = require('../util/helpers')
const { mailOptions, sendMail } = require('../util/mail-config')

const createBillWithoutRentsNoMail = (data, uid) => {
    return db.collection('users/' + uid + '/bills')
        .add(data)
}

const finalizeBillWithRentsNoMail = (data, path) => {

    const userRents = []
    return db.collection(path + '/rents').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const { datum, end, start, onlyGuests, player1, player2 } = doc.data()
                userRents.push({ datum, end, start, onlyGuests, player1, player2 })
            })
            const visitorSales = userRents.map(r => {
                return calcRentAsCents(r.end, r.start, r.onlyGuests)
            }).reduce((total, current) => total + current, 0)
            data.visitorSales = visitorSales
            data.rents = userRents
            return db.doc(path).update(data)
        })
}


const getBillDate = (date) => {
    return moment(date).endOf('month').hour(12).toDate()
}

const getBillDateStart = (date) => {
    return moment(date).endOf('month').startOf('day').toDate()
}

const getBillDateEnd = (date) => {
    return moment(date).endOf('month').endOf('day').toDate()
}

const saveNewRent = (rent, uid) => {
    return db.collectionGroup('bills').where('_member', '==', uid).where('billDate', '>=', getBillDateStart(rent.datum)).where('billDate', '<=', getBillDateEnd(rent.datum)).get()
        .then((snapShot) => {
            if (snapShot.size === 0) return db.collection('users/' + uid + '/bills').add({
                _member: uid,
                billDate: getBillDate(rent.datum)
            })
            if (snapShot.size > 1) {
                console.log(uid, rent)
                throw new Error(snapShot.size + ' bills found. Only one needed')
            }

            return snapShot.docs[0].ref
        }).then(doc => doc.collection('/rents').add(rent))
}

exports.sendInvitations = functions.region("europe-west1").https.onRequest((req, res) => {
    const promises = []
    users.filter(user => user.isBoardMember || user.aktiv)
        .forEach(user => {
            promises.push(auth.generateSignInWithEmailLink(user.email, {
                url: 'https://snooker-nb.de/manage'
            }).then(link => {
                const opts = mailOptions.getSignInLinkMailOptions(user.username, link)
                return sendMail(user.email, opts)
            }))
        })
    return Promise.all(promises)
        .then(() => {
            res.json('invitations sent')
        })
})

exports.createBills = functions.region('europe-west1').https.onRequest((req, res) => {
    getAllUser()
        .then(users => checkUsersBills(users))
        .then((billsToWrite) => {
            const promises = []
            billsToWrite.forEach(bill => {
                if (bill.type === 'create') {
                    promises.push(createBillWithoutRentsNoMail(bill.data, bill.data._member))
                }
                if (bill.type === 'finalize') {
                    promises.push(finalizeBillWithRentsNoMail(bill.data, bill.path))
                }
            })
            return Promise.all(promises)
        })
        .then(() => {
            res.json('Bills created')
        })
        .catch(err => {
            functions.logger.error('Error while creating bills', err)
            res.status(500).json({ msg: 'Error while creating bills', error: err })
        })

})

exports.cleanup = functions.region('europe-west1').https.onRequest((req, res) => {
    const promises = []
    db.collection('users').get()
        .then(snapshots => {
            snapshots.forEach(snap => {
                promises.push(snap.ref.update({
                    _id: admin.firestore.FieldValue.delete()
                }))
            })
            return Promise.all(promises)
        })
        .then(() => res.json('ids deleted'))
        .catch(err => {
            console.error(err)
            res.status(500).send('error deleting ids')
        })
})


exports.rents = functions.region('europe-west1').https.onRequest((req, res) => {
    const us = []
    const saveNextRent = (index) => {
        const uid = us.filter(u => _.isEqual(u._id, rents[index]._member))[0].uid
        const data = {
            datum: new Date(rents[index].datum.$date),
            start: moment(rents[index].start.$date.$numberLong ? parseInt(rents[index].start.$date.$numberLong) : rents[index].start.$date).toDate(),
            end: moment(rents[index].ende.$date.$numberLong ? parseInt(rents[index].ende.$date.$numberLong) : rents[index].ende.$date).toDate(),
            player1: rents[index].player1,
            player2: rents[index].player2,
            onlyGuests: rents[index].onlyGuests,
            _member: uid
        }
        return saveNewRent(data, uid).then(doc => {
            index++;
            if (index < rents.length) {
                return saveNextRent(index)
            } else {
                return console.log(rents.length + ' abgespeichert')
            }
        })
    }
    db.collection('users').get().then(querySnapshot => {
        querySnapshot.forEach(snap => us.push({ ...snap.data(), uid: snap.id }))
        return saveNextRent(0)
    })
        .then((refs) => {
            res.json('Rents imported. Check the database')
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
})

exports.breaks = functions.region('europe-west1').https.onRequest((req, res) => {
    const us = []
    const promises = []
    db.collection('users').get().then(querySnapshot => {
        querySnapshot.forEach(snap => us.push({ ...snap.data(), uid: snap.id }))
        for (let br of breaks) {
            const data = {
                player: br.player,
                "break": br.break,
                datum: new Date(br.datum.$date),
            }
            if (br._member) data._member = us.filter(u => _.isEqual(u._id, br._member))[0].uid
            promises.push(db.collection('breaks').add(data))
        }
        return Promise.all(promises)
    })
        .then(() => res.json('Breaks imported. Check the database'))
        .catch(err => res.status(500).json(err))
})

exports.users = functions.region('europe-west1').https.onRequest((req, res) => {
    const uids = []
    const promises = []

    users.forEach(user => {
        const { email, username } = user

        promises.push(auth.createUser({
            email,
            displayName: username
        }))
    })

    return Promise.all(promises)
        .then(records => {
            const promises = []
            for (let rec of records) {
                const data = { ...users.filter(user => user.email === rec.email)[0] }
                delete data.bills
                delete data.memberships
                delete data.email
                delete data.password
                delete data.username
                delete data.__v
                uids.push(rec.uid)
                promises.push(db.collection('users').doc(rec.uid).set(data))
            }
            return Promise.all(promises)
        })
        .then((writes) => {
            const promises = []
            for (let uid of uids) {
                promises.push(db.collection('users').doc(uid).get())
            }
            return Promise.all(promises)
        })
        .then(snapshots => {
            const promises = []
            snapshots.forEach(snap => {
                const rec = snap.data()
                const mems = users.filter(u => {
                    return _.isEqual(u._id, rec._id)
                })[0].memberships
                mems.forEach(mem => {
                    const data = { fee: mem.membershipFee, type: mem.membershipType }
                    if (mem.membershipEnd.$date !== "1970-01-01T00:00:00Z") {
                        data.end = new Date(mem.membershipEnd.$date)
                    }
                    data.start = new Date(mem.membershipStart.$date)
                    promises.push(db.collection('users/' + snap.id + '/memberships').add(data))
                })
            })
            return Promise.all(promises)
        })
        .then(() => res.json({ msg: 'Users imported. Check the database' }))
        .catch(err => {
            functions.logger.error(err)
            res.status(500).json(err)
        })

})