const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { middleware, cors } = require('../util/middleware.js')
const { mailOptions, sendMail } = require('../util/mail-config')
const { getAllUser, checkUsersBills, createBillWithoutRents, finalizeBillWithRents } = require('../util/bills')
const { encrypt, decrypt } = require('../util/crypto.js')
const db = admin.firestore()
const superAdminIds = functions.config().admin.superadmins.split(',')

exports.fetchBillFromLink = functions.region('europe-west1').https.onRequest((req, res) => {
    return cors(req, res, () => {
        const { content, iv, tag } = req.body
        const message = decrypt(content, iv, tag)
        const userId = message.split(',')[0]
        const billId = message.split(',')[1]
        const promises = []
        promises.push(db.doc('users/' + userId).get())
        promises.push(db.doc('users/' + userId + '/bills/' + billId).get())
        return Promise.all(promises).then((snapshots) => {
            const data = {}
            snapshots.forEach((snap, i) => {
                if (i === 0) data['user'] = snap.data()
                if (i === 1) data['bill'] = snap.data()
            })
            res.json(data)
        }).catch(err => console.error(err))
    })
})

exports.createBills = functions.region('europe-west1').https.onRequest(middleware((req, res) => {
    if (superAdminIds.indexOf(req.user.user_id) === -1) throw new functions.https.HttpsError('permission-denied', 'You must be a superadmin to call this function')
    getAllUser()
        .then(users => checkUsersBills(users))
        .then((billsToWrite) => {
            const promises = []
            billsToWrite.forEach(bill => {
                if (bill.type === 'create') {
                    promises.push(createBillWithoutRents(bill.data, bill.data._member, bill.displayName, bill.email))
                }
                if (bill.type === 'finalize') {
                    promises.push(finalizeBillWithRents(bill.data, bill.path, bill.displayName, bill.email, bill.uid, bill.billDate))
                }
            })
            return Promise.all(promises)
        })
        .then((snapshots) => {
            res.json('Bills created')
        })
        .catch(err => {
            functions.logger.error('Error while creating bills', err)
            res.status(500).json({ msg: 'Error while creating bills', error: err })
        })
}))

exports.createUser = functions.region('europe-west1').https.onRequest(middleware((req, res) => {
    if (!req.user.admin) res.status(403).send('Unauthorized - no admin')
    const actionCodeSettings = {
        url: req.body.origin + "/activate",
    };
    let user
    admin.auth().createUser({
        email: req.body.email,
        displayName: req.body.displayName,
    }).then((userRecord) => {
        functions.logger.info({
            user: userRecord,
        });
        user = userRecord
        return admin.auth()
            .generateSignInWithEmailLink(
                req.body.email,
                actionCodeSettings);
    }).then((link) => {
        const opts = mailOptions.getSignInLinkMailOptions(user.displayName, link)
        sendMail(user.email, opts)
        return admin.firestore().collection('users').doc(user.uid).set({ link })
    }).then((doc) => {
        res.send({ doc });
    }).catch(error => {
        functions.logger.warn('Fehler bei Anlage des Users', error)
        res.status(500).send(error)
    });
}));

exports.getAllUsers = functions.region('europe-west1').https.onRequest(middleware((req, res) => {
    if (!req.user.admin) res.status(403).send('Unauthorized - not an admin')
    return admin.auth().listUsers().then((getUsersResult) => {
        functions.logger.info('Fetched all users')
        res.send(getUsersResult.users)
    }).catch((err) => {
        functions.logger.error('Error fetching all users:', err)
        res.status(500).send(err)
    })
}))

exports.setAsAdmin = functions.region('europe-west1').https.onRequest(middleware((request, response) => {
    if (superAdminIds.indexOf(request.user.user_id) === -1) throw new functions.https.HttpsError('permission-denied', 'You must be a superadmin to call this function')
    const uid = request.body.uid
    admin.auth().setCustomUserClaims(uid, { admin: true })
        .then(() => response.send("Adminrechte vergeben"))
        .catch((error) => {
            console.log(error);
            response.status(500).send(error);
        });
}));

exports.deleteAdminRights = functions.region('europe-west1').https.onRequest(middleware((request, response) => {
    if (superAdminIds.indexOf(request.user.user_id) === -1) throw new functions.https.HttpsError('permission-denied', 'You must be a superadmin to call this function')
    const uid = request.body.uid
    admin.auth().setCustomUserClaims(uid, null)
        .then(() => response.send("Adminrechte entzogen"))
        .catch((error) => {
            console.log(error);
            response.status(500).send(error);
        });
}));