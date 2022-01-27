const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

const cors = require("cors")({ origin: true });
const nodemailer = require('nodemailer')
const { mailOptions } = require('./mail-config');
const { middleware } = require("./middleware");


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.admin = require('./admin')

exports.setAsAdmin = functions.region('europe-west1').https.onRequest((request, response) => {
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

exports.createUser = functions.region('europe-west1').https.onRequest((req, res) => {
    cors(req, res, () => {
        console.log(req.body)
        const actionCodeSettings = {
            url: req.body.origin + "/activate",
        };
        let uid
        admin.auth().createUser({
            email: req.body.email,
            displayname: req.body.displayname,
        }).then((userRecord) => {
            functions.logger.info({
                user: userRecord,
            });
            uid = userRecord.uid
            return admin.auth()
                .generateSignInWithEmailLink(
                    req.body.email,
                    actionCodeSettings);
        }).then((link) => {
            return admin.firestore().collection('users').doc(uid).set({ link })
        }).then((doc) => {
            res.send({ doc });
        });
    })
});

exports.sendEmail = functions.region('europe-west1').https.onRequest((req, res) => {
    cors(req, res, () => {
        const nodemailerConf = functions.config().nodemailer
        const smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                clientId: nodemailerConf.client_id,
                clientSecret: nodemailerConf.client_secret
            }
        });


        const mail = {
            auth: {
                user: nodemailerConf.user,
                refreshToken: nodemailerConf.refresh_token,
                accessToken: nodemailerConf.access_token,
                expires: nodemailerConf.expiry_date
            },
            from: nodemailerConf.user,
            to: 'chmurat86@gmail.com',
            ...mailOptions.getSignInLinkMailOptions('Murat', 'https://snooker-nb.de')
        }

        smtpTransport.sendMail(mail)

        functions.logger.info({ nodemailerConf })
        res.send({ msg: 'Gesendet', nodemailerConf })
    })
});

exports.deleteAdminRights = functions.region('europe-west1').https.onRequest((request, response) => {
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