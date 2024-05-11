<template>
  <div>

    <div class="absolute z-10 left-1/2 top-1/4 transform -translate-x-1/2">
      <div>
        <h1 class="text-white font-bold text-5xl font-['Poppins'] whitespace-nowrap">Le Jeux trop cool</h1>
      </div>
      <div class="pt-2">
        <span class=" text-white font-['Roboto']">des loutres, des mots et des truites bien sûr</span>
      </div>
      <div>
        <button @click="startGame" class="">Start New Game</button>
        <FirstRound v-if="gameStarted" @round-ended="handleRoundEnded" :key="roundKey" />
      </div>
    </div>
    <img class="absolute inset-0 w-full h-full bg-cover" :src="bgImage" alt="Background Otter" />
  </div>
</template>

<script>
import FirstRound from './FirstRound.vue'

import bgImage from '@/assets/images/bg-loutre-2.jpg';


export default {
  name: 'WordsGame',
  components: {
    FirstRound,
  },
  data() {
    return {
      gameStarted: false,
      gameEnded: false,
      roundKey: 0,
      finalScore: 0,
      bgImage
    };
  },
  methods: {
    startGame() {
      this.gameStarted = true;
      this.gameEnded = false;
      this.finalScore = 0;
      this.roundKey++;
    },
    handleRoundEnded(score) {
      this.finalScore += score;
      // Here you could initiate another round or end the game
      this.gameEnded = true; // For simplicity, we end the game after one round
    }
  }
};
</script>
