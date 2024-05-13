<template>
  <div class="min-h-screen bg-cover" :style="{ backgroundImage: 'url(' + bgImage + ')' }">
    <div class="absolute right-12 top-4">
      <!-- Background music controls -->
      <button @click="toggleMusic">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z" />
        </svg>
      </button>
      <audio ref="backgroundMusic" loop="true">
        <source src="/sounds/river.wav" type="audio/mpeg" />
      </audio>
    </div>
    <div class="pt-12 mx-auto text-center">
      <div v-if="!gameStarted" class="pt-12">
        <div>
          <h1 class="text-white font-bold text-5xl font-poppins">Le Jeu trop cool</h1>
        </div>
        <div class="pt-2">
          <span class=" text-white">des loutres, des mots et des truites bien sûr</span>
        </div>
        <div class="pt-10">
          <button @click="startGameModal=true;"
            class="rounded-xl bg-emerald-50 px-2.5 py-1.5 text-sm font-semibold text-emerald-900 shadow-sm hover:bg-emerald-200 transition ease-out duration-300">
            Nouvelle partie
          </button>
        </div>
        <div v-if="startGameModal"
          class="absolute w-full left-1/2 top-20 transform -translate-x-1/2 bg-white z-20 p-1 rounded-md xl:w-auto">
          <div class="p-6 border border-gray-300 rounded-md">
            <div>
              <span class="font-poppins font-bold text-2xl text-gray-900">Explication du jeu super!</span>
            </div>
            <div class="pt-10">
              <p class="">
                Bonjour Loutre et loutrons, virtuoses de la langue française! <br><br>
                Quelques explications avant de lancer la partie, tout d'abord le jeu est vraiment pas terminé ! Vous
                allez certainement tomber sur des bugs.
                D'ailleurs en parlant de ça, afin de réaliser le meilleur jeu possible pour vous je suis très friands
                de vos suggestions en tout genre <br><br>
                Concernant le jeu ! C'est une suite de plusieurs round (mini-jeux), à chaque fois un chrono et des mots
                à trouver : <br><br>
                - Premier round: Une lettre et une catégorie au hasard à respecter ! <br>
                - Deuxième: La définition du mot est affiché, à vous de retrouver le mot ! <br><br>
                Vous pouvez taper directement les réponses dans le chat Twitch, si elles sont incorrects, elles
                s'échoueront dans la Rivière. Si elle sont bonne par contre, vous marquerez des points, vous ainsi que
                votre équipe! Bonne chance!
              </p>
            </div>
            <div class="pt-6">
              <button @click="startGame" class="btn border-2 border-emerald-700">Lancer
                la partie!</button>
            </div>
          </div>
        </div>
      </div>
      <FirstRound v-if="gameStarted && currentRound === 1" @round-ended="handleRoundEnded" :key="'first-' + roundKey" />
      <SecondRound v-if="gameStarted && currentRound === 2" @round-ended="handleRoundEnded"
        :key="'second-' + roundKey" />
    </div>

    <div v-if="gameEnded" class="absolute left-1/2 top-20 transform -translate-x-1/2 bg-white z-20 p-1 rounded-md">
      <div class="p-6 border border-gray-300 rounded-md text-center">
        <div>
          <span class="font-poppins font-bold text-2xl text-gray-900">Fin du jeu!</span>
        </div>
        <div class="pt-6">
          Vous avez marqué un total de {{ finalScore }}, c'est vraiment un score digne des loutrons!
        </div>
        <div class="pt-10">
          <span>
            Classement des participants:
          </span>
          <li v-for="(score, username) in scores" :key="username">
            {{ username }}: {{ score }}
          </li>
        </div>
        <div class="pt-6">
          <button @click="startGameModal = true; this.gameEnded = false;"
            class="btn border-2 border-emerald-700">Nouvelle partie</button>
        </div>
      </div>
    </div>
    <div v-if="!gameStarted" class="absolute bottom-6 left-1/2 transform -translate-x-1/2">
      <div class="flex flex-col items-center justify-center space-y-1">
        <img class="w-10 h-10 opacity-80" :src="iconImage" alt="">
        <div>
          <span class="text-xs text-white italic">by Omar for las Truitas \tʁɥi.tas\</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FirstRound from './FirstRound.vue'
import SecondRound from './SecondRound.vue'

import iconImage from '@/assets/images/trout.png';
import bgImage from '@/assets/images/bg-loutre-2.jpg';


export default {
  name: 'WordsGame',
  components: {
    FirstRound,
    SecondRound
  },
  data() {
    return {
      startGameModal: false,
      gameStarted: false,
      gameEnded: false,
      currentRound: 0,
      roundKey: 0,
      finalScore: 0,
      detailedScores: {},
      bgImage,
      iconImage,
      playing: true

    };
  },
  methods: {
    toggleMusic() {
      this.playing = !this.playing;
      this.playing ? this.$refs.backgroundMusic.play() : this.$refs.backgroundMusic.pause();
    },
    startGame() {
      this.startGameModal = false;
      this.gameStarted = true;
      this.gameEnded = false;
      this.finalScore = 0;
      this.currentRound = 2;
      this.playing ? this.$refs.backgroundMusic.play() : this.$refs.backgroundMusic.pause();
      this.roundKey++;
    },
    handleRoundEnded(data) {
      if (this.currentRound === 1) {
        this.currentRound = 2;
      } else {
        this.gameStarted = false;
        this.gameEnded = true; // End the game after the second round
        console.log('Game ended. Final score:', this.finalScore);
      }
      if (this.gameStarted) {
        this.finalScore += data.total;
        if (Object.keys(data.scores).length > 0) {
          // Iterate over each username in the scores object
          Object.keys(data.scores).forEach(username => {
            // Initialize the user's score in detailedScores if it doesn't exist
            if (!this.detailedScores[username]) {
              this.detailedScores[username] = 0;
            }
            // Add the score from the current round to the user's total score
            this.detailedScores[username] += data.scores[username];
          });
        }
      }
    }
  }
};
</script>
