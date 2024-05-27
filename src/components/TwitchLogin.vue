<template>
  <div class="pt-8">
    <button
      class="btn"
      @click="handleLoginOrRedirect">Lancer une partie</button>
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
      if (!auth.currentUser) {
        signInWithTwitch().catch(error => {
          console.error('Failed to sign in with Twitch:', error);
          alert('Authentication failed. Check console for details.');
        });
      } else {
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
