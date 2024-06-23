<template>

  <div v-if="showCongratsModal" @click.stop="closeCongratsModal" class="absolute inset-0 w-screen h-screen bg-gray-800 opacity-60"></div>
  <div v-if="showCongratsModal" class="absolute z-40 w-full max-h-[95vh] overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[3rem] left-1/2 top-1/2 max-w-[30rem]">
    <div class="p-6 text-center">
      <span class="title text-brown">Félicitations!</span>
      <p class="pt-4 text-lg text-brown">Tu as mis {{ formattedElapsedSeconds }} secondes</p>
      <button @click="closeCongratsModal" class="mt-6 btn-white">OK</button>
    </div>
  </div>

  <!-- Modal before game starts -->
  <div v-if="!gameStarted && !showCongratsModal" @click.stop="emitClose" class="absolute inset-0 w-screen h-screen bg-gray-800 opacity-60"></div>
  <div v-if="!gameStarted && !showCongratsModal" class="absolute z-40 w-full max-h-[95vh] overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[3rem] left-1/2 top-1/2 max-w-[54rem]">
    <button @click.stop="emitClose" class="absolute transition duration-300 ease-out top-6 right-6 text-brown hover:text-brown-hover">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
    <div class="p-6">
      <div class="w-full text-center">
        <span class="title text-brown"> Classement du jour</span>
      </div>
      <div class="flex flex-col pt-12 space-y-4 text-left xl:space-y-0 xl:space-x-12 xl:flex-row">
        <div class="w-full">
          <span class="subtitle text-brown">Joueurs</span>
          <table class="min-w-full mt-4 divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Position</th>
                  <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Nom</th>
                  <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Score</th>
                </tr>
              </thead>
              <tbody class="min-w-full bg-white divide-y divide-gray-200">
                  <tr  v-for="(player, index) in players" :key="player.id" class="first:bg-yellow-100 [&:nth-child(2)]:bg-slate-200 [&:nth-child(3)]:bg-amber-400/40">
                    <td class="px-2 py-3 text-sm whitespace-nowrap"> {{ index + 1 }}.</td>
                    <td class="px-2 py-3 text-sm whitespace-nowrap"> {{ player.displayName }}</td>
                    <td class="px-2 py-3 text-sm whitespace-nowrap"> {{ player.todayScore }} s</td>
                  </tr>
              </tbody>
          </table>
        </div>
      </div>
      <div class="sticky bottom-0 left-0 right-0 w-full p-6 text-center bg-white">
        <button @click="startGame" class="btn-white">
          Jouer
        </button>
      </div>
    </div>
  </div>

  <!-- Game starts content  -->
  <div v-if="gameStarted">
    <div class="max-w-[1100px] mx-auto pt-8">
      <div
        class="space-y-4 md:space-y-0 md:grid-cols-9 md:grid-rows-4 md:gap-4 md:grid"
      >
        <div
          class="flex-col items-center justify-center hidden col-span-6 p-4 text-center bg-white md:flex rounded-card"
        >
          <div class="title text-brown">
            <span> Défi du jour !</span>
          </div>
          <div class="pt-1">
            <p class="text-brown">trouve tous les mots en un minimum de temps</p>
          </div>
          <div class="pt-8">
            <span class="title text-green">
              {{ elapsedSeconds.toFixed(1) }}
            </span>
            <span class="text-lg font-bold text-brown">
              secondes
            </span>
          </div>
        </div>

        <div
          class="relative flex-col justify-center hidden col-span-3 p-8 space-y-4 md:flex bg-green rounded-card"
        >
          <div>
            <span class="text-white subtitle"> Plus que  </span>
          </div>
          <div class="flex flex-col space-y-2">
            <div class="flex items-baseline space-x-2">
              <span class="text-white title"> 0{{ tweened.questionsLeft.toFixed(0) }} </span>
              <span class="text-white subtitle">définitions</span>
            </div>
            <span class="font-bold text-white"> C'est super </span>
          </div>
          <div class="absolute bottom-0 right-0">
            <img :src="scoreImage" alt="" />
          </div>
        </div>

        <div
          class="h-full col-span-5 row-span-2 pt-4 text-center bg-white rounded-card"
        >
          <div class="px-16">
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
            <div class="pt-4 md:pt-8">
              <div class="px-2 mx-auto rounded-md bg-green w-fit">
                <span class="text-sm font-bold text-white uppercase">{{
                  catGram
                }}</span>
              </div>
            </div>
            <div class="relative mx-auto mt-4 w-fit min-h-20">
              <span class="text-lg font-bold text-brown" ref="definitionText">
                {{ definition }}
              </span>
              <svg
                class="absolute w-7 h-7 -top-4 -left-9 text-brown/70"
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.042 9C10.026 16.776 2.25 29.52 2.25 43.56C2.25 55.008 9.162 61.704 17.154 61.704C24.714 61.704 30.33 55.656 30.33 48.528C30.33 41.4 25.362 36.216 18.882 36.216C17.586 36.216 15.858 36.432 15.426 36.648C16.506 29.304 23.418 20.664 30.33 16.344L21.042 9ZM58.194 9C47.394 16.776 39.618 29.52 39.618 43.56C39.618 55.008 46.53 61.704 54.522 61.704C61.866 61.704 67.698 55.656 67.698 48.528C67.698 41.4 62.514 36.216 56.034 36.216C54.738 36.216 53.226 36.432 52.794 36.648C53.874 29.304 60.57 20.664 67.482 16.344L58.194 9Z"
                  fill="currentColor"
                  fill-opacity="0.25"
                />
              </svg>
            </div>

            <div class="pt-4">
              <input
                v-model="userMessage"
                @keyup.enter="handleUserMessage"
                type="text"
                placeholder="Votre réponse ici"
                class="p-2 text-lg text-gray-700 border w-72 border-green focus:ring-2 ring-green focus-visible:outline-none placeholder:text-gray-400 placeholder:italic placeholder:text-xl"
              />
            </div>
          </div>
        </div>

        <div
          class="col-span-4 row-span-2 text-center rounded-card bg-[url('/public/images/basket.png')] bg-top h-full min-h-36"
        >
          <div
            class="flex items-center justify-center py-4 space-x-4 bg-white rounded-t-card"
          >
            <div>
              <svg
                class="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 36 36"
              >
                <g clip-path="url(#a)">
                  <path
                    fill="#481A1A"
                    d="M36 18c0-9.941-8.059-18-18-18S0 8.059 0 18s8.059 18 18 18 18-8.059 18-18Z"
                  />
                  <path
                    fill="#fff"
                    stroke="#fff"
                    stroke-width=".457"
                    d="M30.857 14.406a6.186 6.186 0 0 0-6.179-6.18 6.189 6.189 0 0 0-6.088 5.12H5.534a.391.391 0 0 0-.39.392v1.336c0 .216.174.39.39.39H18.59c.053.303.127.597.221.882.008.029.707 2.84 1.733 5.612 1.448 3.913 2.8 5.815 4.13 5.815h.006c1.273-.006 2.584-1.847 4.008-5.63a59.463 59.463 0 0 0 1.707-5.393 6.146 6.146 0 0 0 .462-2.344Zm-6.179-5.397a5.403 5.403 0 0 1 5.397 5.397 5.403 5.403 0 0 1-5.397 5.396 5.402 5.402 0 0 1-5.396-5.396 5.402 5.402 0 0 1 5.396-5.397ZM5.926 14.13h3.631v.553H5.926v-.553Zm4.414.553v-.553h8.166a6.336 6.336 0 0 0 0 .553H10.34Zm17.614 7.19c-1.738 4.614-2.871 5.117-3.278 5.119h-.002c-.433 0-1.624-.52-3.394-5.3a52.543 52.543 0 0 1-.979-2.928 6.16 6.16 0 0 0 6.861 1.3l-1.957 4.835a.391.391 0 1 0 .726.294l2.328-5.753c.257-.184.5-.387.726-.607-.277.901-.63 1.974-1.031 3.04Zm-3.276-2.557a4.914 4.914 0 0 0 4.91-4.91 4.915 4.915 0 0 0-4.91-4.908 4.915 4.915 0 0 0-4.909 4.909 4.914 4.914 0 0 0 4.91 4.909Zm0-9.036c.826 0 1.595.245 2.241.665l-2.243 6.063a.391.391 0 1 0 .734.272l2.153-5.82a4.113 4.113 0 0 1 1.242 2.947 4.131 4.131 0 0 1-4.127 4.126 4.131 4.131 0 0 1-4.126-4.126 4.131 4.131 0 0 1 4.126-4.127Z"
                  />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h36v36H0z" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div class="flex flex-col items-start justify-start space-y-2">
              <span class="subtitle text-brown">Les mots trouvés</span>
              <template v-if="previousWord">
                <div class="flex items-center justify-center space-x-1">
                  <span class="italic text-brown">(le mot précédent était</span>
                  <span class="italic font-bold text-brown">{{
                    previousWord
                  }}</span>
                  <span class="italic text-brown">)</span>
                </div>
              </template>
            </div>
          </div>
          <div class="px-4 mt-4 overflow-y-auto max-h-[18rem]">
            <div class="space-y-2">
              <transition-group
                name="list"
                tag="div"
                class="grid grid-cols-3 gap-2 pt-1"
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="transform scale-50"
                enter-to-class="transform scale-100"
                leave-active-class="transition duration-300 ease-out"
                leave-from-class="transform scale-100"
                leave-to-class="transform scale-50"
              >
                <div
                  v-for="message in correctGuess"
                  :key="message.text"
                  class="py-1.5 pl-1 truncate border border-brown/30 bg-amber-50 rounded-lg shadow-md"
                >
                    <span class="font-bold text-brown">
                      {{ message.text }}
                    </span>
                </div>
              </transition-group>
            </div>
          </div>
        </div>

        <div
          class="relative col-span-9 row-span-1 overflow-hidden text-center bg-white rounded-card"
        >
          <div class="px-8 pt-4">
            <span class="subtitle text-brown">
              La rivière des espoirs déchus
            </span>
          </div>
          <div
            class="relative overflow-x-auto -mt-px h-full bg-[url('/public/images/river.svg')] bg-bottom bg-cover"
          >
            <div>
              <div class="flex pt-16 pl-4 space-x-4 whitespace-nowrap">
                <span
                  class="text-lg font-bold text-white"
                  v-for="message in incorrectGuess"
                  :key="message.id"
                >
                  {{ message.text }}
                </span>
              </div>
              <div class="hidden xl:block">
                <div class="absolute mt-[2rem] overflow-visible transform -left-0 animate-fishmove">
                  <img class="object-cover w-8 overflow-visible opacity-50 animate-swim" style="animation-delay: 0.1s;" :src="cartoonTroutImage" alt="">
                </div>
                <div class="absolute overflow-visible transform mt-[1rem] -left-6 animate-fishmove">
                  <img class="object-cover w-8 overflow-visible opacity-50 animate-swim" style="animation-delay: 0.5s;" :src="cartoonTroutImage" alt="">
                </div>
                <div class="absolute mt-[2.75rem] overflow-visible transform -left-8 animate-fishmove">
                  <img class="object-cover w-8 overflow-visible opacity-50 animate-swim" style="animation-delay: 0.3s;" :src="cartoonTroutImage" alt="">
                </div>
                <div class="absolute overflow-visible transform mt-[2.25rem] -left-14 animate-fishmove">
                  <img class="object-cover w-8 overflow-visible opacity-50 animate-swim" style="animation-delay: 0.8s;" :src="cartoonTroutImage" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits, reactive, watch, computed  } from 'vue';
import { getFirestore, collection, getDocs, doc, setDoc, query, where } from 'firebase/firestore';
import axios from 'axios';
import gsap from "gsap";
import { useStore } from "../store/useStore";


import cartoonTroutImage from "/public/images/cartoon_trout.webp";
import scoreImage from "/public/images/score-illustration.png";

const emit = defineEmits(['close', 'game-started']);
const { state: storeState } = useStore();

const players = ref([]);
const gameStarted = ref(false);
const gameEnded = ref(false);
const wordsList = ref([]);
const currentWordIndex = ref(0);
const previousWord = ref("");
const definition = ref("");
const catGram = ref("");
const userMessage = ref("");
const correctGuess = ref([]);
const incorrectGuess = ref([]);
const questionsLeft = ref(0);
const elapsedSeconds = ref(0);
let timer = null;

const showCongratsModal = ref(false);

const emitClose = () => {
  emit('close');
};

const closeCongratsModal = () => {
  showCongratsModal.value = false;
};

const tweened = reactive({
  questionsLeft: 0,
});

watch(questionsLeft, (newQuestion) => {
  gsap.to(tweened, { duration: 0.7, questionsLeft: Number(newQuestion) || 0 });
});

const fetchPlayers = async () => {
  const db = getFirestore();
  const playersCollection = collection(db, 'Players');
  const playerSnapshot = await getDocs(playersCollection);
  const today = new Date().toISOString().split('T')[0];

  players.value = playerSnapshot.docs.map(doc => {
    const playerData = doc.data();
    return {
      id: doc.id,
      displayName: playerData.displayName,
      todayScore: playerData.lastPlayed === today ? playerData.todayScore : null,
      lastPlayed: playerData.lastPlayed
    };
  }).filter(player => player.todayScore !== null)
    .sort((a, b) => a.todayScore - b.todayScore); // Sort by today's score
};

const fetchWordsList = async () => {
  try {
    const response = await axios.get("/words.json");
    console.log("Response from server:", response.data);
    wordsList.value = Object.keys(response.data.words).map(key => ({
      word: key,
      ...response.data.words[key]
    })).slice(0, 4);
    questionsLeft.value = wordsList.value.length;
    loadNextWord();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

const loadNextWord = () => {
  if (currentWordIndex.value < wordsList.value.length) {
    const currentWord = wordsList.value[currentWordIndex.value];
    definition.value = currentWord.def;
    catGram.value = currentWord.catGram;
    previousWord.value = "";
    userMessage.value = "";
  } else {
    endRound();
  }
};

const startGame = async () => {
  gameStarted.value = true;
  gameEnded.value = false;
  elapsedSeconds.value = 0;
  await fetchWordsList();
  emit('game-started', gameStarted.value);
  startTimer();
};

const startTimer = () => {
  const startTime = Date.now();
  timer = setInterval(() => {
    elapsedSeconds.value = (Date.now() - startTime) / 1000;
  }, 10);
};

const stopTimer = () => {
  clearInterval(timer);
  timer = null;
};

const normalizeText = (text) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const handleUserMessage = () => {
  if (userMessage.value.trim() !== "") {
    checkGuess(userMessage.value);
    userMessage.value = "";
  }
};

const checkGuess = (message) => {
  const normalizedMessage = normalizeText(message);
  const normalizedWord = normalizeText(wordsList.value[currentWordIndex.value].word);
  if (normalizedMessage === normalizedWord) {
    correctGuess.value.push({ text: message });
    previousWord.value = wordsList.value[currentWordIndex.value].word;
    questionsLeft.value--;
    currentWordIndex.value++;
    loadNextWord();
  } else {
    incorrectGuess.value.push({ text: message });
  }
};

const endRound = async () => {
  stopTimer();
  gameStarted.value = false;
  emit('game-started', gameStarted.value);
  showCongratsModal.value = true;
  await saveUserScore();
};

const saveUserScore = async () => {
  const channelName = storeState.channelName;
  const db = getFirestore();
  const playersCollection = collection(db, 'Players');

  const playerQuery = query(playersCollection, where("displayName", "==", channelName));
  const querySnapshot = await getDocs(playerQuery);

  const today = new Date().toISOString().split('T')[0];

  if (!querySnapshot.empty) {
    const playerDoc = querySnapshot.docs[0];
    const playerData = playerDoc.data();

    // Check if the user has already played today
    if (playerData.lastPlayed !== today) {
      await setDoc(playerDoc.ref, {
        ...playerData,
        todayScore: elapsedSeconds.value,
        lastPlayed: today,
      }, { merge: true });
    }
  } else {
    // First time the user is playing
    await setDoc(doc(playersCollection), {
      displayName: channelName,
      bestScore: Infinity, // or other logic to initialize
      todayScore: elapsedSeconds.value,
      lastPlayed: today,
    });
  }
  await fetchPlayers();
};


onMounted(async () => {
  await fetchPlayers();
});

const formattedElapsedSeconds = computed(() => {
  return elapsedSeconds.value.toFixed(2);
});

</script>
