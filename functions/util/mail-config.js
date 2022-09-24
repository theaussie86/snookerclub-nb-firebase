const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const { formatBillDate } = require('./helpers')
module.exports = {
    mailOptions: {
        getSignInLinkMailOptions: (username, link) => {
            return {
                subject: 'Aktiviere dein Konto im SnookerClub NB',
                text: `Hallo ${username},\n
                        dein Konto im Snookerclub Neubrandenburg ist jetzt angelegt.\n
                        Klicke auf den folgenden Link, um deine E-Mail zu bestätigen und dein Passwort zu vergeben.\n\n
                        ${link}\n\n
                        Viele Grüße,\n
                        Snookerclub Neubrandenburg`,
                html: `<p>Hallo <strong>${username}</strong>,<br> 
                        dein Konto im Snookerclub Neubrandenburg ist jetzt angelegt.<br>
                        Klicke auf den folgenden Link, um deine E-Mail zu bestätigen und dein Passwort zu vergeben.</p>
                        <p><b><a href="${link}">Bestätige deine E-Mail-Adresse</a></b></p>
                        <p>Viele Grüße,<br>
                        Snookerclub Neubrandenburg
                        </p>`
            }
        },
        getBillsMailOptions: (username, link, billDate) => ({
            subject: 'Snookerclub Rechnung - ' + formatBillDate(billDate),
            text: `Hallo ${username},\n
            deine Rechnung für ${formatBillDate(billDate)} ist fertig.\n
            Klicke auf den folgenden Link, um sie dir anzuschauen.\n\n
            ${link}\n\n
            Viele Grüße,\n
            Snookerclub Neubrandenburg`,
            html: `<p>Hallo <strong>${username}</strong>,<br> 
            dein Rechnung für ${formatBillDate(billDate)} ist fertig.<br>
            Klicke auf den folgenden Link, um sie dir anzuschauen.</p>
            <p><b><a href="${link}">Rechnung von ${formatBillDate(billDate)}</a></b></p>
            <p>Viele Grüße,<br>
            Snookerclub Neubrandenburg
            </p>`
        })
    },
    sendMail: (to, mailOptions) => {
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
            to: to,
            ...mailOptions
        }

        smtpTransport.sendMail(mail)
    },
    getTestMailOptions: (username) => ({
        subject: 'Testmail SnookerClub NB',
        text: `Hallo ${username},\n
                das ist ein Test.\n\n
                Viele Grüße,\n
                Snookerclub Neubrandenburg`,
        html: `<p>Hallo <strong>${username}</strong>,<br> 
                das ist ein Test
                </p>
                <p>Viele Grüße,<br>
                Snookerclub Neubrandenburg
                </p>`
    })
}