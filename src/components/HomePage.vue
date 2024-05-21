<template>
  <div class="min-h-screen bg-cover" :style="{ backgroundImage: 'url(' + bgImage + ')' }">
    <div class="mx-auto text-center pt-60">
      <div>
        <h1 class="text-5xl font-bold text-white font-poppins">Le jeu des Loutrons</h1>
      </div>
      <div class="pt-2">
        <span class="text-white ">des loutres, des mots et des truites bien sûr</span>
      </div>
      <TwitchLogin />
    </div>
  </div>
</template>

<script>
import TwitchLogin from './TwitchLogin.vue'
import bgImage from '/public/images/bg-loutre-1.jpg';

export default {
  name: 'HomePage',
  components: {
    TwitchLogin,
  },
  data() {
    return {
      bgImage
    };
  }
}
</script>
