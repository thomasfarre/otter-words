<template>
  <div
    class="min-h-screen bg-cover"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <!-- Header -->
    <div class="absolute z-50 right-12">
      <div class="flex items-center px-4 py-2 space-x-6 bg-white rounded-b-3xl">
        <a href="/" class="font-bold transition duration-300 ease-out text-brown hover:text-brown-hover">
          Revenir à l'accueil
        </a>
        <button @click="toggleMusic" class="-mt-1.5 font-bold transition duration-300 ease-out text-brown hover:text-brown-hover">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7">
            <path d="M15 6.75a.75.75 0 0 0-.75.75V18a.75.75 0 0 0 .75.75h.75a.75.75 0 0 0 .75-.75V7.5a.75.75 0 0 0-.75-.75H15ZM20.25 6.75a.75.75 0 0 0-.75.75V18c0 .414.336.75.75.75H21a.75.75 0 0 0 .75-.75V7.5a.75.75 0 0 0-.75-.75h-.75ZM5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L5.055 7.061Z" />
          </svg>

        </button>
        <audio ref="backgroundMusic" loop>
          <source :src="gameLoop" type="audio/mpeg" />
        </audio>
      </div>
    </div>
    <DayChallenge v-if="showDayChallenge" @close="showDayChallenge = false" @game-started="gameStarted = $event" />

    <div class="px-4 pt-12 pb-4 mx-auto md:pt-4">
      <!-- Lobby Section -->
      <div v-if="!gameStarted" class="pt-20">
        <div class="flex justify-center">
          <img :src="logoImage" alt="" />
        </div>
        <div class="pt-8 text-center">
          <div>
            <h1 class="text-white title">Le Jeu trop cool</h1>
          </div>
          <div>
            <span class="text-white subtitle"
              >des loutres, des mots et des truites bien sûr</span
            >
          </div>
          <div class="flex flex-col items-center justify-center pt-10 space-y-4">
            <div>
              <button @click="startGameModal = true" class="w-80 whitespace-nowrap btn-white">
                Nouvelle partie
              </button>
            </div>
            <div>
              <button @click="showDashboard = true" class="w-80 whitespace-nowrap btn-white">
                Classements
              </button>
            </div>
            <div v-if="!isLoggedIn">
              <TwitchLogin buttonText="Défi du jour" />
            </div>
            <div v-else>
              <button @click="showDayChallenge = true" class="w-80 whitespace-nowrap btn-white">
                Défi du jour
              </button>
            </div>
            <div v-if="!isLoggedIn" >
              <TwitchLogin buttonText="En équipe via Twitch" />
            </div>
          </div>
          <StartGameModal
            v-if="startGameModal"
            @close="startGameModal = false"
            :availableRounds="availableRounds"
            :selectedRounds="selectedRounds"
            :teamExists="teamExists"
            :teamName="teamName"
            :isLoggedIn="isLoggedIn"
            @toggle-round="toggleRound"
            @start-game="startGame"
          />
          <ScoreDashboard v-if="showDashboard" @close="showDashboard = false" />
        </div>
      </div>
      <FirstRound
        v-if="gameStarted && currentRound === 1"
        @round-ended="handleRoundEnded"
        :isLoggedIn="isLoggedIn"
        :key="'first-' + roundKey"
      />
      <SecondRound
        v-if="gameStarted && currentRound === 2"
        @round-ended="handleRoundEnded"
        :isLoggedIn="isLoggedIn"
        :key="'second-' + roundKey"
      />
      <ThirdRound
        v-if="gameStarted && currentRound === 3"
        @round-ended="handleRoundEnded"
        :isLoggedIn="isLoggedIn"
        :key="'third-' + roundKey"
      />
      <FourthRound
        v-if="gameStarted && currentRound === 4"
        @round-ended="handleRoundEnded"
        :isLoggedIn="isLoggedIn"
        :key="'fourth-' + roundKey"
      />
      <FithRound
        v-if="gameStarted && currentRound === 5"
        @round-ended="handleRoundEnded"
        :isLoggedIn="isLoggedIn"
        :key="'fith-' + roundKey"
      />
    </div>

    <EndGameModal
      v-if="gameEnded && endGameModal"
      @close="endGameModal = false"
      :finalScore="finalScore"
      :teamExists="teamExists"
      :detailedScores="detailedScores"
      :availableRounds="availableRounds"
      :selectedRounds="selectedRounds"
      :isLoggedIn="isLoggedIn"
      :playedAlone="playedAlone"
      @toggle-round="toggleRound"
      @start-game="startGame"
      @toggle-dashboard="showDashboard = true"
      @save-score="saveScore"
      @save-team="handleTeamSaved"
    />


    <div
      v-if="!gameStarted"
      class="absolute transform -translate-x-1/2 bottom-6 left-1/2"
    >
      <div class="flex flex-col items-center justify-center">
        <a
          class="flex items-center px-2 py-1 space-x-1 transition duration-300 ease-out group"
          href="https://www.buymeacoffee.com/omarleomar"
          target="_blank"
        >
          <img class="w-6 h-6 transition-transform duration-300 group-hover:animate-wiggle" :src="iconImage" alt="" />
          <span class="text-sm font-medium text-gray-200 transition duration-300 ease-out group-hover:text-white">Buy me trouts</span>
        </a>
        <div class="text-center">
          <span class="text-xs italic text-white"
            >by Omar and Julie for las Truitas \tʁɥi.tas\</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useStore } from "../store/useStore";

import FirstRound from "./FirstRound.vue";
import SecondRound from "./SecondRound.vue";
import ThirdRound from "./ThirdRound.vue";
import FourthRound from "./FourthRound.vue";
import FithRound from "./FithRound.vue";
import ScoreDashboard from "./ScoreDashboard.vue";
import StartGameModal from "./StartGameModal.vue";
import EndGameModal from "./EndGameModal.vue";
import DayChallenge from "./DayChallenge.vue";
import TwitchLogin from "./TwitchLogin.vue";



import iconImage from "/public/images/cartoon_trout.webp";
import logoImage from "/public/images/logo.png";
import bgImage from "/public/images/bg-loutre-2.jpg";
import gameLoop from "/public/sounds/gameLoop.mp3";

const channelName = ref("");
const teamName = ref("");
const isLoggedIn = ref(false);
const teamExists = ref(false);
const startGameModal = ref(false);
// const startTwitchModal = ref(false);
const endGameModal = ref(true);
const gameStarted = ref(false);
const gameEnded = ref(false);
const currentRound = ref(0);
const roundKey = ref(0);
const finalScore = ref(0);
const detailedScores = ref([]);
const playing = ref(true);
const availableRounds = ref([
  { id: 1, name: "Le petit bac", component: "FirstRound" },
  { id: 2, name: "Le dico", component: "SecondRound" },
  { id: 3, name: "Le pendu", component: "ThirdRound" },
  { id: 4, name: "Les synonymes", component: "FourthRound" },
  { id: 5, name: "Le scrabble", component: "FithRound" },
]);
const selectedRounds = ref([1, 2, 3, 4, 5]);
const showDashboard = ref(false);
const backgroundMusic = ref(null);
const playedAlone = ref(false);
const showDayChallenge = ref(false);


const toggleMusic = () => {
  playing.value = !playing.value;
  if (playing.value) {
    backgroundMusic.value.play();
  } else {
    backgroundMusic.value.pause();
  }
};

const createOrUpdateTeam = async (teamName) => {
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return;

  const teamRef = doc(db, "Teams", teamName);
  const teamSnap = await getDoc(teamRef);

  if (!teamSnap.exists()) {
    await setDoc(teamRef, {
      bestGlobalScore: 0,
      displayName: teamName,
    });
  }

  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, {
    teamId: teamRef,
  });
};


const startGame = async () => {
  startGameModal.value = false;
  gameStarted.value = true;
  gameEnded.value = false;
  finalScore.value = 0;
  if (playing.value) {
    backgroundMusic.value.play();
  } else {
    backgroundMusic.value.pause();
  }
  detailedScores.value = [];
  currentRound.value = selectedRounds.value.sort((a, b) => a - b)[0] || 0;
  roundKey.value++;
};

const fetchChannelNameAndConnect = async () => {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;
  if (user) {
    isLoggedIn.value = true;
    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      channelName.value = docSnap.data().twitchChannelName;
      const { setChannelName } = useStore();
      setChannelName(channelName.value);
      const teamRef = docSnap.data().teamId;
      if (teamRef) {
        const teamSnap = await getDoc(teamRef);
        if (teamSnap.exists()) {
          teamExists.value = true;
          teamName.value = teamSnap.data().displayName;
        } else {
          teamExists.value = false;
        }
      } else {
        teamExists.value = false;
      }
    } else {
      console.log("No such document!");
      teamExists.value = false;
    }
  }
};

const toggleRound = (roundId) => {
  const index = selectedRounds.value.indexOf(roundId);
  if (index === -1) {
    selectedRounds.value.push(roundId);
  } else {
    selectedRounds.value.splice(index, 1);
  }
};

const updateBestGlobalScore = async (teamName = null) => {
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
    const teamRef = teamName ? doc(db, "Teams", teamName) : userSnap.data().teamId;
    if (teamRef) {
      const teamDoc = await getDoc(teamRef);
      if (teamDoc.exists()) {
        const currentBestScore = teamDoc.data().bestGlobalScore || 0;
        if (finalScore.value > currentBestScore) {
          await updateDoc(teamRef, {
            bestGlobalScore: finalScore.value,
          });
        }
      }
    }
  }
};

const handleTeamSaved = async (teamName) => {
  await createOrUpdateTeam(teamName);
  await updateBestGlobalScore(teamName);
  teamExists.value = true;
};

const handleRoundEnded = async (data) => {
  const sortedSelectedRounds = selectedRounds.value.sort((a, b) => a - b);
  const currentIndex = sortedSelectedRounds.indexOf(currentRound.value);
  finalScore.value += data.total;
  updateScores(data.scores);
  playedAlone.value = detailedScores.value.length === 1;
  if (currentIndex < sortedSelectedRounds.length - 1) {
    currentRound.value = sortedSelectedRounds[currentIndex + 1];
  } else {
    gameStarted.value = false;
    gameEnded.value = true;
    endGameModal.value = true;
    const auth = getAuth();
    if (auth.currentUser) {
      await updatePlayerScores();
      await updateBestGlobalScore();
    }
  }
};

const updateScores = (newScores) => {
  Object.keys(newScores).forEach((username) => {
    let existingUser = detailedScores.value.find(
      (user) => user.username === username
    );
    if (existingUser) {
      existingUser.score += newScores[username];
    } else {
      detailedScores.value.push({ username, score: newScores[username] });
    }
  });
  detailedScores.value.sort((a, b) => b.score - a.score);
};

const saveScore = async (userName) => {
  try {
    const db = getFirestore();
    const playersCollection = collection(db, "Players");

    const playerQuery = query(
      playersCollection,
      where("displayName", "==", userName)
    );
    const querySnapshot = await getDocs(playerQuery);

    if (querySnapshot.empty) {
      await addDoc(playersCollection, {
        displayName: userName,
        bestScore: finalScore.value,
      });
      console.log(
        `New player document created for ${userName} with score ${finalScore.value}`
      );
    } else {
      querySnapshot.forEach(async (playerDoc) => {
        const playerData = playerDoc.data();
        if (finalScore.value > playerData.bestScore) {
          await updateDoc(playerDoc.ref, {
            bestScore: finalScore.value,
          });
        }
      });
    }
  } catch (error) {
    console.error("Error updating player scores:", error);
  }
};

const updatePlayerScores = async () => {
  try {
    const db = getFirestore();
    const playersCollection = collection(db, "Players");

    for (const { username, score } of detailedScores.value) {
      const playerQuery = query(
        playersCollection,
        where("displayName", "==", username)
      );
      const querySnapshot = await getDocs(playerQuery);

      if (querySnapshot.empty) {
        await addDoc(playersCollection, {
          displayName: username,
          bestScore: score,
        });
        console.log(
          `New player document created for ${username} with score ${score}`
        );
      } else {
        querySnapshot.forEach(async (playerDoc) => {
          const playerData = playerDoc.data();
          if (score > playerData.bestScore) {
            await updateDoc(playerDoc.ref, {
              bestScore: score,
            });
          }
        });
      }
    }
  } catch (error) {
    console.error("Error updating player scores:", error);
  }
};

onMounted(fetchChannelNameAndConnect);
</script>
