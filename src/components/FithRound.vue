<template>
  <div v-if="timeLeft > 0">
    <div class="max-w-[1100px] mx-auto">
      <div class="space-y-4 md:space-y-0 md:grid-cols-9 md:grid-rows-3 md:gap-4 md:grid">
        <div class="flex-col items-center justify-center hidden col-span-6 p-8 space-y-4 text-center bg-white md:flex rounded-card">
          <div class="title text-brown">
            <span> Round 5 : Le scrabble </span>
          </div>
          <div class="text-brown">
            <span>
              Plusieurs lettres s'affichent directement, d'autre arrivent au fur et à mesures, à vous de former un maximum de mots avec elles !
            </span>
          </div>
        </div>
        <div
          class="relative flex-col justify-center hidden col-span-3 p-8 space-y-4 md:flex bg-green rounded-card"
        >
          <div>
            <span class="text-white subtitle"> Le score de ton équipe </span>
          </div>
          <div class="flex flex-col">
            <span class="text-white title"> {{ tweened.totalScore.toFixed(0) }} points </span>
            <span class="font-bold text-white"> C'est super </span>
          </div>
          <div class="absolute bottom-0 right-0">
            <img :src="scoreImage" alt="" />
          </div>
        </div>

        <div class="h-full col-span-4 row-span-2 pt-4 text-center bg-white rounded-card">
          <div class="px-8">
            <div class="flex items-center justify-center space-x-4">
              <div>
                <svg
                  class="w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 36 36"
                >
                  <rect width="36" height="36" fill="#481A1A" rx="18" />
                  <path
                    fill="#fff"
                    d="M13.327 27.036c0-.875.267-1.59.8-2.144.555-.576 1.312-.864 2.272-.864.96 0 1.707.288 2.24.864.555.555.832 1.27.832 2.144 0 .875-.277 1.6-.832 2.176-.533.555-1.28.832-2.24.832-.96 0-1.717-.277-2.272-.832-.533-.576-.8-1.301-.8-2.176Zm1.056-4.192c-.362-.192-.704-.533-1.024-1.024-.32-.512-.48-1.11-.48-1.792 0-.661.17-1.152.512-1.472.363-.341.886-.597 1.568-.768l2.496-.608c1.067-.277 1.6-.79 1.6-1.536 0-.405-.202-.757-.608-1.056-.384-.299-1.056-.448-2.016-.448-.874 0-1.696.117-2.464.352-.768.213-1.386.47-1.856.768a4.107 4.107 0 0 1-.928-.992c-.256-.405-.384-.885-.384-1.44 0-.555.16-1.035.48-1.44.32-.427.758-.768 1.312-1.024.576-.277 1.248-.48 2.016-.608.79-.128 1.654-.192 2.592-.192 2.518 0 4.416.565 5.696 1.696 1.302 1.11 1.952 2.57 1.952 4.384 0 3.413-2.41 5.6-7.232 6.56l-3.232.64Z"
                  />
                </svg>
              </div>
              <span class="subtitle text-brown"> Les mots à trouver </span>
            </div>
            <div class="flex flex-col items-center justify-center pt-8 space-y-1">
              <span class="text-sm italic text-gray-500"> avec les lettres </span>
              <div class="flex flex-wrap justify-center gap-2 pt-1">
                <span
                  class="px-2 py-1 text-2xl font-medium uppercase rounded text-brown bg-amber-200"
                  v-for="(letter, index) in randomLetters"
                  :key="index"
                >
                  {{ letter }}
                </span>
              </div>
            </div>
            <div class="px-8 pt-8">
              <input
                v-model="userMessage"
                @keyup.enter="handleUserMessage"
                type="text"
                placeholder="Votre réponse ici"
                class="w-full p-2 text-lg text-gray-700 border border-green focus:ring-2 ring-green focus-visible:outline-none placeholder:text-gray-400 placeholder:italic placeholder:text-xl"
              />
            </div>
          </div>
          <div class="py-12 mt-12 bg-gray-200 rounded-b-card">
            <div class="flex items-center justify-center space-x-4">
              <button
                @click="selectRandomLetters"
                class="flex items-center justify-center space-x-4 transition duration-300 ease-out rounded-full group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-8 h-8 transition duration-300 ease-out text-green group-hover:text-green-hover"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span
                  class="underline transition duration-300 ease-out text-brown group-hover:text-brown-hover"
                >
                  au secours, c'est trop dur, je passe</span
                >
              </button>
            </div>
          </div>
        </div>
        <div class="col-span-5 row-span-1 px-8 py-4 text-center bg-white rounded-card">
          <div
            class="flex items-center justify-center mx-auto max-w-72"
          >
            <div>
              <svg
                class="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 37 36"
              >
                <rect width="36" height="36" x=".5" fill="#481A1A" rx="18" />
                <path
                  fill="#fff"
                  d="M19.5 19h2a1 1 0 0 1 0 2h-3a.997.997 0 0 1-1-1v-4a1 1 0 0 1 2 0v3Zm-7.13-4.139a1.5 1.5 0 1 1 2.077-1.76 7.98 7.98 0 0 1 1.126-.548A2.5 2.5 0 0 1 17 8h3a2.5 2.5 0 0 1 1.428 4.553c.39.154.767.337 1.127.548a1.5 1.5 0 1 1 2.076 1.76 8 8 0 1 1-12.261 0Zm6.13 11.14a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM17 10a.5.5 0 1 0 0 1h3a.5.5 0 1 0 0-1h-3Z"
                />
              </svg>
            </div>
            <span class="!leading-6 subtitle text-brown">
              Trouve un maximum de mots dans les temps
            </span>
          </div>
          <div class="relative mt-8">
            <ProgressBar
              :progressBarWidth="progressBarWidth"
              :otterImage="otterImage"
              :cartoonTroutImage="cartoonTroutImage"
            />
          </div>
          <div class="pt-12">
            <span class="subtitle text-green">
              {{ timeLeft }}
            </span>
            <span class="text-lg font-bold text-brown">
              secondes restantes, dépêche-toi !
            </span>
          </div>
        </div>

        <div class="col-span-5 row-span-1 text-center bg-white rounded-card bg-[url('/public/images/toto.png')] bg-bottom bg-cover h-full">
          <div
            class="flex items-center justify-center py-4 space-x-4 bg-white rounded-t-card"
          >
            <div>
              <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 36"><g clip-path="url(#a)"><path fill="#481A1A" d="M36 18c0-9.941-8.059-18-18-18S0 8.059 0 18s8.059 18 18 18 18-8.059 18-18Z"/><path fill="#fff" stroke="#fff" stroke-width=".457" d="M30.857 14.406a6.186 6.186 0 0 0-6.179-6.18 6.189 6.189 0 0 0-6.088 5.12H5.534a.391.391 0 0 0-.39.392v1.336c0 .216.174.39.39.39H18.59c.053.303.127.597.221.882.008.029.707 2.84 1.733 5.612 1.448 3.913 2.8 5.815 4.13 5.815h.006c1.273-.006 2.584-1.847 4.008-5.63a59.463 59.463 0 0 0 1.707-5.393 6.146 6.146 0 0 0 .462-2.344Zm-6.179-5.397a5.403 5.403 0 0 1 5.397 5.397 5.403 5.403 0 0 1-5.397 5.396 5.402 5.402 0 0 1-5.396-5.396 5.402 5.402 0 0 1 5.396-5.397ZM5.926 14.13h3.631v.553H5.926v-.553Zm4.414.553v-.553h8.166a6.336 6.336 0 0 0 0 .553H10.34Zm17.614 7.19c-1.738 4.614-2.871 5.117-3.278 5.119h-.002c-.433 0-1.624-.52-3.394-5.3a52.543 52.543 0 0 1-.979-2.928 6.16 6.16 0 0 0 6.861 1.3l-1.957 4.835a.391.391 0 1 0 .726.294l2.328-5.753c.257-.184.5-.387.726-.607-.277.901-.63 1.974-1.031 3.04Zm-3.276-2.557a4.914 4.914 0 0 0 4.91-4.91 4.915 4.915 0 0 0-4.91-4.908 4.915 4.915 0 0 0-4.909 4.909 4.914 4.914 0 0 0 4.91 4.909Zm0-9.036c.826 0 1.595.245 2.241.665l-2.243 6.063a.391.391 0 1 0 .734.272l2.153-5.82a4.113 4.113 0 0 1 1.242 2.947 4.131 4.131 0 0 1-4.127 4.126 4.131 4.131 0 0 1-4.126-4.126 4.131 4.131 0 0 1 4.126-4.127Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h36v36H0z"/></clipPath></defs></svg>
            </div>
            <span class="subtitle text-brown">
              Les mots trouvés
            </span>
          </div>
          <FoundWords :correct-guess="reversedCorrectGuess" />
        </div>

        <div class="relative col-span-9 row-span-1 overflow-hidden text-center bg-white rounded-card">
          <div class="px-8 pt-4">
            <span class="subtitle text-brown">
              La rivière des espoirs déchus
            </span>
          </div>
          <div class="relative overflow-x-auto h-40 bg-[url('/public/images/river.svg')] bg-bottom bg-cover">
            <div class="">
              <div class="flex pt-20 pl-4 space-x-4 whitespace-nowrap">
                <span
                  class="text-lg font-bold text-white"
                  v-for="message in reversedIncorrectGuess"
                  :key="message.id"
                >
                  {{ message.text }}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
  <div v-else>
    <EndOfRound
      :totalScore="totalScore"
      :sortedScores="sortedScores"
      @end-round="endRound"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits, reactive, watch } from "vue";
import { useGameLogic } from "./useGameLogic.js";
import gsap from 'gsap'
import axios from "axios";
import tmi from "tmi.js";

import FoundWords from "./common/FoundWords.vue";
import EndOfRound from "./common/EndOfRound.vue";
import ProgressBar from "./common/ProgressBar.vue";

import otterImage from "/public/images/otter.webp";
import cartoonTroutImage from "/public/images/cartoon_trout.webp";
import scoreImage from "/public/images/score-illustration.png";


const emit = defineEmits(["round-ended"]);

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
const letterTimer = ref(null);
const messages = ref([]);
const foundWords = ref([]);
const randomLetters = ref([]);
const totalScore = ref(0);
const lock = ref(false);
const userMessage = ref("");
const nextLetterType = ref('consonant');


const tweened = reactive({
  totalScore: 0
});

watch(totalScore, (n) => {
  gsap.to(tweened, { duration: 0.7, totalScore: Number(n) || 0 })
});

const fetchChannelNameAndConnect = async () => {
  connectChat(channelName.value);
};

const selectRandomLetters = () => {
  const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
  const vowels = "AEIOU";
  const letters = [];
  const totalLetters = 6;
  const numVowels = Math.floor(totalLetters / 3);
  for (let i = 0; i < numVowels; i++) {
    letters.push(vowels[Math.floor(Math.random() * vowels.length)]);
  }
  for (let i = 0; i < totalLetters - numVowels; i++) {
    letters.push(consonants[Math.floor(Math.random() * consonants.length)]);
  }
  randomLetters.value = letters.sort(() => Math.random() - 0.5);
  fetchValidWords();
};

const fetchValidWords = async () => {
  try {
    sounds.value[1]?.play();
    const response = await axios.get("/data/scrabble.json");
    foundWords.value = filterValidWords(response.data.words);
    console.log(foundWords.value);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

const filterValidWords = (words) => {
  const randomLettersCopy = [...randomLetters.value];

  return words.filter((word) => {
    const wordLetters = [...word.toUpperCase()];
    const lettersCopy = [...randomLettersCopy];

    for (let letter of wordLetters) {
      const letterIndex = lettersCopy.indexOf(letter);
      if (letterIndex === -1) {
        return false;
      }
      lettersCopy.splice(letterIndex, 1);
    }
    return true;
  });
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
  const lowerCaseFoundWords = foundWords.value.map((word) =>
    normalizeText(word)
  );
  if (lowerCaseFoundWords.includes(normalizedMessage)) {
    correctGuess.value.push({ text: message, username });
    sounds.value[2]?.play();
    if (!scores.value[username]) {
      scores.value[username] = 0;
    }
    const wordLength = message.length;
    const scoreIncrement = wordLength;
    scores.value[username] += scoreIncrement;
    totalScore.value += scoreIncrement;
    foundWords.value = foundWords.value.filter(
      (word) => normalizeText(word) !== normalizedMessage
    );
  } else {
    incorrectGuess.value.push({
      text: message,
      id: incorrectGuess.value.length + 1,
    });
  }
  lock.value = false;
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
    } else {
      clearInterval(timer.value);
      clearInterval(letterTimer.value);
    }
  }, 1000);
};

const endRound = () => {
  if (client.value) {
    client.value.disconnect();
  }
  clearInterval(timer.value);
  clearInterval(letterTimer.value);
  emit("round-ended", {
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

const addLetter = () => {
  const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
  const vowels = "AEIOU";
  let letter;

  if (nextLetterType.value === "consonant") {
    letter = consonants[Math.floor(Math.random() * consonants.length)];
    nextLetterType.value = 'vowel';
  } else {
    letter = vowels[Math.floor(Math.random() * vowels.length)];
    nextLetterType.value = 'consonant';
  }

  randomLetters.value.push(letter);
  fetchValidWords();
};

onMounted(() => {
  fetchChannelNameAndConnect();
  selectRandomLetters();
  startTimer();
  letterTimer.value = setInterval(() => {
    if (timeLeft.value % 12 === 0) {
      addLetter();
    }
    if (timeLeft.value % 60 === 4) {
      sounds.value[0]?.play();
    }
    if (timeLeft.value % 60 === 0) {
      selectRandomLetters();
    }
  }, 1000);
});

onBeforeUnmount(() => {
  if (client.value) {
    client.value.disconnect();
  }
  clearInterval(timer.value);
  clearInterval(letterTimer.value);
});
</script>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
