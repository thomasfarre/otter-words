<template>
  <div v-if="timeLeft > 0" class="text-center">
    <div>
      <div
        class="mx-auto bg-white border-2 rounded-md shadow-md max-w-prose border-emerald-800"
      >
        <div class="relative px-6 pt-6 pb-2">
          <div class="absolute z-30 -top-4 -left-4">
            <img class="w-10 h-10" :src="otterImage" alt="" />
          </div>
          <div
            class="absolute z-20 w-6 h-6 transform -translate-x-1/2 -top-2"
            :style="{ left: progressBarWidth, transition: 'all 1s linear' }"
          >
            <img class="w-full h-full" :src="cartoonTroutImage" alt="" />
          </div>
          <div
            class="absolute inset-0 top-0 z-10 h-2 bg-emerald-400"
            :style="{ width: progressBarWidth, transition: 'width 1s linear' }"
          ></div>
          <div class="absolute inset-0 top-0 h-2 bg-gray-300"></div>
          <div>
            <span class="text-2xl font-black text-gray-900 font-poppins">
              {{ timeLeft }}s
            </span>
          </div>
          <div>
            <span class="text-gray-700">Lettres non révélées:</span>
            <div class="flex flex-wrap justify-center gap-2 pt-1">
              <span
                class="px-2 py-1 uppercase bg-gray-200 rounded"
                v-for="(letter, index) in unrevealedLetters"
                :key="index"
                >{{ letter }}</span
              >
            </div>
          </div>
          <div class="flex flex-col pt-4 space-y-4">
            <div class="px-2 mx-auto rounded-md bg-amber-100 w-fit">
              <span class="text-xs font-bold text-gray-800 uppercase">
                {{ catGram }}
                <span class="text-xs font-medium text-gray-700"
                  >({{ revealedWord.length }} lettres)</span
                >
              </span>
            </div>
            <span class="text-xl tracking-widest text-gray-700 uppercase"
              >{{ revealedWord }}
            </span>
          </div>
          <div class="flex flex-col items-center justify-center mt-2">
            <button
              @click="fetchWordAndDefinition"
              class="p-2 transition duration-300 ease-out rounded-full hover:bg-white group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5 text-gray-800 transition duration-300 ease-out group-hover:text-gray-600"
              >
                <path
                  fill-rule="evenodd"
                  d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <span class="text-xs italic">
              <template v-if="previousWord">
                le mot précédent était:
                <span class="font-bold">{{ previousWord }}</span>
              </template>
              <template v-else> O secours c tro dur </template>
            </span>
          </div>
          <div
            class="top-0 hidden w-64 h-64 pt-2 space-y-2 overflow-y-auto translate-x-full bg-white border-2 shadow-md md:absolute md:block -right-8 rounded-xl border-emerald-800"
          >
            <div class="flex justify-between w-full px-4 text-left">
              <span class="text-lg font-medium text-gray-700">
                Score d'équipe
              </span>
              <span class="text-lg font-light text-gray-700">
                {{ totalScore }} pts
              </span>
            </div>
            <div
              class="flex flex-col items-start justify-start divide-y divide-gray-200"
            >
              <div
                v-for="(score, username, index) in scores"
                :key="username"
                class="flex px-4 py-2 justify-between w-full first:bg-yellow-100 [&:nth-child(2)]:bg-slate-200 [&:nth-child(3)]:bg-amber-400/40"
              >
                <div class="flex space-x-2">
                  <span class="text-sm font-bold"> {{ index + 1 }}. </span>
                  <span class="text-sm font-medium text-gray-800 capitalize">
                    {{ username }}
                  </span>
                </div>
                <span class="text-sm font-light text-gray-700">
                  {{ score }} pts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="py-8 mx-auto mt-2 overflow-y-auto bg-white rounded-lg max-h-96 max-w-prose"
      >
        <div class="pt-2 space-y-2">
          <div class="px-4 text-left">
            <span class="text-lg font-medium text-gray-700">
              Mots trouvés
            </span>
          </div>
          <div class="grid grid-cols-3 gap-2 px-4">
            <div
              v-for="message in correctGuess"
              :key="message.id"
              class="py-1 truncate border border-gray-200 rounded-lg shadow-md bg-amber-50"
            >
              <span class="text-sm text-gray-800">
                {{ message.text }}
              </span>
              <span class="text-sm text-gray-700">
                ({{ message.username }})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-12">
      <span class="text-xl font-bold text-white font-poppins">
        La Rivière des espoirs déchûs
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
        <defs>
          <linearGradient id="a" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stop-color="rgb(209, 250, 229, 1)" />
            <stop offset="100%" stop-color="#6ee7b7" />
          </linearGradient>
        </defs>
        <path
          fill="url(#a)"
          d="m0 60 21.8-10C43.6 40 87 20 131 21.7 174.5 23 218 47 262 58.3c43.5 11.7 87 11.7 131 15 43.4 3.7 87 9.7 131 10 43.3-.3 87-6.3 131-20C698.2 50 742 30 785 31.7c44.1 1.3 88 25.3 131 25 44 .3 88-23.7 131-23.4 43.9-.3 88 23.7 131 23.4 43.8.3 87-23.7 131-23.4 43.7-.3 87 23.7 131 30 43.6 6.7 87-3.3 131-5 43.5-1.3 87 4.7 131 0 43.5-5.3 87-21.3 131-18.3 43.4 3 87 27 131 25 43.3-2 87-28 131-43.3 43.2-14.7 87-18.7 130-10 44.1 8.3 88 28.3 131 41.6 44 13.7 88 19.7 131 23.4 43.9 3.3 88 3.3 131 0 43.8-3.7 87-9.7 131-23.4 43.7-13.3 87-33.3 131-30 43.6 3.7 87 29.7 131 40 43.5 9.7 87 3.7 109 0l21.8-3.3v40H0Z"
          style="transform: translate(0, 0); opacity: 1"
        />
      </svg>
    </div>
    <div class="w-screen p-6 -mt-px bg-emerald-100">
      <div class="flex space-x-4 overflow-x-auto whitespace-nowrap">
        <span
          class="text-sm text-emerald-900"
          v-for="message in incorrectGuess"
          :key="message.id"
        >
          {{ message.text }}
          <svg
            class="max-w-12 max-h-12 opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 -0.5 25 25"
          >
            <path
              stroke="#047857"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M5.505 9.895a.673.673 0 0 1 1.086-.378l1.344.9a.707.707 0 0 0 1.015-.327c2.504-5.03 8.75-3.527 10.513 1.687a.7.7 0 0 1 0 .446C17.7 17.437 11.454 18.941 8.95 13.91a.707.707 0 0 0-1.016-.325l-1.344.9a.673.673 0 0 1-1.085-.38.483.483 0 0 1 .03-.25l.564-1.604a.76.76 0 0 0 0-.5l-.563-1.6a.483.483 0 0 1-.03-.256Z"
              clip-rule="evenodd"
            />
            <path
              stroke="#047857"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M16.5 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
    <div class="-mt-px">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="transform rotate-180"
        viewBox="0 0 1440 100"
      >
        <defs>
          <linearGradient id="a" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stop-color="rgba(236, 253, 245, 1)" />
            <stop offset="100%" stop-color="rgba(167, 243, 208, 1)" />
          </linearGradient>
        </defs>
        <path
          fill="url(#a)"
          d="m0 60 21.8-10C43.6 40 87 20 131 21.7 174.5 23 218 47 262 58.3c43.5 11.7 87 11.7 131 15 43.4 3.7 87 9.7 131 10 43.3-.3 87-6.3 131-20C698.2 50 742 30 785 31.7c44.1 1.3 88 25.3 131 25 44 .3 88-23.7 131-23.4 43.9-.3 88 23.7 131 23.4 43.8.3 87-23.7 131-23.4 43.7-.3 87 23.7 131 30 43.6 6.7 87-3.3 131-5 43.5-1.3 87 4.7 131 0 43.5-5.3 87-21.3 131-18.3 43.4 3 87 27 131 25 43.3-2 87-28 131-43.3 43.2-14.7 87-18.7 130-10 44.1 8.3 88 28.3 131 41.6 44 13.7 88 19.7 131 23.4 43.9 3.3 88 3.3 131 0 43.8-3.7 87-9.7 131-23.4 43.7-13.3 87-33.3 131-30 43.6 3.7 87 29.7 131 40 43.5 9.7 87 3.7 109 0l21.8-3.3v40H0Z"
          style="transform: translate(0, 0); opacity: 1"
        />
      </svg>
    </div>
  </div>
  <div
    v-else
    class="absolute z-20 p-2 transform -translate-x-1/2 bg-white rounded-md left-1/2 top-20 min-w-[720px]"
  >
    <div class="p-6 border border-gray-300 rounded-md">
      <div>
        <span class="text-2xl font-bold text-gray-900 font-poppins">
          Fin du round! le dernier mot était {{ previousWord }}
        </span>
      </div>
      <div>Vous avez marqué un total de {{ totalScore }}</div>
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
                <tr  v-for="(score, index) in sortedScores" :key="score.username" class="first:bg-yellow-100 [&:nth-child(2)]:bg-slate-200 [&:nth-child(3)]:bg-amber-400/40">
                  <td class="px-2 py-3 text-sm whitespace-nowrap"> {{ index + 1 }}.</td>
                  <td class="px-2 py-3 text-sm whitespace-nowrap"> {{ score.username }}</td>
                  <td class="px-2 py-3 text-sm whitespace-nowrap"> {{ score.score }}</td>
                </tr>
            </tbody>
        </table>
      </div>
      <div class="pt-6">
        <button @click="endRound" class="border-2 btn border-emerald-700">
          Vite, la suite!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import axios from "axios";
import tmi from "tmi.js";

import otterImage from "/public/images/otter.webp";
import cartoonTroutImage from "/public/images/cartoon_trout.webp";

export default {
  emits: ["round-ended"],
  name: "ThirdRound",
  data() {
    return {
      client: null,
      timeLeft: 120,
      timer: null,
      channelName: "",
      correctGuess: [],
      incorrectGuess: [],
      messages: [],
      word: "",
      catGram: "",
      previousWord: "",
      revealedWord: "",
      revealInterval: 5,
      scores: {},
      totalScore: 0,
      lock: false,
      otterImage,
      cartoonTroutImage,
      sounds: [
        new Audio("/sounds/fish.wav"),
        new Audio("/sounds/fishing.wav"),
        new Audio("/sounds/pole.wav"),
      ],
    };
  },
  computed: {
    sortedScores() {
      const scoresArray = Object.keys(this.scores).map((username) => ({
        username,
        score: this.scores[username],
      }));
      scoresArray.sort((a, b) => b.score - a.score);
      return scoresArray;
    },
    progressBarWidth() {
      const initialTime = 120;
      return `${(this.timeLeft / initialTime) * 100}%`;
    },
    unrevealedLetters() {
      const unrevealed = [];
      for (let i = 1; i < this.word.length; i++) {
        if (this.revealedWord[i] === "_") {
          unrevealed.push(this.word[i]);
        }
      }
      console.log("Unrevealed letters:", unrevealed);
      return unrevealed;
    },
  },
  created() {
    this.fetchChannelNameAndConnect();
    this.fetchWordAndDefinition();
    this.startTimer();
  },
  methods: {
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
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
          this.connectChat(this.channelName);
        } else {
          console.log("No such document!");
        }
      }
    },
    async fetchWordAndDefinition() {
      try {
        this.previousWord = this.word;
        this.sounds[1].play();
        const response = await axios.get("/words.json");
        const words = response.data.words;
        const keys = Object.keys(words).filter((key) => key.length >= 8);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        this.word = randomKey;
        this.catGram = words[randomKey].catGram;
        this.revealedWord = this.word[0] + "_".repeat(this.word.length - 1);
        this.startRevealTimer();
      } catch (error) {
        console.error("Failed to fetch data:", error);
        this.definition = "Failed to load definition.";
      }
    },
    startRevealTimer() {
      if (this.revealTimer) clearInterval(this.revealTimer);

      this.revealTimer = setInterval(() => {
        let unrevealedIndices = [];
        for (let i = 1; i < this.word.length; i++) {
          if (this.revealedWord[i] === "_") {
            unrevealedIndices.push(i);
          }
        }

        const lettersToReveal = 2; // Number of letters to reveal at each interval
        if (unrevealedIndices.length > 0) {
          for (
            let j = 0;
            j < lettersToReveal && unrevealedIndices.length > 0;
            j++
          ) {
            const randomIndex = Math.floor(
              Math.random() * unrevealedIndices.length
            );
            const revealIndex = unrevealedIndices[randomIndex];

            let revealed = this.revealedWord.split("");
            revealed[revealIndex] = this.word[revealIndex];
            this.revealedWord = revealed.join("");

            // Remove revealed index from the array to avoid revealing it again
            unrevealedIndices.splice(randomIndex, 1);
          }

          if (!this.revealedWord.includes("_")) {
            clearInterval(this.revealTimer);
          }
        } else {
          clearInterval(this.revealTimer);
        }
      }, this.revealInterval * 1000);
    },

    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          if (this.timeLeft === 4) {
            this.sounds[2].play();
          }
        } else {
          this.previousWord = this.word;
          clearInterval(this.revealTimer);
          clearInterval(this.timer);
        }
      }, 1000);
    },
    normalizeText(text) {
      return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    },
    async checkGuess(message, username) {
      if (this.lock) return;
      this.lock = true;
      const normalizedMessage = this.normalizeText(message);
      if (normalizedMessage === this.normalizeText(this.word)) {
        const correctGuess = {
          id: this.correctGuess.length + 1,
          username: username,
          text: message,
          correct: true,
        };
        if (!this.scores[username]) {
          this.scores[username] = 0;
        }
        this.scores[username] += 5;
        this.totalScore += 5;
        this.correctGuess.push(correctGuess);
        this.fetchWordAndDefinition();
      } else {
        const incorrectGuess = {
          id: this.incorrectGuess.length + 1,
          username: username,
          text: message,
          correct: false,
        };
        this.incorrectGuess.push(incorrectGuess);
      }
      this.lock = false;
    },
    endRound() {
      clearInterval(this.revealTimer);
      this.$emit("round-ended", {
        total: this.totalScore,
        scores: this.scores,
      });
    },
    connectChat(channel) {
      if (this.client) {
        this.client.disconnect();
      }
      const opts = {
        connection: {
          secure: true,
          reconnect: true,
        },
        channels: [channel],
      };
      this.client = new tmi.Client(opts);
      this.client.on("message", (channel, tags, message, self) => {
        if (self) return;
        this.messages.push({
          id: this.messages.length + 1,
          username: tags["display-name"],
          text: message,
        });
        this.checkGuess(message, tags["display-name"]);
      });
      this.client.connect().catch(console.error);
    },
  },
  beforeUnmount() {
    if (this.client) {
      this.client.disconnect();
    }
    clearInterval(this.timer);
    clearInterval(this.revealTimer);
  },
};
</script>
