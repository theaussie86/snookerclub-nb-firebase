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
                        <p><b>${link}</b></p>
                        <p>Viele Grüße,<br>
                        Snookerclub Neubrandenburg
                        </p>`
            }
        }
    }
}