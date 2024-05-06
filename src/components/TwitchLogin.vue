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
      signInWithTwitch();
    }
  },
  mounted() {
    handleRedirect();
  }
}
</script>
