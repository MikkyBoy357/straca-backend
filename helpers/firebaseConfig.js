const admin = require("firebase-admin");
const serviceAccount = require("../flash-chat-3a9a7-firebase-adminsdk-tm1oj-d5e6152562.json");

// Initialize Firebase Admin SDK

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET,
  });

  console.log("===========> connected to FIREBASE <===========");
} catch (error) {
  console.log(error);
}

const storage = admin.storage();

module.exports = { storage };
