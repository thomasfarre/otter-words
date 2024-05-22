import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  OAuthProvider,
} from "firebase/auth";
import { app } from "../firebase/init";
import { initializeFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const auth = getAuth(app);
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

      // Store channel name and initialize team info if not existing in Firestore
      const userDocRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        await setDoc(userDocRef, {
          twitchChannelName: channelName,
          teamId: null,
        });
      } else {
        await setDoc(
          userDocRef,
          { twitchChannelName: channelName },
          { merge: true }
        );
      }
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

// Function to fetch Twitch channel name using accessToken
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
