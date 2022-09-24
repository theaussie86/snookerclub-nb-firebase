const admin = require('firebase-admin');
const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const { getTestMailOptions } = require('./util/mail-config')
const sendMail = (to, mailOptions) => {
    const nodemailerConf = {
        "client_id": "233645161284-58jh6snafrgd6l9qq5ul2j0gdr65kl80.apps.googleusercontent.com",
        "refresh_token": "1//043ojwv71P_5nCgYIARAAGAQSNwF-L9IrCXGl9xr13D-55ClXI4rGJng7Q5VEFBY0g55oGHMmbWUnBWxDB6bOWFgN-t3o4mlrGJs",
        "client_secret": "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",
        "user": "snookertempel@gmail.com",
        "access_token": "ya29.A0ARrdaM-usNmDmFG5P9IHILSIFXEZlQUzBHp0ENuKRLonTaHJAiPcuhV6KvCM4HZAvUeEsuuvFNnXCeIso6drC11G5kyvHzXmtvPidq1Y3mWZMZZodYRgTtoAi1kLpa8RWEm0XCtR567s7YEgY7OSbmTZqay3",
        "expiry_date": "1647293640000"
    }
    // const oauth2Client = new google.auth.OAuth2(nodemailerConf.client_id, nodemailerConf.client_secret, 'https://oauth2.googleapis.com/token')
    // oauth2Client.setCredentials({
    //     refresh_token: nodemailerConf.refresh_token
    // })
    let access_token, expires

    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            clientId: nodemailerConf.client_id,
            clientSecret: nodemailerConf.client_secret,
            user: nodemailerConf.user,
            refreshToken: nodemailerConf.refresh_token,
            accessToken: access_token,
            expires: expires
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    smtpTransport.on('token', token => {
        console.log('A new access token was generated');
        console.log('User: %s', token.user);
        console.log('Access Token: %s', token.accessToken);
        access_token = token.accessToken
        console.log('Expires: %s', new Date(token.expires));
        expires = token.expires
    });

    const mail = {
        // auth: {
        //     clientId: nodemailerConf.client_id,
        //     clientSecret: nodemailerConf.client_secret,
        //     user: nodemailerConf.user,
        //     refreshToken: nodemailerConf.refresh_token,
        //     accessToken: access_token,
        //     expires: expires
        // },
        from: nodemailerConf.user,
        to: to,
        ...mailOptions
    }

    smtpTransport.sendMail(mail, (err, resp) => {
        if (err) return console.error(err)
        console.log('response', resp)
    })
}
admin.initializeApp();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.https = require('./functions/https')
exports.timed = require('./functions/timed')
// exports.import = require('./functions/import')



exports.sendTestMail = functions.region("europe-west1").https.onRequest((req, res) => {
    const username = req.body.username
    const mailOptions = getTestMailOptions(username)
    sendMail('chmurat86@gmail.com', mailOptions)
    res.json('Mail sent')
})