<template>
  <div>
    <h1>Home</h1>
    <TwitchLogin />
  </div>
</template>

<script>
import TwitchLogin from './TwitchLogin.vue'

export default {
  name: 'HomePage',
  components: {
    TwitchLogin,
  }
}
</script>
