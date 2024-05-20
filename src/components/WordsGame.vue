<template>
  <div class="min-h-screen bg-cover" :style="{ backgroundImage: 'url(' + bgImage + ')' }">
    <div class="pt-6 mx-auto">
      <div v-if="!gameStarted" class="pt-20">
        <div class="text-center">
          <div>
            <h1 class="text-5xl font-bold text-white font-poppins">
              Le Jeu trop cool
            </h1>
          </div>
          <div class="pt-2">
            <span class="text-white">des loutres, des mots et des truites bien sûr</span>
          </div>
          <div class="pt-10">
            <button @click="startGameModal = true"
              class="rounded-xl bg-emerald-50 px-2.5 py-1.5 text-sm font-semibold text-emerald-900 shadow-sm hover:bg-emerald-200 transition ease-out duration-300">
              Nouvelle partie
            </button>
          </div>
        </div>
        <div v-if="startGameModal"
          class="absolute z-20 w-full p-1 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md left-1/2 top-1/2 xl:max-w-prose">
          <div class="p-6 border border-gray-300 rounded-md">
            <div>
              <span class="text-2xl font-bold text-gray-900 font-poppins">Explication du jeu super!</span>
            </div>
            <div class="pt-4">
              <p class="text-gray-800">
                Loutrons et Loutrones de l’Empire sacré de la Rivière, Bienvenue !
                <br /><br />
                Voici la toute première version du jeu créé spécialement pour vous, virtuoses de la langue française !
                Vous allez certainement tomber sur des bugs. N’hésitez pas à faire remontrer vos remarques et vos
                suggestions à la Loutre, afin que notre Homard puisse améliorer le gameplay à chaque mise à jour.
                Cette première version se compose de trois mini-jeux chronométrés.
                <br /><br />
                - <strong>Round 1</strong> Le petit bac : Une lettre et une catégorie s’affichent, à vous de trouver le
                plus de mot possible (exemples : les animaux en L, les pays en T…). Toutes les 30 secondes, la lettre et
                la catégorie changent.<br />
                - <strong>Round 2</strong>: La définition est affichée, à vous de retrouver le mot !
                retrouver le mot ! <br />
                - <strong>Round 3</strong>: Le pendu : Les lettres s’affichent au fur et à mesure du temps, à vous de
                retrouver le mot complet le plus vite possible !
                <br /><br />
                Vous pouvez taper directement les réponses dans le chat Twitch. Si elles sont correctes, elles
                s’afficheront dans la liste, avec votre pseudo et votre score. Si elles sont incorrectes, elles
                échoueront dans la rivière, juste en dessous.
              </p>
            </div>
            <div class="pt-10">
              <span>
                Choix des mini-jeux présents
              </span>
              <div class="pt-2 space-y-4">
                <div v-for="round in availableRounds" :key="round.id" class="flex items-center">
                  <div class="flex items-center space-x-2">
                    <button type="button" :id="'round-' + round.id" @click="toggleRound(round.id)" :class="['relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
    selectedRounds.includes(round.id) ? 'bg-emerald-600' : 'bg-gray-200']" role="switch"
                      :aria-checked="selectedRounds.includes(round.id)" aria-labelledby="'label-' + round.id">
                      <span aria-hidden="true" :class="['inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full shadow pointer-events-none',
    selectedRounds.includes(round.id) ? 'translate-x-5' : 'translate-x-0']"></span>
                    </button>
                    <span class="ml-3 text-sm" :id="'label-' + round.id" @click="toggleRound(round.id)">
                      {{ round.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-6 text-center">
              <button @click="startGame" class="border-2 btn border-emerald-700">
                Lancer la partie!
              </button>
            </div>
          </div>
        </div>
      </div>
      <FirstRound v-if="gameStarted && currentRound === 1" @round-ended="handleRoundEnded" :key="'first-' + roundKey" />
      <SecondRound v-if="gameStarted && currentRound === 2" @round-ended="handleRoundEnded"
        :key="'second-' + roundKey" />
      <ThirdRound v-if="gameStarted && currentRound === 3" @round-ended="handleRoundEnded" :key="'third-' + roundKey" />
    </div>

    <div v-if="gameEnded" class="absolute z-20 p-1 transform -translate-x-1/2 bg-white rounded-md left-1/2 top-20">
      <div class="p-6 border border-gray-300 rounded-md">
        <div>
          <span class="text-2xl font-bold text-gray-900 font-poppins">
            Fin du jeu!
          </span>
        </div>
        <div class="pt-6">
          Vous avez marqué un total de <span class="text-xl font-bold">{{ finalScore }}</span>, c'est vraiment un score
          digne des loutrons!
        </div>
        <div class="pt-10">
          <span class="font-bold"> Classement des participants: </span>
          <ul>
            <li v-for="user in detailedScores" :key="user.username">
              {{ user.username }}: {{ user.score }}
            </li>
          </ul>
        </div>
        <div class="pt-10">
          <span class="font-bold">
            Choix des mini-jeux présents
          </span>
          <div class="pt-2 space-y-4">
            <div v-for="round in availableRounds" :key="round.id" class="flex items-center">
              <div class="flex items-center space-x-2">
                <button type="button" :id="'round-' + round.id" @click="toggleRound(round.id)" :class="['relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
    selectedRounds.includes(round.id) ? 'bg-emerald-600' : 'bg-gray-200']" role="switch"
                  :aria-checked="selectedRounds.includes(round.id)" aria-labelledby="'label-' + round.id">
                  <span aria-hidden="true" :class="['inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full shadow pointer-events-none',
    selectedRounds.includes(round.id) ? 'translate-x-5' : 'translate-x-0']"></span>
                </button>
                <span class="ml-3 text-sm" :id="'label-' + round.id" @click="toggleRound(round.id)">
                  {{ round.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-6 text-center">
          <button @click="startGame" class="border-2 btn border-emerald-700">
            Nouvelle partie
          </button>
        </div>
      </div>
    </div>
    <div v-if="!gameStarted" class="absolute transform -translate-x-1/2 bottom-6 left-1/2">
      <div class="flex flex-col items-center justify-center space-y-1">
        <img class="w-10 h-10 opacity-80" :src="iconImage" alt="" />
        <div>
          <span class="text-xs italic text-white">by Omar for las Truitas \tʁɥi.tas\</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FirstRound from "./FirstRound.vue";
import SecondRound from "./SecondRound.vue";
import ThirdRound from "./ThirdRound.vue";

import iconImage from "@/assets/images/trout.png";
import bgImage from "/public/images/bg-loutre-2.jpg";

export default {
  name: "WordsGame",
  components: {
    FirstRound,
    SecondRound,
    ThirdRound,
  },
  data() {
    return {
      startGameModal: false,
      gameStarted: false,
      gameEnded: false,
      currentRound: 0,
      roundKey: 0,
      finalScore: 0,
      detailedScores: [],
      bgImage,
      iconImage,
      availableRounds: [
        { id: 1, name: 'Lettre + Catégorie', component: 'FirstRound' },
        { id: 2, name: 'Définitions', component: 'SecondRound' },
        { id: 3, name: 'Pendu', component: 'ThirdRound' }
      ],
      selectedRounds: [1, 2, 3]
    };
  },
  methods: {
    toggleRound(roundId) {
      const index = this.selectedRounds.indexOf(roundId);
      if (index === -1) {
        this.selectedRounds.push(roundId);
      } else {
        this.selectedRounds.splice(index, 1);
      }
    },
    startGame() {
      this.startGameModal = false;
      this.gameStarted = true;
      this.gameEnded = false;
      this.finalScore = 0;
      this.currentRound = this.selectedRounds.sort((a, b) => a - b)[0] || 0;
      this.roundKey++;
    },
    handleRoundEnded(data) {
      let sortedSelectedRounds = this.selectedRounds.sort((a, b) => a - b);
      let currentIndex = sortedSelectedRounds.indexOf(this.currentRound);
      if (currentIndex < sortedSelectedRounds.length - 1) {
        this.currentRound = sortedSelectedRounds[currentIndex + 1];
      } else {
        this.gameStarted = false;
        this.gameEnded = true;
      }
      this.finalScore += data.total;
      this.updateScores(data.scores);
    },
    updateScores(newScores) {
      Object.keys(newScores).forEach(username => {
        let existingUser = this.detailedScores.find(user => user.username === username);
        if (existingUser) {
          existingUser.score += newScores[username];
        } else {
          this.detailedScores.push({ username: username, score: newScores[username] });
        }
      });
      this.detailedScores.sort((a, b) => b.score - a.score);
    },
  }
};
</script>
