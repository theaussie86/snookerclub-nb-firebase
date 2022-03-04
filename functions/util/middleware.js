const functions = require('firebase-functions')
const admin = require('firebase-admin')

const whitelist = ['http://localhost:3000', 'https://snooker-nb.de']
const cors = require('cors')({
    origin: function (origin, callback) {

        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
    ,
    methods: ['POST']
})

exports.cors = cors

exports.middleware = (handler) => (req, res) => {
    return cors(req, res, () => {
        functions.logger.log('Check if request is authorized with Firebase ID token');

        if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
            !(req.cookies && req.cookies.__session)) {
            functions.logger.error(
                'No Firebase ID token was passed as a Bearer token in the Authorization header.',
                'Make sure you authorize your request by providing the following HTTP header:',
                'Authorization: Bearer <Firebase ID Token>',
                'or by passing a "__session" cookie.'
            );
            res.status(403).send('Unauthorized');
            return;
        }

        let idToken;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            functions.logger.log('Found "Authorization" header');
            // Read the ID Token from the Authorization header.
            idToken = req.headers.authorization.split('Bearer ')[1];
        } else if (req.cookies) {
            functions.logger.log('Found "__session" cookie');
            // Read the ID Token from cookie.
            idToken = req.cookies.__session;
        } else {
            // No cookie
            res.status(403).send('Unauthorized');
            return;
        }

        admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {

            functions.logger.log('ID Token correctly decoded', decodedIdToken);
            req.user = decodedIdToken;
            return handler(req, res);

        }).catch((error) => {
            functions.logger.error('Error while verifying Firebase ID token:', error);
            res.status(403).send('Unauthorized');
            return;
        })
    })
}