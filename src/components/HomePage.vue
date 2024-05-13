<template>
  <div class="min-h-screen bg-cover" :style="{ backgroundImage: 'url(' + bgImage + ')' }">
    <div class="pt-60 mx-auto text-center">
      <div>
        <h1 class="text-white font-bold text-5xl font-poppins">Le jeu des Loutrons</h1>
      </div>
      <div class="pt-2">
        <span class=" text-white">des loutres, des mots et des truites bien sûr</span>
      </div>
      <TwitchLogin />
    </div>
  </div>
</template>

<script>
import TwitchLogin from './TwitchLogin.vue'
import bgImage from '@/assets/images/bg-loutre-1.jpg';

export default {
  name: 'HomePage',
  components: {
    TwitchLogin,
  },
  data() {
    return {
      // Make the imported image available in the template
      bgImage
    };
  }
}
</script>
