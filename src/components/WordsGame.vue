<template>
  <div>
    <h1>Game Page</h1>
    <TwitchChat />
  </div>
</template>

<script>
import TwitchChat from './TwitchChat.vue'

export default {
  name: 'WordsGame',
  components: {
    TwitchChat,
  }
}
</script>
