// src/firebase/init.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// console.log(
//   "API Key:",
//   process.env.VUE_APP_FIREBASE_API_KEY,
//   process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
//   process.env.VUE_APP_FIREBASE_PROJECT_ID,
//   process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
//   process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
//   process.env.VUE_APP_FIREBASE_APP_ID
// );

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app };
