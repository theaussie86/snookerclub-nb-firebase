const admin = require('firebase-admin')
const { encrypt } = require('./crypto')
const { convertTimestampToMoment, calcRentAsCents, getMembershipFeeOfFollowingMembership } = require('../util/helpers')
const moment = require('moment')
const { mailOptions, sendMail } = require('./mail-config')
require('moment/locale/de')

moment.locale('de')
const db = admin.firestore()
const auth = admin.auth()

module.exports = {
    getAllUser: () => {
        let users = []
        return auth.listUsers()
            .then(usersResult => {
                users = usersResult.users.map(u => ({
                    uid: u.uid,
                    displayName: u.displayName,
                    email: u.email
                }))
                return db.collection('users').get()
            })
            .then(snapshot => {
                const promises = []
                snapshot.forEach(rec => {
                    let id = rec.id
                    let data = rec.data()
                    promises.push(db.collection('users/' + id + '/memberships').get())
                    users.map(u => {
                        if (u.uid === id) {
                            u.data = data
                        }
                        return u
                    })
                })
                return Promise.all(promises)
            })
            .then(memSnapshots => {
                const promises = []
                users.forEach(u => {
                    promises.push(db.collection('users/' + u.uid + '/bills').get())
                })
                memSnapshots.forEach(snap => {
                    if (!snap.empty) {
                        snap.forEach(mem => {
                            users.map(u => {
                                if (mem.ref.path.indexOf(u.uid) > -1) {
                                    if (!u.memberships) u.memberships = []
                                    u.memberships.push(mem.data())
                                }
                                return u
                            })
                        })
                    }
                })
                return Promise.all(promises)
            })
            .then(billSnapshots => {
                billSnapshots.forEach(snap => {
                    if (!snap.empty) {
                        snap.forEach(bill => {
                            users.map(u => {
                                if (bill.ref.path.indexOf(u.uid) > -1) {
                                    if (!u.bills) u.bills = []
                                    u.bills.push({
                                        path: bill.ref.path,
                                        ...bill.data()
                                    })
                                }
                                return u
                            })
                        })
                    }
                })
                return users
            })
    },
    checkUsersBills: (users) => {
        const billsToWrite = []
        for (let user of users) {

            const { bills, memberships, displayName, email } = user
            const finalizedBillDates = bills ?
                bills
                    .filter(b => b.membershipFee)
                    .map(b => convertTimestampToMoment(b.billDate).endOf('month').format('DD.MM.YYYY'))
                : []

            const openBillDates = bills ? bills
                .filter(b => !b.membershipFee)
                .map(b => convertTimestampToMoment(b.billDate).endOf('month').format('DD.MM.YYYY'))
                : []

            for (let mem of memberships) {

                let start = convertTimestampToMoment(mem.start).hour(12)
                let end = mem.end ? convertTimestampToMoment(mem.end) : moment().date(0)
                let current = moment(start).date(0)

                while (current.isSameOrBefore(end, 'day')) {

                    const isEndOfMembership = (mem.end && current.isSame(convertTimestampToMoment(mem.end), 'day'))

                    if (finalizedBillDates.indexOf(moment(current).endOf('month').format('DD.MM.YYYY')) > -1) {
                        current.add(1, 'month').endOf('month').hour(12)
                        continue
                    }
                    if (openBillDates.indexOf(moment(current).endOf('month').format('DD.MM.YYYY')) > -1) {
                        const thisBill = bills.filter(b => moment(current).endOf('month').isSame(convertTimestampToMoment(b.billDate).endOf('month'), 'day'))[0]
                        billsToWrite.push({
                            type: 'finalize',
                            path: thisBill.path,
                            uid: thisBill._member,
                            displayName,
                            email,
                            billDate: convertTimestampToMoment(thisBill.billDate).toDate(),
                            data: {
                                membershipFee: isEndOfMembership ? getMembershipFeeOfFollowingMembership(mem.end, memberships) : mem.fee,
                                feePaid: isEndOfMembership ? true : false,
                                salesPaid: false
                            }
                        })
                    } else {
                        billsToWrite.push({
                            type: 'create',
                            displayName,
                            email,
                            data: {
                                billDate: moment(current).toDate(),
                                membershipFee: isEndOfMembership ? getMembershipFeeOfFollowingMembership(mem.end, memberships) : mem.fee,
                                feePaid: isEndOfMembership ? true : false,
                                salesPaid: true,
                                visitorSales: 0,
                                _member: user.uid
                            }
                        })
                    }
                    current.add(1, 'month').endOf('month').hour(12)
                }
            }
        }
        return billsToWrite
    },
    createBillWithoutRents: (data, uid, username, email) => {
        return db.collection('users/' + uid + '/bills')
            .add(data).then(docRef => {
                const id = docRef.id
                const hash = encrypt(data._member + ',' + id)
                const link = `https://snooker-nb.de/bills/${hash.content}/${hash.iv}/${hash.tag}`
                const options = mailOptions.getBillsMailOptions(username, link, data.billDate)
                return sendMail(email, options)
            })
    },
    finalizeBillWithRents: (data, path, username, email, uid, billDate) => {

        const id = path.split('/')[path.split('/').length - 1]
        console.log(id, uid)
        const hash = encrypt(uid + ',' + id)
        const link = `https://snooker-nb.de/bills/${hash.content}/${hash.iv}/${hash.tag}`
        const options = mailOptions.getBillsMailOptions(username, link, billDate)
        sendMail(email, options)

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
}