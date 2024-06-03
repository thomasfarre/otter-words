<template>
  <div v-if="timeLeft > 0" class="text-center">
    <div>
      <div class="mx-auto bg-white rounded-md shadow-md max-w-prose">
        <div class="relative px-6 pt-3 pb-2">
          <div class="absolute z-30 -top-4 -left-4">
            <img class="w-10 h-10" :src="otterImage" alt="" />
          </div>
          <ProgressBar :progressBarWidth="progressBarWidth" :otterImage="otterImage" :cartoonTroutImage="cartoonTroutImage" />
          <div class="pt-2 text-left">
            <span class="text-sm italic text-gray-500">Trouve le mot</span>
          </div>
          <div class="absolute transform -translate-x-1/2 top-4 left-1/2">
            <span class="text-2xl font-black text-gray-900 font-poppins">{{ timeLeft }}s</span>
          </div>
          <div class="pt-6">
            <span class="text-xs italic text-gray-500">Lettres non révélées</span>
            <div class="flex flex-wrap justify-center gap-2 pt-1">
              <span class="px-2 py-1 text-2xl font-medium text-gray-800 uppercase rounded bg-amber-200" v-for="(letter, index) in unrevealedLetters" :key="index">{{ letter }}</span>
            </div>
          </div>
          <div class="flex flex-col pt-6 space-y-4">
            <div class="px-2 mx-auto rounded-md bg-amber-50 w-fit">
              <span class="text-xs font-bold text-gray-700 uppercase">{{ catGram }}</span>
              <span class="text-xs font-medium text-gray-700">({{ revealedWord.length }} lettres)</span>
            </div>
            <span class="text-2xl tracking-[0.4em] text-gray-700 uppercase">{{ revealedWord }}</span>
          </div>
          <div class="flex flex-col items-center justify-center mt-6">
            <button @click="fetchWordAndDefinition" class="p-2 transition duration-300 ease-out rounded-full bg-amber-200 hover:bg-amber-300 group">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 transition duration-300 ease-out text-amber-700 group-hover:text-amber-900">
                <path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clip-rule="evenodd" />
              </svg>
            </button>
            <span class="text-xs italic text-gray-500">O secours c tro dur</span>
          </div>
          <LiveRoundScore :totalScore="totalScore" :sortedScores="sortedScores" />
        </div>
      </div>
      <div class="flex items-center justify-center mt-1 xl:hidden">
        <input v-model="userMessage" @keyup.enter="handleUserMessage" type="text" placeholder="Entrez votre réponse ici..." class="p-2 text-gray-700 border rounded-md bg-amber-50 placeholder:text-gray-500" />
      </div>
      <FoundWords :correctGuess="reversedCorrectGuess" />
    </div>
    <div class="mt-8">
      <span class="text-xl font-bold text-white font-poppins">La Rivière des espoirs déchûs</span>
      <div class="hidden xl:flex xl:items-center xl:justify-center xl:mt-2">
        <input v-model="userMessage" @keyup.enter="handleUserMessage" type="text" placeholder="Entrez votre réponse ici..." class="p-2 text-gray-700 border rounded-md bg-amber-50 placeholder:text-gray-500" />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
        <defs>
          <linearGradient id="a" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stop-color="rgb(209, 250, 229, 1)" />
            <stop offset="100%" stop-color="#6ee7b7" />
          </linearGradient>
        </defs>
        <path fill="url(#a)" d="m0 60 21.8-10C43.6 40 87 20 131 21.7 174.5 23 218 47 262 58.3c43.5 11.7 87 11.7 131 15 43.4 3.7 87 9.7 131 10 43.3-.3 87-6.3 131-20C698.2 50 742 30 785 31.7c44.1 1.3 88 25.3 131 25 44 .3 88-23.7 131-23.4 43.9-.3 88 23.7 131 23.4 43.8.3 87-23.7 131-23.4 43.7-.3 87 23.7 131 30 43.6 6.7 87-3.3 131-5 43.5-1.3 87 4.7 131 0 43.5-5.3 87-21.3 131-18.3 43.4 3 87 27 131 25 43.3-2 87-28 131-43.3 43.2-14.7 87-18.7 130-10 44.1 8.3 88 28.3 131 41.6 44 13.7 88 19.7 131 23.4 43.9 3.3 88 3.3 131 0 43.8-3.7 87-9.7 131-23.4 43.7-13.3 87-33.3 131-30 43.6 3.7 87 29.7 131 40 43.5 9.7 87 3.7 109 0l21.8-3.3v40H0Z" />
      </svg>
    </div>
    <div class="w-screen px-6 py-2 -mt-px bg-emerald-100">
      <div class="flex space-x-4 overflow-x-auto whitespace-nowrap">
        <span class="text-sm text-emerald-900" v-for="message in reversedIncorrectGuess" :key="message.id">
          {{ message.text }}
          <svg class="max-w-12 max-h-12 opacity-60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -0.5 25 25">
            <path stroke="#047857" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.505 9.895a.673.673 0 0 1 1.086-.378l1.344.9a.707.707 0 0 0 1.015-.327c2.504-5.03 8.75-3.527 10.513 1.687a.7.7 0 0 1 0 .446C17.7 17.437 11.454 18.941 8.95 13.91a.707.707 0 0 0-1.016-.325l-1.344.9a.673.673 0 0 1-1.085-.38.483.483 0 0 1 .03-.25l.564-1.604a.76.76 0 0 0 0-.5l-.563-1.6a.483.483 0 0 1-.03-.256Z" clip-rule="evenodd" />
            <path stroke="#047857" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.5 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clip-rule="evenodd" />
          </svg>
        </span>
      </div>
    </div>
    <div class="-mt-px">
      <svg xmlns="http://www.w3.org/2000/svg" class="transform rotate-180" viewBox="0 0 1440 100">
        <defs>
          <linearGradient id="a" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stop-color="rgba(236, 253, 245, 1)" />
            <stop offset="100%" stop-color="rgba(167, 243, 208, 1)" />
          </linearGradient>
        </defs>
        <path fill="url(#a)" d="m0 60 21.8-10C43.6 40 87 20 131 21.7 174.5 23 218 47 262 58.3c43.5 11.7 87 11.7 131 15 43.4 3.7 87 9.7 131 10 43.3-.3 87-6.3 131-20C698.2 50 742 30 785 31.7c44.1 1.3 88 25.3 131 25 44 .3 88-23.7 131-23.4 43.9-.3 88 23.7 131 23.4 43.8.3 87-23.7 131-23.4 43.7-.3 87 23.7 131 30 43.6 6.7 87-3.3 131-5 43.5-1.3 87 4.7 131 0 43.5-5.3 87-21.3 131-18.3 43.4 3 87 27 131 25 43.3-2 87-28 131-43.3 43.2-14.7 87-18.7 130-10 44.1 8.3 88 28.3 131 41.6 44 13.7 88 19.7 131 23.4 43.9 3.3 88 3.3 131 0 43.8-3.7 87-9.7 131-23.4 43.7-13.3 87-33.3 131-30 43.6 3.7 87 29.7 131 40 43.5 9.7 87 3.7 109 0l21.8-3.3v40H0Z" />
      </svg>
    </div>
  </div>
  <div v-else>
    <EndOfRound :totalScore="totalScore" :sortedScores="sortedScores" :previousWord="previousWord" @end-round="endRound" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, defineEmits } from 'vue';
import { useGameLogic } from './useGameLogic.js';
import axios from "axios";
import tmi from "tmi.js";

import FoundWords from "./common/FoundWords.vue";
import EndOfRound from "./common/EndOfRound.vue";
import ProgressBar from "./common/ProgressBar.vue";
import LiveRoundScore from "./common/LiveRoundScore.vue";

import otterImage from "/public/images/otter.webp";
import cartoonTroutImage from "/public/images/cartoon_trout.webp";

const {
  channelName,
  timeLeft,
  sortedScores,
  progressBarWidth,
  reversedCorrectGuess,
  reversedIncorrectGuess,
  correctGuess,
  incorrectGuess,
  scores,
  sounds,
} = useGameLogic();

const client = ref(null);
const timer = ref(null);
const revealTimer = ref(null);
const messages = ref([]);
const word = ref("");
const catGram = ref("");
const previousWord = ref("");
const revealedWord = ref("");
const revealInterval = ref(5);
const totalScore = ref(0);
const lock = ref(false);
const userMessage = ref("");

const emit = defineEmits(["round-ended"]);

const fetchChannelNameAndConnect = async () => {
  connectChat(channelName.value);
};

const fetchWordAndDefinition = async () => {
  try {
    previousWord.value = word.value;
    sounds.value[1]?.play();
    const response = await axios.get("/words.json");
    const words = response.data.words;
    const keys = Object.keys(words).filter((key) => key.length >= 8);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    word.value = randomKey;
    catGram.value = words[randomKey].catGram;
    revealedWord.value = word.value[0] + "_".repeat(word.value.length - 1);
    console.log(word.value)
    startRevealTimer();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const unrevealedLetters = computed(() => {
  const unrevealed = [];
  for (let i = 1; i < word.value.length; i++) {
    if (revealedWord.value[i] === "_") {
      unrevealed.push(word.value[i]);
    }
  }
  return shuffleArray(unrevealed);
});

const startRevealTimer = () => {
  if (revealTimer.value) clearInterval(revealTimer.value);

  revealTimer.value = setInterval(() => {
    let unrevealedIndices = [];
    for (let i = 1; i < word.value.length; i++) {
      if (revealedWord.value[i] === "_") {
        unrevealedIndices.push(i);
      }
    }

    const lettersToReveal = 1;
    if (unrevealedIndices.length > 0) {
      for (let j = 0; j < lettersToReveal && unrevealedIndices.length > 0; j++) {
        const randomIndex = Math.floor(Math.random() * unrevealedIndices.length);
        const revealIndex = unrevealedIndices[randomIndex];

        let revealed = revealedWord.value.split("");
        revealed[revealIndex] = word.value[revealIndex];
        revealedWord.value = revealed.join("");
        unrevealedIndices.splice(randomIndex, 1);
      }

      if (!revealedWord.value.includes("_")) {
        clearInterval(revealTimer.value);
      }
    } else {
      clearInterval(revealTimer.value);
    }
  }, revealInterval.value * 1000);
};

const handleUserMessage = () => {
  if (userMessage.value.trim() !== "") {
    const username = channelName.value;
    messages.value.push({
      id: messages.value.length + 1,
      username: username,
      text: userMessage.value,
    });
    checkGuess(userMessage.value, username);
    userMessage.value = "";
  }
};

const startTimer = () => {
  timer.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
      if (timeLeft.value === 4) {
        sounds.value[0]?.play();
      }
    } else {
      previousWord.value = word.value;
      clearInterval(revealTimer.value);
      clearInterval(timer.value);
    }
  }, 1000);
};

const normalizeText = (text) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const checkGuess = async (message, username) => {
  if (lock.value) return;
  lock.value = true;
  const normalizedMessage = normalizeText(message);
  if (normalizedMessage === normalizeText(word.value)) {
    const correctGuessEntry = {
      id: correctGuess.value.length + 1,
      username: username,
      text: message,
      correct: true,
    };
    if (!scores.value[username]) {
      scores.value[username] = 0;
    }
    scores.value[username] += 8;
    totalScore.value += 8;
    correctGuess.value.push(correctGuessEntry);
    fetchWordAndDefinition();
  } else {
    const incorrectGuessEntry = {
      id: incorrectGuess.value.length + 1,
      username: username,
      text: message,
      correct: false,
    };
    incorrectGuess.value.push(incorrectGuessEntry);
  }
  lock.value = false;
};

const endRound = () => {
  clearInterval(revealTimer.value);
  emit('round-ended', {
    total: totalScore.value,
    scores: scores.value,
  });
};

const connectChat = (channel) => {
  if (client.value) {
    client.value.disconnect();
  }
  const opts = {
    connection: {
      secure: true,
      reconnect: true,
    },
    channels: [channel],
  };
  client.value = new tmi.Client(opts);
  client.value.on("message", (channel, tags, message, self) => {
    if (self) return;
    messages.value.push({
      id: messages.value.length + 1,
      username: tags["display-name"],
      text: message,
    });
    checkGuess(message, tags["display-name"]);
  });
  client.value.connect().catch(console.error);
};

onMounted(() => {
  fetchChannelNameAndConnect();
  fetchWordAndDefinition();
  startTimer();
});

onBeforeUnmount(() => {
  if (client.value) {
    client.value.disconnect();
  }
  clearInterval(timer.value);
  clearInterval(revealTimer.value);
});
</script>
