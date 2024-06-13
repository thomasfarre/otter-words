<template>
  <button class="w-1/2 btn-white" @click="handleLoginOrRedirect">En équipe via Twitch</button>
</template>

<script setup>
import { onMounted } from 'vue';
import { signInWithTwitch, handleRedirect } from '@/auth';
import { getAuth } from "firebase/auth";
import router from "@/router";

const handleLoginOrRedirect = async () => {
  const auth = getAuth();
  if (!auth.currentUser) {
    try {
      await signInWithTwitch();
    } catch (error) {
      console.error('Failed to sign in with Twitch:', error);
      alert('Authentication failed. Check console for details.');
    }
  } else {
    router.push({
      name: 'WordsGame',
      params: { userId: auth.currentUser.uid }
    });
  }
};

onMounted(async () => {
  try {
    await handleRedirect();
    const auth = getAuth();
    if (auth.currentUser) {
      router.push({
        name: 'WordsGame',
        params: { userId: auth.currentUser.uid }
      });
    }
  } catch (error) {
    console.error('Error handling redirect:', error);
    alert('Error processing login data. Check console for details.');
  }
});
</script>
