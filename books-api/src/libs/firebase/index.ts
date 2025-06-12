import admin from "firebase-admin";
import path from "path";

// Initialize Firebase Admin SDK with service account credentials.
// Ensure that the service account key file is present in the specified path
// and that the path is correct relative to this file.
// The service account key file should be named 'service-account-key.json'
// and should contain the necessary credentials for Firebase Admin SDK.
// This file should not be committed to version control for security reasons.

const serviceAccount = require(path.resolve(
  __dirname,
  "./service-account-key.json"
));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
