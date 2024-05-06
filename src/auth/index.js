import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  OAuthProvider,
} from "firebase/auth";
import { app } from "../firebase/init";
import store from "../store";

// Initialize Firebase Auth
const auth = getAuth(app);

// Set up the Twitch OAuth provider
const provider = new OAuthProvider("oidc.twitch");

// Requesting the 'openid' scope and optionally 'user:read:email' if needed
provider.addScope("openid");
provider.addScope("user:read:email"); // Optional: Include if you want email

// Optional: Set custom parameters if specific claims are needed (often not required for basic scenarios)
provider.setCustomParameters({
  claims: JSON.stringify({
    id_token: {
      preferred_username: null
    },
    userinfo: {
      preferred_username: null
    }
  })
});

// Function to initiate the sign in with Twitch
export const signInWithTwitch = () => {
  signInWithRedirect(auth, provider);
};

// Handle the redirect result after user has authenticated
export const handleRedirect = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      // Debugging: Log the entire result and profile object
      console.log("Full authentication result:", result);
      console.log("User signed in:", result.user);
      console.log("Profile data:", result.additionalUserInfo);

      // Retrieve the Twitch channel name
      const twitchChannelName =
        result.additionalUserInfo.profile.preferred_username;

      if (twitchChannelName) {
        // Dispatch the channel name to your store or handle it as needed
        store.dispatch("updateTwitchChannelName", twitchChannelName);
      } else {
        // Handle the scenario where the channel name is not found
        console.error("Twitch channel name not found in authentication data.");
      }
    }
  } catch (error) {
    // Proper error handling
    console.error("Error during sign-in:", error);
  }
};
