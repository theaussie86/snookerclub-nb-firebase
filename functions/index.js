const admin = require('firebase-admin');
admin.initializeApp();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.https = require('./functions/https')
exports.timed = require('./functions/timed')
// exports.import = require('./functions/import')