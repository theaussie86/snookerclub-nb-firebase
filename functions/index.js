const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.setAsAdmin = functions.https.onRequest((request, response) => {
    const email = request.query.email;
    admin.auth().getUserByEmail(email).then((user) => {
        functions.logger.info({
            email,
            user,
        });
        return admin.auth().setCustomUserClaims(user.uid, { admin: true });
    }).then(() => response.send("Adminrechte vergeben")).catch((error) => {
        console.log(error);
        response.status(500).send(error);
    });
});

exports.getUserByEmail = functions.https.onRequest((request, response) => {
    const email = request.query.email;
    admin.auth().getUserByEmail(email).then((user) => {
        functions.logger.info({
            email,
        });
        response.send(user);
    }).catch((error) => {
        console.log(error);
        response.status(500).send(error);
    });
});

exports.deleteAdminRights = functions.https.onRequest((request, response) => {
    const email = request.query.email;
    admin.auth().getUserByEmail(email).then((user) => {
        functions.logger.info({
            user,
        });
        return admin.auth().setCustomUserClaims(user.uid, null);
    }).then(() => response.send("Admin Rights removed")).catch((error) => {
        console.log(error);
        response.status(500).send(error);
    });
});
