const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { middleware } = require('./middleware')

exports.getAllUsers = functions.region('europe-west1').https.onRequest(middleware((req, res) => {
    return admin.auth().listUsers().then((getUsersResult) => {
        functions.logger.info('Fetched all users')
        res.send(getUsersResult.users)
    }).catch((err) => {
        functions.logger.error('Error fetching all users:', err)
        res.status(500).send(err)
    })
}))

exports.getUserByEmail = functions.region('europe-west1').https.onRequest(middleware((req, res) => {
    const email = req.query.email;
    admin.auth().getUserByEmail(email).then((user) => {
        functions.logger.info({
            email,
        });
        res.send(user);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
}));