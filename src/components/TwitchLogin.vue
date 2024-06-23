<template>
  <button class="btn-white w-80" @click="handleLoginOrRedirect">{{ props.buttonText }}</button>
</template>

<script setup>
import { onMounted, defineProps } from 'vue';
import { signInWithTwitch, handleRedirect } from '@/auth';
import { getAuth } from "firebase/auth";
import router from "@/router";

const props = defineProps({
  buttonText: {
    type: String,
    required: true
  }
});

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
      });
    }
  } catch (error) {
    console.error('Error handling redirect:', error);
    alert('Error processing login data. Check console for details.');
  }
});
</script>
