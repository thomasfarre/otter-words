<template>
  <div>
    <button @click="loginWithTwitch">Sign in with Twitch</button>
  </div>
</template>

<script>
import { signInWithTwitch, handleRedirect } from '@/auth';

export default {
  name: 'TwitchLogin',
  methods: {
    loginWithTwitch() {
      signInWithTwitch().catch(error => {
        console.error('Failed to sign in with Twitch:', error);
        alert('Authentication failed. Check console for details.');
      });
    }
  },
  mounted() {
    handleRedirect().catch(error => {
      console.error('Error handling redirect:', error);
      alert('Error processing login data. Check console for details.');
    });
  }
}
</script>
