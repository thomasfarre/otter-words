<template>
  <div v-if="timeLeft > 0" class="text-center">
    <div class="mx-auto max-w-prose">
      <div class="bg-white border-2 rounded-md shadow-md border-emerald-800">
        <div class="px-6 py-4">
          <span class="text-2xl font-semibold tracking-tight text-gray-700 font-poppins">
            Trouve des <span class="text-amber-600">mots</span> associés à cette <span
              class="text-amber-600">catégorie</span> débutant par cette <span class="text-amber-600">lettre</span>
          </span>
        </div>
        <div class="relative px-6 pt-6 pb-2">
          <div class="absolute inset-0 top-0 z-10 h-2 bg-emerald-400"
            :style="{ width: progressBarWidth, transition: 'width 1s linear' }">
          </div>
          <div class="absolute inset-0 top-0 h-2 bg-gray-300"></div>
          <div>
            <span class="text-2xl font-black text-gray-900 font-poppins">
              {{ timeLeft }}s
            </span>
          </div>
          <div class="flex flex-col items-center justify-center pt-6 space-y-4">
            <div class="px-2 rounded-md bg-amber-100 w-fit">
              <transition name="slide-fade" mode="out-in">
                <span class="text-xl font-bold text-gray-800 uppercase " :key="startLetter">{{
                  startLetter }}</span>
              </transition>
            </div>
            <div>
              <transition name="slide-fade" mode="out-in">
                <span class="text-2xl font-bold text-gray-800 uppercase" :key="selectedCategory">{{
                  formatCategories(this.selectedCategory) }}</span>
              </transition>
            </div>

          </div>
          <div class="flex flex-col items-center justify-center mt-6">
            <button @click="selectRandomCategoryAndLetter"
              class="p-2 transition duration-300 ease-out rounded-full hover:bg-white group">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                class="w-5 h-5 text-gray-800 transition duration-300 ease-out group-hover:text-gray-600">
                <path fill-rule="evenodd"
                  d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                  clip-rule="evenodd" />
              </svg>
            </button>
            <span class="text-xs italic">
              O secours c tro dur
            </span>
          </div>
        </div>
      </div>

      <div class="px-6 py-2 mt-2 overflow-y-auto bg-white rounded-md max-h-72">
        <div class="flex justify-start space-x-4">
          <div class="w-1/2 space-y-2">
            <div class="text-left">
              <span class="text-xl font-bold text-gray-700">
                Mots trouvés
              </span>
            </div>
            <div class="flex flex-col items-start justify-start space-y-2">
              <span class="text-sm" v-for="message in correctGuess" :key="message.id">
                {{ message.text }} <span class="text-xs">({{ message.username }})</span>
              </span>
            </div>
          </div>
          <div class="w-1/2 space-y-2">
            <div class="text-right">
              <span class="text-xl font-bold text-gray-700">
                Score: {{ totalScore }}
              </span>
            </div>
            <div class="flex flex-col items-end justify-end space-y-2">
              <span class="text-sm" v-for="(score, username) in scores" :key="username">
                {{ username }}: {{ score }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-12">
      <span class="text-xl italic font-bold text-emerald-50 font-poppins">
        La Rivière des espoirs déchûs
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
        <defs>
          <linearGradient id="a" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stop-color="rgb(209, 250, 229, 1)" />
            <stop offset="100%" stop-color="#6ee7b7" />
          </linearGradient>
        </defs>
        <path fill="url(#a)"
          d="m0 60 21.8-10C43.6 40 87 20 131 21.7 174.5 23 218 47 262 58.3c43.5 11.7 87 11.7 131 15 43.4 3.7 87 9.7 131 10 43.3-.3 87-6.3 131-20C698.2 50 742 30 785 31.7c44.1 1.3 88 25.3 131 25 44 .3 88-23.7 131-23.4 43.9-.3 88 23.7 131 23.4 43.8.3 87-23.7 131-23.4 43.7-.3 87 23.7 131 30 43.6 6.7 87-3.3 131-5 43.5-1.3 87 4.7 131 0 43.5-5.3 87-21.3 131-18.3 43.4 3 87 27 131 25 43.3-2 87-28 131-43.3 43.2-14.7 87-18.7 130-10 44.1 8.3 88 28.3 131 41.6 44 13.7 88 19.7 131 23.4 43.9 3.3 88 3.3 131 0 43.8-3.7 87-9.7 131-23.4 43.7-13.3 87-33.3 131-30 43.6 3.7 87 29.7 131 40 43.5 9.7 87 3.7 109 0l21.8-3.3v40H0Z"
          style="transform:translate(0,0);opacity:1" />
      </svg>
    </div>
    <div class="w-screen p-6 -mt-px bg-emerald-100">
      <div class="flex space-x-4 overflow-x-auto whitespace-nowrap">
        <span class="text-sm text-emerald-900" v-for="message in incorrectGuess" :key="message.id">
          {{ message.text }}
          <svg class="max-w-12 max-h-12 opacity-60" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 -0.5 25 25">
            <path stroke="#047857" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M5.505 9.895a.673.673 0 0 1 1.086-.378l1.344.9a.707.707 0 0 0 1.015-.327c2.504-5.03 8.75-3.527 10.513 1.687a.7.7 0 0 1 0 .446C17.7 17.437 11.454 18.941 8.95 13.91a.707.707 0 0 0-1.016-.325l-1.344.9a.673.673 0 0 1-1.085-.38.483.483 0 0 1 .03-.25l.564-1.604a.76.76 0 0 0 0-.5l-.563-1.6a.483.483 0 0 1-.03-.256Z"
              clip-rule="evenodd" />
            <path stroke="#047857" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M16.5 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clip-rule="evenodd" />
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
        <path fill="url(#a)"
          d="m0 60 21.8-10C43.6 40 87 20 131 21.7 174.5 23 218 47 262 58.3c43.5 11.7 87 11.7 131 15 43.4 3.7 87 9.7 131 10 43.3-.3 87-6.3 131-20C698.2 50 742 30 785 31.7c44.1 1.3 88 25.3 131 25 44 .3 88-23.7 131-23.4 43.9-.3 88 23.7 131 23.4 43.8.3 87-23.7 131-23.4 43.7-.3 87 23.7 131 30 43.6 6.7 87-3.3 131-5 43.5-1.3 87 4.7 131 0 43.5-5.3 87-21.3 131-18.3 43.4 3 87 27 131 25 43.3-2 87-28 131-43.3 43.2-14.7 87-18.7 130-10 44.1 8.3 88 28.3 131 41.6 44 13.7 88 19.7 131 23.4 43.9 3.3 88 3.3 131 0 43.8-3.7 87-9.7 131-23.4 43.7-13.3 87-33.3 131-30 43.6 3.7 87 29.7 131 40 43.5 9.7 87 3.7 109 0l21.8-3.3v40H0Z"
          style="transform:translate(0,0);opacity:1" />
      </svg>
    </div>
  </div>
  <div v-else class="absolute z-20 p-2 transform -translate-x-1/2 bg-white rounded-md left-1/2 top-20">
    <div class="p-6 border border-gray-300 rounded-md">
      <div>
        <span class="text-2xl font-bold text-gray-900 font-poppins">
          Fin du round!
        </span>
      </div>
      <div>
        Vous avez marqué un total de {{ totalScore }}
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
        <button @click="endRound" class="border-2 btn border-emerald-700">
          Vite, la suite!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import tmi from 'tmi.js';

export default {
  emits: ['round-ended'],
  name: 'FirstRound',
  data() {
    return {
      client: null,
      timeLeft: 30,
      timer: null,
      categoryTimer: null,
      messages: [],
      channelName: '',
      correctGuess: [],
      incorrectGuess: [],
      foundWords: [],
      selectedCategory: '',
      startLetter: '',
      scores: {},
      totalScore: 0,
      sounds: [
        new Audio('/sounds/pole.wav'),
        new Audio('/sounds/fishing.wav'),
        new Audio('/sounds/fish.wav'),
      ]
    };
  },
  computed: {
    progressBarWidth() {
      const initialTime = 120;
      return `${(this.timeLeft / initialTime) * 100}%`;
    }
  },
  created() {
    this.fetchChannelNameAndConnect();
    this.selectRandomCategoryAndLetter();
    this.startTimer();
    this.categoryTimer = setInterval(() => {
      if (this.timeLeft % 30 === 4) {
        this.sounds[0].play();
      }
      if (this.timeLeft % 30 === 0) {
        this.selectRandomCategoryAndLetter();
      }
    }, 1000); // Check every second
  },
  methods: {
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
    async selectRandomCategoryAndLetter() {
      const categories = ["animaux","metiers","prenoms","pays","adverbes","anatomie","fromages","qualitedefaut","vegetaux"];
      this.selectedCategory = categories[Math.floor(Math.random() * categories.length)];
      this.fetchValidWords();
    },
    async fetchValidWords() {
      try {
        this.sounds[1].play();
        const response = await axios.get(`/data/${this.selectedCategory}.json`);
        const categoryLetters = response.data["Letters"];
        this.startLetter = categoryLetters[Math.floor(Math.random() * categoryLetters.length)]
        const wordsByLetter = response.data[this.startLetter] || [];
        this.foundWords = wordsByLetter;
      } catch (error) {
        console.error('Failed to fetch data:', error);
        this.definition = 'Failed to load definition.';
      }
    },
    checkGuess(message, username) {
      const normalizedMessage = message.trim().toLowerCase();
      const lowerCaseFoundWords = this.foundWords.map(word => word.toLowerCase());
      if (lowerCaseFoundWords.includes(normalizedMessage) && !this.correctGuess.some(msg => msg.text.toLowerCase() === normalizedMessage)) {
        this.correctGuess.push({ text: message, username });
        this.sounds[2].play();
        if (!this.scores[username]) {
          this.scores[username] = 0;
        }
        this.scores[username] += 2;
        this.totalScore += 2;
        this.foundWords = this.foundWords.filter(word => word.toLowerCase() !== normalizedMessage);
      } else {
        this.incorrectGuess.push({ text: message, id: this.incorrectGuess.length + 1 });
      }
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.timer);
          clearInterval(this.categoryTimer);
        }
      }, 1000);
    },
    endRound() {
      clearInterval(this.categoryTimer);
      this.$emit('round-ended', { total: this.totalScore, scores: this.scores });
    },
    connectChat(channel) {
      if (this.client) {
        this.client.disconnect();
      }
      const opts = {
        connection: {
          secure: true,
          reconnect: true
        },
        channels: [channel]
      };
      this.client = new tmi.Client(opts);
      this.client.on('message', (channel, tags, message, self) => {
        if (self) return;  // Ignore messages from the bot itself
        this.messages.push({
          id: this.messages.length + 1,
          username: tags['display-name'],
          text: message
        });
        this.checkGuess(message, tags['display-name']);
      });
      this.client.connect().catch(console.error);
    },
    // Need to change this function
    formatCategories(selectedCategory) {
      console.log(selectedCategory)
      if (selectedCategory === "animaux") {
        return "animaux"
      }
      if (selectedCategory === "anatomie") {
        return "parties du corps"
      }
      if (selectedCategory === "fromages") {
        return "fromages"
      }
      if (selectedCategory === "prenoms") {
        return "prénoms"
      }
      if (selectedCategory === "metiers") {
        return "métiers"
      }
      if (selectedCategory === "pays") {
        return "pays"
      }
      if (selectedCategory === "vegetaux") {
        return "vegetaux"
      }
      if (selectedCategory === "qualitedefaut") {
        return "qualitées & défauts"
      }
      if (selectedCategory === "adverbes") {
        return "adverbes en -ment"
      }
    }
  },
  beforeUnmount() {
    if (this.client) {
      this.client.disconnect();
    }
    clearInterval(this.timer);
    clearInterval(this.categoryTimer);
  }
};
</script>


<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(60px);
}
</style>
