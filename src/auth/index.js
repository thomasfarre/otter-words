// auth.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  OAuthProvider,
  indexedDBLocalPersistence,
  initializeAuth,
} from "firebase/auth";
import { initializeFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getApps } from "firebase/app";

// Ensure Firebase is initialized only once
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = (() => {
  try {
    return getAuth(app);
  } catch (e) {
    return initializeAuth(app, {
      persistence: indexedDBLocalPersistence,
    });
  }
})();

const provider = new OAuthProvider("oidc.twitch");
const db = initializeFirestore(app, {});

export const signInWithTwitch = () => {
  signInWithRedirect(auth, provider);
};

export const handleRedirect = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      console.log("User signed in:", result.user);

      const credential = OAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      const channelName = await fetchTwitchChannelName(accessToken);

      const userDocRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userDocRef);
      console.log("Fetched user document snapshot:", userSnap.exists());

      if (!userSnap.exists()) {
        await setDoc(userDocRef, {
          twitchChannelName: channelName,
          teamId: null,
        });
        console.log("Created user document");

        const playerDocRef = doc(db, "Players", result.user.uid);
        try {
          await setDoc(playerDocRef, {
            displayName: channelName,
            userId: result.user.uid,
          });
          console.log("Created player document");
        } catch (error) {
          console.error("Error creating player document:", error);
        }
      } else {
        await setDoc(
          userDocRef,
          { twitchChannelName: channelName },
          { merge: true }
        );
        console.log("Updated user document");

        const playerDocRef = doc(db, "Players", result.user.uid);
        const playerSnap = await getDoc(playerDocRef);
        console.log("Fetched player document snapshot:", playerSnap.exists());
        if (!playerSnap.exists()) {
          try {
            await setDoc(playerDocRef, {
              displayName: channelName,
              userId: result.user.uid,
            });
            console.log("Created player document");
          } catch (error) {
            console.error("Error creating player document:", error);
          }
        } else {
          try {
            await setDoc(
              playerDocRef,
              { displayName: channelName },
              { merge: true }
            );
            console.log("Updated player document");
          } catch (error) {
            console.error("Error updating player document:", error);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

const fetchTwitchChannelName = async (accessToken) => {
  try {
    const response = await fetch("https://api.twitch.tv/helix/users", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": process.env.VUE_APP_TWITCH_APP_ID,
      },
    });
    const data = await response.json();
    return data.data[0].display_name;
  } catch (error) {
    console.error("Error fetching Twitch channel name:", error);
    throw error;
  }
};
