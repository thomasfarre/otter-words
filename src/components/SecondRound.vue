<template>
  <div v-if="timeLeft > 0" class="text-center">
    <div>
      <div
        class="mx-auto bg-white border-2 rounded-md shadow-md border-emerald-800 max-w-prose"
      >
        <div class="relative px-4 pt-3 pb-2">
          <ProgressBar
            :progressBarWidth="progressBarWidth"
            :otterImage="otterImage"
            :cartoonTroutImage="cartoonTroutImage"
          />
          <div class="pt-2 text-left max-w-36 xl:max-w-full">
            <span class="text-sm italic text-gray-500">
              Trouve le mot associé à la définition</span
            >
          </div>
          <div class="absolute transform -translate-x-1/2 top-4 left-1/2">
            <span class="text-2xl font-black text-gray-900 font-poppins">
              {{ timeLeft }}s
            </span>
          </div>
          <div class="flex flex-col px-6 pt-12 space-y-4">
            <div class="flex flex-col items-center justify-center">
              <span
                v-if="shuffledWord"
                class="text-xl tracking-widest text-gray-800 uppercase"
              >
                {{ shuffledWord }}
              </span>
            </div>
            <div class="px-2 mx-auto rounded-md bg-amber-100 w-fit">
              <span class="text-xs font-bold text-gray-800 uppercase">
                {{ catGram }}
              </span>
            </div>
            <div class="relative mx-auto w-fit">
              <span class="text-xl font-medium text-gray-700">
                {{ definition }}
              </span>
              <svg
                class="absolute w-7 h-7 -top-4 -left-9 text-amber-600"
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.042 9C10.026 16.776 2.25 29.52 2.25 43.56C2.25 55.008 9.162 61.704 17.154 61.704C24.714 61.704 30.33 55.656 30.33 48.528C30.33 41.4 25.362 36.216 18.882 36.216C17.586 36.216 15.858 36.432 15.426 36.648C16.506 29.304 23.418 20.664 30.33 16.344L21.042 9ZM58.194 9C47.394 16.776 39.618 29.52 39.618 43.56C39.618 55.008 46.53 61.704 54.522 61.704C61.866 61.704 67.698 55.656 67.698 48.528C67.698 41.4 62.514 36.216 56.034 36.216C54.738 36.216 53.226 36.432 52.794 36.648C53.874 29.304 60.57 20.664 67.482 16.344L58.194 9Z"
                  fill="currentColor"
                  fill-opacity="0.25"
                ></path>
              </svg>
            </div>
          </div>
          <div class="flex flex-col items-center justify-center mt-6">
            <div class="flex items-center space-x-4">
              <div>
                <button
                  @click="revealShuffledWord"
                  :disabled="hintsUsed >= 3"
                  class="relative p-2 transition duration-300 ease-out rounded-full bg-amber-200 hover:bg-amber-300 group disabled:bg-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 transition duration-300 ease-out text-amber-700 group-hover:text-amber-900 group-disabled:text-gray-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                    />
                  </svg>
                  <span
                    class="absolute px-1 py-px text-xs font-bold text-white rounded-full -top-1 -right-1 bg-amber-500"
                  >
                    {{ 3 - hintsUsed }}
                  </span>
                </button>
              </div>
              <button
                @click="fetchWordAndDefinition"
                class="p-2 transition duration-300 ease-out rounded-full bg-amber-200 hover:bg-amber-300 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5 transition duration-300 ease-out text-amber-700 group-hover:text-amber-900"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div class="pt-1">
              <span class="text-xs italic">
                <template v-if="previousWord">
                  le mot précédent était:
                  <span class="font-bold">{{ previousWord }}</span>
                </template>
                <template v-else> O secours c tro dur </template>
              </span>
            </div>
          </div>
          <LiveRoundScore :totalScore="totalScore" :sortedScores="sortedScores" />
        </div>
      </div>
      <div class="flex items-center justify-center mt-1 xl:hidden">
        <input
          v-model="userMessage"
          @keyup.enter="handleUserMessage"
          type="text"
          placeholder="Entrez votre réponse ici..."
          class="p-2 text-gray-700 border rounded-md bg-amber-50 placeholder:text-gray-500"
        />
      </div>
      <FoundWords :correctGuess="reversedCorrectGuess" />
    </div>
    <div class="mt-8">
      <span class="text-xl italic font-bold text-emerald-50 font-poppins">
        La Rivière des espoirs déchûs
      </span>
      <div class="hidden xl:flex xl:items-center xl:justify-center xl:mt-2">
        <input
          v-model="userMessage"
          @keyup.enter="handleUserMessage"
          type="text"
          placeholder="Entrez votre réponse ici..."
          class="p-2 text-gray-700 border rounded-md bg-amber-50 placeholder:text-gray-500"
        />
      </div>
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
    <div class="w-screen px-6 py-2 -mt-px bg-emerald-100">
      <div class="flex space-x-4 overflow-x-auto whitespace-nowrap">
        <span
          class="text-sm text-emerald-900"
          v-for="message in reversedIncorrectGuess"
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
  <div v-else>
    <EndOfRound
      :totalScore="totalScore"
      :sortedScores="sortedScores"
      :previousWord="previousWord"
      @end-round="endRound"
    />
  </div>
</template>

<script>
import { useGameLogic } from './useGameLogic.js';
import axios from "axios";
import tmi from "tmi.js";

import FoundWords from "./common/FoundWords.vue";
import EndOfRound from "./common/EndOfRound.vue";
import ProgressBar from "./common/ProgressBar.vue";
import LiveRoundScore from "./common/LiveRoundScore.vue";

import otterImage from "/public/images/otter.webp";
import cartoonTroutImage from "/public/images/cartoon_trout.webp";

export default {
  emits: ["round-ended"],
  name: "SecondRound",
  components: {
    EndOfRound,
    FoundWords,
    ProgressBar,
    LiveRoundScore,
  },
  setup() {
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

    return {
      channelName,
      timeLeft,
      sortedScores,
      progressBarWidth,
      reversedCorrectGuess,
      reversedIncorrectGuess,
      correctGuess,
      incorrectGuess,
      scores,
      sounds
    };
  },
  data() {
    return {
      client: null,
      timer: null,
      messages: [],
      word: "",
      definition: "",
      catGram: "",
      previousWord: "",
      totalScore: 0,
      lock: false,
      hintsUsed: 0,
      shuffledWord: "",
      otterImage,
      cartoonTroutImage,
      userMessage: "",
    };
  },
  created() {
    this.fetchChannelNameAndConnect();
    this.fetchWordAndDefinition();
    this.startTimer();
  },
  methods: {
    async fetchChannelNameAndConnect() {
      this.connectChat(this.channelName);
    },
    sendMessageToTwitchChat(message) {
      if (this.client && this.channelName) {
        setTimeout(() => {
          this.client.say(this.channelName, message);
        }, 3000);
      }
    },
    async fetchWordAndDefinition() {
      try {
        this.previousWord = this.word;
        this.sounds[1].play();
        const response = await axios.get("/words.json");
        const words = response.data.words;
        const keys = Object.keys(words);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        this.word = randomKey;
        console.log(this.word)
        this.definition = words[randomKey].def;
        this.catGram = words[randomKey].catGram;
        this.shuffledWord = "";
        this.sendMessageToTwitchChat(`catGram: ${this.catGram}, Définition: ${this.definition}`);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        this.definition = "Failed to load definition.";
      }
    },
    handleUserMessage() {
      if (this.userMessage.trim() !== "") {
        const username = this.channelName;
        this.messages.push({
          id: this.messages.length + 1,
          username: username,
          text: this.userMessage,
        });
        this.checkGuess(this.userMessage, username);
        this.userMessage = "";
      }
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          if (this.timeLeft === 4) {
            this.sounds[0].play();
          }
        } else {
          this.previousWord = this.word;
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
    shuffleWord(word) {
      return word
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
    },
    revealShuffledWord() {
      if (this.hintsUsed < 3) {
        this.shuffledWord = this.shuffleWord(this.word);
        this.hintsUsed++;
      }
    },
    async checkGuess(message, username) {
      if (this.lock) return;
      this.lock = true;
      const normalizedMessage = this.normalizeText(message);
      const normalizedWord = this.normalizeText(this.word);
      if (normalizedMessage === normalizedWord) {
        const correctGuess = {
          id: this.correctMessages,
          username: username,
          text: message,
          correct: true,
        };
        if (!this.scores[username]) {
          this.scores[username] = 0;
        }
        this.sounds[2].play();
        this.scores[username] += 10;
        this.totalScore += 10;
        this.correctGuess.push(correctGuess);
        this.fetchWordAndDefinition();
      } else {
        const incorrectGuess = {
          id: this.incorectGuess,
          username: username,
          text: message,
          correct: false,
        };
        this.incorrectGuess.push(incorrectGuess);
      }
      this.lock = false;
    },
    endRound() {
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
  },
};
</script>
