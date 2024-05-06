<template>
  <span>Hello</span>
  <TwitchLogin />
  <TwitchChat />

</template>

<script>
import TwitchLogin from './components/TwitchLogin.vue'
import TwitchChat from './components/TwitchChat.vue'


export default {
  name: 'App',
  components: {
    TwitchLogin,
    TwitchChat
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
