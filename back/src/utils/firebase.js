const admin = require('firebase-admin');
const serviceAccount = require('../../config/serviceAccountKey.json');
const fireorm = require('fireorm');  // Use lowercase to match the import convention

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://cicilia-e6f75-default-rtdb.europe-west1.firebasedatabase.app/',
    storageBucket: 'gs://cicilia-e6f75.appspot.com'
});

const db = admin.firestore();
fireorm.initialize(db);

let bucketInstance = null;

const getBucket = () => {
    if (!bucketInstance) {
        bucketInstance = admin.storage().bucket();  // Use the plain model class here
    }
    return bucketInstance;
};

module.exports = {fireorm, db, getBucket};