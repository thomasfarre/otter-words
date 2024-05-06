import { getAuth, signInWithRedirect, getRedirectResult, OAuthProvider } from "firebase/auth";
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
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};
