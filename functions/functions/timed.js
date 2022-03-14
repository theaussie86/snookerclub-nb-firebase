const functions = require('firebase-functions');
const { getAllUser, checkUsersBills, createBillWithoutRents, finalizeBillWithRents } = require('../util/bills');

exports.scheduledFunction = functions.region('europe-west1').pubsub.schedule('0 2 2 * *').timeZone('Europe/Berlin').onRun((context) => {
    return getAllUser()
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
            console.log('Bills created')
            return null
        })
        .catch(err => {
            console.error('Error while creating bills', err)
            return null
        })
});