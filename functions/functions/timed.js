const functions = require('firebase-functions')

exports.scheduledFunction = functions.region('europe-west1').pubsub.schedule('* * * * *').onRun((context) => {
    functions.logger.info('This will be run every minute!', context);
    return null;
});