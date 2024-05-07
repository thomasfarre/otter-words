import { db } from "../firebase/init"; // Import your Firebase initialization

// Function to store Twitch channel name
export const storeChannelName = (userId, channelName) => {
  return db
    .collection("users")
    .doc(userId)
    .set(
      {
        twitchChannelName: channelName,
      },
      { merge: true }
    ) // Use merge to avoid overwriting existing data
    .then(() => {
      console.log("Channel name stored successfully!");
      return true;
    })
    .catch((error) => {
      console.error("Error storing channel name:", error);
      throw error; // Rethrow to handle it in the calling function
    });
};
