<template>
  <div class="pt-8">
    <button
      class="bg-amber-700 text-emerald-50 p-3 rounded-md text-sm font-semibold tracking-wider font-['Poppins'] uppercase"
      @click="handleLoginOrRedirect">Jouer</button>
  </div>
</template>

<script>
import { signInWithTwitch, handleRedirect } from '@/auth';
import { getAuth } from "firebase/auth";
import router from "@/router";

export default {
  name: 'TwitchLogin',
  methods: {
    handleLoginOrRedirect() {
      const auth = getAuth();
      // Check if the user is already logged in
      if (!auth.currentUser) {
        // Not logged in, initiate login
        signInWithTwitch().catch(error => {
          console.error('Failed to sign in with Twitch:', error);
          alert('Authentication failed. Check console for details.');
        });
      } else {
        // Redirect to game page with user ID
        router.push({
          name: 'WordsGame',
          params: { userId: auth.currentUser.uid }
        });
      }
    }
  },
  mounted() {
    handleRedirect().then(() => {
      const auth = getAuth();
      if (auth.currentUser) {
        // Redirect to game page with user ID
        router.push({
          name: 'WordsGame',
          params: { userId: auth.currentUser.uid }
        });
      }
    }).catch(error => {
      console.error('Error handling redirect:', error);
      alert('Error processing login data. Check console for details.');
    });
  }
}
</script>
