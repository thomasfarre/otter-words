<template>
  <div>
    <div class="absolute z-10 left-1/2 top-1/3 transform -translate-x-1/2">
      <div>
        <h1 class="text-white font-bold text-5xl font-['Poppins'] whitespace-nowrap">Le jeux des Loutrons</h1>
      </div>
      <div class="pt-2">
        <span class=" text-white font-['Roboto']">des loutres, des mots et des truites bien sûr</span>
      </div>
      <TwitchLogin />
    </div>
    <img class="absolute inset-0 w-full h-full bg-cover" :src="bgImage" alt="Background Otter" />
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
