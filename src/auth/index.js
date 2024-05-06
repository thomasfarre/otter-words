import { getAuth, signInWithRedirect, getRedirectResult, OAuthProvider } from "firebase/auth";
import { app } from "../firebase/init"; // Import only the necessary named export 'app'

const auth = getAuth(app); // Correct the reference to 'app' instead of a non-existing 'firebaseApp'
const provider = new OAuthProvider("twitch.tv");

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
