import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  OAuthProvider,
} from "firebase/auth";
import { app } from "../firebase/init";

const auth = getAuth(app);
const provider = new OAuthProvider("oidc.twitch");

export const signInWithTwitch = () => {
  signInWithRedirect(auth, provider);
};

export const handleRedirect = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      console.log("User signed in:", result.user);
      const accessToken = result.user.accessToken;
      const channelName = await fetchTwitchChannelName(accessToken);
      console.log("Twitch Channel Name:", channelName);
      // Here you can save the channel name to Firebase or elsewhere as needed
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
    return data.data[0].display_name; // Returns the Twitch channel name
  } catch (error) {
    console.error("Error fetching Twitch channel name:", error);
    throw error;
  }
};
