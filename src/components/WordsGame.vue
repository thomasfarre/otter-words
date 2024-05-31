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
        <source :src="gameLoop" type="audio/mpeg" />
      </audio>
    </div>
    <div class="pt-2 mx-auto xl:pt-6">
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
          <div class="flex items-center justify-center pt-10 space-x-6">
            <div>
              <button @click="startTwitchModal = true"
                class="rounded-xl bg-emerald-50 px-2.5 py-1.5 text-sm font-semibold text-emerald-900 shadow-sm hover:bg-emerald-200 transition ease-out duration-300">
                Nouvelle partie
              </button>
            </div>
            <div>
              <button @click="showDashboard = true"
                class="rounded-xl bg-amber-50 px-2.5 py-1.5 text-sm font-semibold text-amber-900 shadow-sm hover:bg-amber-200 transition ease-out duration-300">
                Classements
              </button>
            </div>
          </div>
          <ScoreDashboard v-if="showDashboard" @close="showDashboard = false" />
        </div>
        <div v-if="startTwitchModal"
          class="absolute z-20 w-full p-1 transform -translate-x-1/2 bg-white rounded-md left-1/2 top-20 max-w-prose">
          <button @click.stop="startTwitchModal = false" class="absolute top-4 right-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="p-6 border border-gray-300 rounded-md">
            <div>
              <span class="text-2xl font-bold text-gray-900 font-poppins">Important! As-tu pensé à ouvrir ton chat
                Twitch?</span>
            </div>
            <div class="pt-4">
              <p class="text-gray-800">
                Pour jouer à plusieurs il est nécessaire d'utiliser ton chat Twitch. <br> <strong>Ouvre le</strong> si ce
                n'est pas déjà fait,
                sinon lance la partie !
              </p>
            </div>
            <div class="flex justify-center pt-6 space-x-4">
              <a :href="'https://www.twitch.tv/' + channelName" target="_blank" class="rounded-xl bg-purple-50 px-2.5 py-1.5 text-sm font-semibold text-purple-900 shadow-sm
                hover:bg-purple-200 transition ease-out duration-300 border-purple-700 border-2">
                Ouvrir mon chat
              </a>
              <button @click="startGameModal = true; startTwitchModal = false" class="border-2 btn border-emerald-700">
                Lancer la partie
              </button>
            </div>
          </div>
        </div>

        <div v-if="startGameModal"
          class="absolute z-20 w-full max-h-[95vh] p-1 overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md left-1/2 top-1/2 max-w-prose">
          <button @click.stop="startGameModal = false" class="absolute top-4 right-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
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
              <div class="grid grid-cols-2 gap-2 pt-2">
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
            <div class="flex flex-col items-center justify-center pt-6 mx-auto space-y-2 w-fit">
              <input v-if="!teamExists" v-model="teamName" type="text" name="teamName" id="teamName"
                class="block rounded-md w-72 border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-amber-600 placeholder:text-gray-600 hover:ring-amber-500 hover:ring-2 focus:ring-2 focus:ring-inset focus:ring-amber-500 transition ease-out duration-300 focus-visible:outline-none"
                placeholder="Choisis ton nom d'équipe">
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
      <FourthRound v-if="gameStarted && currentRound === 4" @round-ended="handleRoundEnded" :key="'fourth-' + roundKey" />
      <FithRound v-if="gameStarted && currentRound === 5" @round-ended="handleRoundEnded" :key="'fith-' + roundKey" />
    </div>

    <div v-if="gameEnded && endGameModal"
      class="absolute z-20 w-full h-[95vh] p-2 transform -translate-x-1/2 bg-white rounded-md left-1/2 top-1/2 -translate-y-1/2 overflow-y-auto md:w-1/2 xl:w-1/3">
      <div class="p-6 ">
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
          <span> Classement des participants: </span>
          <table class="min-w-full mt-4 divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Position</th>
                <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Nom</th>
                <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Score</th>
              </tr>
            </thead>
            <tbody class="min-w-full bg-white divide-y divide-gray-200">
              <tr v-for="(score, index) in detailedScores" :key="score.username" class="first:bg-yellow-100 [&:nth-child(2)]:bg-slate-200 [&:nth-child(3)]:bg-amber-400/40">
                <td class="px-2 py-3 text-sm whitespace-nowrap">{{ index + 1 }}.</td>
                <td class="px-2 py-3 text-sm whitespace-nowrap">{{ score.username }}</td>
                <td class="px-2 py-3 text-sm whitespace-nowrap">{{ score.score }}</td>
              </tr>
            </tbody>
          </table>
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
        <div class="flex items-center justify-center pt-10 space-x-6">
          <div>
            <button @click="startGame" class="border-2 btn border-emerald-700">
              Nouvelle partie
            </button>
          </div>
          <div>
            <button @click="showDashboard = true;"
              class="rounded-xl bg-amber-50 px-2.5 py-1.5 text-sm font-semibold text-amber-900 shadow-sm hover:bg-amber-200 transition ease-out duration-300 border-amber-700 border-2">
              Classements
            </button>
          </div>
        </div>
      </div>
    </div>



    <div v-if="!gameStarted" class="absolute transform -translate-x-1/2 bottom-6 left-1/2">
      <div class="flex flex-col items-center justify-center space-y-1">
        <a class="flex items-center px-2 py-1 space-x-1 transition duration-300 ease-out bg-blue-50 rounded-xl hover:bg-blue-200" href="https://www.buymeacoffee.com/omarleomar" target="_blank">
          <img class="w-5 h-5" :src="iconImage" alt="" />
          <span class="text-sm font-medium text-blue-900">Buy me trouts</span>
        </a>
        <div>
          <span class="text-xs italic text-white">by Omar for las Truitas \tʁɥi.tas\</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, query, where, getDocs, addDoc, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useStore } from '../store/useStore';

import FirstRound from "./FirstRound.vue";
import SecondRound from "./SecondRound.vue";
import ThirdRound from "./ThirdRound.vue";
import FourthRound from "./FourthRound.vue";
import FithRound from "./FithRound.vue";


import ScoreDashboard from "./ScoreDashboard.vue";

import iconImage from "/public/images/cartoon_trout.webp";
import bgImage from "/public/images/bg-loutre-2.jpg";
import gameLoop from "/public/sounds/gameLoop.mp3";


export default {
  name: "WordsGame",
  components: {
    FirstRound,
    SecondRound,
    ThirdRound,
    FourthRound,
    FithRound,
    ScoreDashboard
  },
  data() {
    return {
      channelName: '',
      teamName: '',
      teamExists: false,
      startGameModal: false,
      startTwitchModal: false,
      endGameModal: true,
      gameStarted: false,
      gameEnded: false,
      currentRound: 0,
      roundKey: 0,
      finalScore: 0,
      detailedScores: [],
      bgImage,
      iconImage,
      gameLoop,
      playing: true,
      availableRounds: [
        { id: 1, name: 'Lettre + Catégorie', component: 'FirstRound' },
        { id: 2, name: 'Définitions', component: 'SecondRound' },
        { id: 3, name: 'Pendu', component: 'ThirdRound' },
        { id: 4, name: 'Synonyme', component: 'FourthRound' },
        { id: 5, name: 'Scrabble', component: 'FithRound' }

      ],
      selectedRounds: [1, 2, 3, 4, 5],
      showDashboard: false
    };
  },
  created() {
    this.fetchChannelNameAndConnect();
  },
  methods: {
    toggleMusic() {
      this.playing = !this.playing;
      this.playing
        ? this.$refs.backgroundMusic.play()
        : this.$refs.backgroundMusic.pause();
    },
    async createOrUpdateTeam() {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        return;
      }

      const teamRef = doc(db, "Teams", this.teamName);
      const teamSnap = await getDoc(teamRef);

      if (!teamSnap.exists()) {
        await setDoc(teamRef, {
          bestGlobalScore: 0,
          displayName: this.teamName
        });
      }

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        teamId: teamRef
      });
    },
    async fetchChannelNameAndConnect() {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          this.channelName = docSnap.data().twitchChannelName;
          const { setChannelName } = useStore();
          setChannelName(this.channelName);
          this.accessToken = docSnap.data().twitchAccessToken;
          const { setAccessToken } = useStore();
          setAccessToken(this.accessToken);
          const teamRef = docSnap.data().teamId;
          if (teamRef) {
            const teamSnap = await getDoc(teamRef);
            if (teamSnap.exists()) {
              this.teamExists = true;
              this.teamName = teamSnap.data().displayName;
            } else {
              this.teamExists = false;
            }
          } else {
            this.teamExists = false;
          }
        } else {
          console.log("No such document!");
          this.teamExists = false;
        }
      }
    },
    toggleRound(roundId) {
      const index = this.selectedRounds.indexOf(roundId);
      if (index === -1) {
        this.selectedRounds.push(roundId);
      } else {
        this.selectedRounds.splice(index, 1);
      }
    },
    async startGame() {
      if (this.teamName.trim() === '') {
        alert('Please enter a team name before starting the game.');
        return;
      }
      await this.createOrUpdateTeam();
      this.startGameModal = false;
      this.startTwitchModal = false;
      this.gameStarted = true;
      this.gameEnded = false;
      this.finalScore = 0;
      this.playing
        ? this.$refs.backgroundMusic.play()
        : this.$refs.backgroundMusic.pause();
      this.detailedScores = [];
      this.currentRound = this.selectedRounds.sort((a, b) => a - b)[0] || 0;
      this.roundKey++;
    },
    async updateBestGlobalScore() {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;
      if (!user) {
        console.log("No user is logged in.");
        return;
      }

      const userDoc = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDoc);
      if (userSnap.exists()) {
        const teamRef = userSnap.data().teamId;
        if (teamRef) {
          const teamDoc = await getDoc(teamRef);
          if (teamDoc.exists()) {
            const currentBestScore = teamDoc.data().bestGlobalScore || 0;
            if (this.finalScore > currentBestScore) {
              await updateDoc(teamRef, {
                bestGlobalScore: this.finalScore
              });
            }
          }
        }
      }
    },
    async handleRoundEnded(data) {
      let sortedSelectedRounds = this.selectedRounds.sort((a, b) => a - b);
      let currentIndex = sortedSelectedRounds.indexOf(this.currentRound);
        this.finalScore += data.total;
        this.updateScores(data.scores);
      if (currentIndex < sortedSelectedRounds.length - 1) {
        this.currentRound = sortedSelectedRounds[currentIndex + 1];
      } else {
        this.gameStarted = false;
        this.gameEnded = true;
        this.endGameModal = true;
        await this.updatePlayerScores();
        await this.updateBestGlobalScore();
      }
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

    async updatePlayerScores() {
      try {
        const db = getFirestore();
        const playersCollection = collection(db, "Players");

        for (const { username, score } of this.detailedScores) {
          const playerQuery = query(playersCollection, where("displayName", "==", username));
          const querySnapshot = await getDocs(playerQuery);

          if (querySnapshot.empty) {
            await addDoc(playersCollection, {
              displayName: username,
              bestScore: score
            });
            console.log(`New player document created for ${username} with score ${score}`);
          } else {
            querySnapshot.forEach(async (playerDoc) => {
              const playerData = playerDoc.data();
              if (score > playerData.bestScore) {
                await updateDoc(playerDoc.ref, {
                  bestScore: score
                });
              }
            });
          }
        }
      } catch (error) {
        console.error("Error updating player scores:", error);
      }
    }

  }
};
</script>
