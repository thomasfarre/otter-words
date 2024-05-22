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
          class="absolute z-20 w-full p-1 transform -translate-x-1/2 bg-white rounded-md left-1/2 top-24 xl:max-w-prose">
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
                Pour jouer il est nécessaire d'entrer les réponses dans ton chat. <br> <strong>Ouvre le</strong> si ce
                n'est
                pas déjà fait,
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
          class="absolute z-20 w-full p-1 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md left-1/2 top-1/2 xl:max-w-prose">
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
    </div>

    <div v-if="gameEnded && endGameModal"
      class="absolute z-20 p-1 transform -translate-x-1/2 bg-white rounded-md left-1/2 top-20">
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
        <img class="w-10 h-10 opacity-80" :src="iconImage" alt="" />
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
import FirstRound from "./FirstRound.vue";
import SecondRound from "./SecondRound.vue";
import ThirdRound from "./ThirdRound.vue";
import ScoreDashboard from "./ScoreDashboard.vue";


import iconImage from "@/assets/images/trout.png";
import bgImage from "/public/images/bg-loutre-2.jpg";

export default {
  name: "WordsGame",
  components: {
    FirstRound,
    SecondRound,
    ThirdRound,
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
      availableRounds: [
        { id: 1, name: 'Lettre + Catégorie', component: 'FirstRound' },
        { id: 2, name: 'Définitions', component: 'SecondRound' },
        { id: 3, name: 'Pendu', component: 'ThirdRound' }
      ],
      selectedRounds: [1, 2, 3],
      showDashboard: false
    };
  },
  created() {
    this.fetchChannelNameAndConnect();
  },
  methods: {
    async createOrUpdateTeam() {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.log("No user is logged in.");
        return;
      }

      const teamRef = doc(db, "Teams", this.teamName);
      const teamSnap = await getDoc(teamRef);

      if (!teamSnap.exists()) {
        await setDoc(teamRef, {
          bestGlobalScore: 0,
          displayName: this.teamName
        });
        console.log("Team created with name:", this.teamName);
      }

      // Update the user's document to link to the new team
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        teamId: teamRef
      });
      console.log("User's teamId updated.");
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
              console.log("Best global score updated.");
            }
          }
        }
      }
    },
    async handleRoundEnded(data) {
      let sortedSelectedRounds = this.selectedRounds.sort((a, b) => a - b);
      let currentIndex = sortedSelectedRounds.indexOf(this.currentRound);
      if (currentIndex < sortedSelectedRounds.length - 1) {
        this.finalScore += data.total;
        this.updateScores(data.scores);
        this.currentRound = sortedSelectedRounds[currentIndex + 1];
      } else {
        this.finalScore += data.total;
        this.gameStarted = false;
        this.gameEnded = true;
        this.endGameModal = true;

        this.updateScores(data.scores);
        await this.updatePlayerScores(data.scores); // Update player scores here
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

    async updatePlayerScores(newScores) {
      const db = getFirestore();
      const playersCollection = collection(db, "Players");

      for (const [username, score] of Object.entries(newScores)) {
        const playerQuery = query(playersCollection, where("displayName", "==", username));
        const querySnapshot = await getDocs(playerQuery);

        if (querySnapshot.empty) {
          // Create a new player document if it doesn't exist
          await addDoc(playersCollection, {
            displayName: username,
            bestScore: score
          });
          console.log(`New player document created for ${username} with score ${score}`);
        } else {
          querySnapshot.forEach(async (playerDoc) => {
            const playerData = playerDoc.data();
            if (score > playerData.bestScore) {
              // Update the best score if the new score is higher
              await updateDoc(playerDoc.ref, {
                bestScore: score
              });
              console.log(`Player ${username}'s best score updated to ${score}`);
            }
          });
        }
      }
    }

  }
};
</script>
