<template>
  <div class="min-h-screen bg-cover" :style="{ backgroundImage: 'url(' + bgImage + ')' }">

    <div class="pt-24 mx-auto text-center">
      <div v-if="!gameStarted">
        <div>
          <h1 class="text-white font-bold text-5xl font-poppins whitespace-nowrap">Le Jeux trop cool</h1>
        </div>
        <div class="pt-2">
          <span class=" text-white">des loutres, des mots et des truites bien sûr</span>
        </div>
        <div class="pt-10">
          <button @click="startGame"
            class="rounded-xl bg-emerald-50 px-2.5 py-1.5 text-sm font-semibold text-emerald-900 shadow-sm hover:bg-emerald-200 transition ease-out duration-300">
            Nouvelle partie
          </button>
        </div>
      </div>
      <FirstRound v-if="gameStarted && currentRound === 1" @round-ended="handleRoundEnded" :key="'first-' + roundKey" />
      <SecondRound v-if="gameStarted && currentRound === 2" @round-ended="handleRoundEnded"
        :key="'second-' + roundKey" />
    </div>
  </div>
</template>

<script>
import FirstRound from './FirstRound.vue'
import SecondRound from './SecondRound.vue'


import bgImage from '@/assets/images/bg-loutre-2.jpg';


export default {
  name: 'WordsGame',
  components: {
    FirstRound,
    SecondRound
  },
  data() {
    return {
      gameStarted: false,
      gameEnded: false,
      currentRound: 1,
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
      this.currentRound = 2;
      this.roundKey++;
    },
    handleRoundEnded(score) {
      this.finalScore += score;
      if (this.currentRound === 1) {
        this.currentRound = 2;  // Proceed to the second round
      } else {
        this.gameEnded = true; // End the game after the second round
        console.log('Game ended. Final score:', this.finalScore);
        // Additional logic to reset the game or show final results
      }
    }
  }
};
</script>
