<template>
  <div v-if="timeLeft > 0">
    <div class="max-w-prose mx-auto">
      <div>
        <span class="text-white font-bold text-3xl font-poppins">
          Trouve le <span class="text-amber-500">mot</span> <br> associé à cette <span
            class="text-amber-500">définition</span> ! ({{ word }})
        </span>
        <div class="mt-6 px-6 pt-6 pb-2 bg-emerald-50 rounded-md">
          <div class="">
            <span class="font-poppins font-black text-2xl text-gray-900">{{ timeLeft }}s</span>
          </div>
          <div class="pt-4">
            <span class="text-xl text-gray-700">{{ definition }}</span>
          </div>
          <div class="mt-2 flex flex-col justify-center items-center">
            <button @click="fetchWordAndDefinition"
              class="hover:bg-white rounded-full transition ease-out duration-300 p-2 group">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                class="text-gray-800 group-hover:text-gray-600 w-5 h-5 transition ease-out duration-300">
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

      <div class="mt-6 p-6 bg-emerald-50 rounded-md">
        <div class="flex space-x-4 justify-start">
          <div class="w-1/2 space-y-2">
            <div class="text-left">
              <span class="font-bold text-xl text-gray-800">Mots trouvés</span>
            </div>
            <div class="flex flex-col justify-start items-start space-y-2">
              <span class="text-sm" v-for="message in correctGuess" :key="message.id">
                {{ message.text }} <span class="text-xs">({{ message.username }})</span>
              </span>
            </div>
          </div>
          <div class="w-1/2 space-y-2">
            <div class="text-right">
              <span class="font-bold text-xl text-gray-800">Score: {{ totalScore }}</span>
            </div>
            <div class="flex flex-col justify-end items-end space-y-2">
              <span class="text-sm" v-for="(score, username) in scores" :key="username">
                {{ username }}: {{ score }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-16">
      <span class="text-white font-bold text-xl font-poppins">La Rivière des espoirs déchûs</span>
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
    <div class="bg-emerald-100 p-6 w-screen">
      <ul class="pt-4 flex space-x-4 overflow-x-auto whitespace-nowrap">
        <li v-for="message in incorrectGuess" :key="message.id">
          {{ message.text }}
        </li>
      </ul>
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
  <div v-else class="absolute left-1/2 top-20 transform -translate-x-1/2 bg-white z-20 p-2 rounded-md">
    <div class="p-6 border border-gray-300 rounded-md">
      <div>
        <span class="font-poppins font-bold text-2xl text-gray-900">Fin du round!</span>
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
        <button @click="endRound" class="btn border-2 border-emerald-700">Vite, la suite!</button>
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
  name: 'SecondRound',
  data() {
    return {
      client: null,
      timeLeft: 180,
      timer: null,
      channelName: '',
      correctGuess: [],
      incorrectGuess: [],
      messages: [],
      word: '',
      definition: '',
      scores: {},
      totalScore: 0
    };
  },
  created() {
    this.fetchChannelNameAndConnect();
    this.fetchWordAndDefinition();
    this.startTimer();
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
    async fetchWordAndDefinition() {
      try {
        const response = await axios.get('/words.json'); // Adjust the path if necessary
        const words = response.data.words;
        const keys = Object.keys(words); // Extract keys from the words object
        const randomKey = keys[Math.floor(Math.random() * keys.length)]; // Select a random key
        this.word = randomKey;
        this.definition = words[randomKey]; // Directly access the definition using the key
      } catch (error) {
        console.error('Failed to fetch data:', error);
        this.definition = 'Failed to load definition.';
      }
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    checkGuess(message, username) {
      if (message.trim().toLowerCase() === this.word.toLowerCase()) {
        const correctGuess = {
          id: this.correctMessages,
          username: username,
          text: message,
          correct: true
        };
        if (!this.scores[username]) {
          this.scores[username] = 0;
        }
        this.scores[username] += 10; // Increment user's score by 10 for a correct guess
        this.totalScore += 10; // Increment global score
        this.correctGuess.push(correctGuess);
        this.fetchWordAndDefinition();
      } else {
        const incorrectGuess = {
          id: this.incorectGuess,
          username: username,
          text: message,
          correct: false
        };
        this.incorrectGuess.push(incorrectGuess);
      }
    },
    endRound() {
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
  },
  beforeUnmount() {
    if (this.client) {
      this.client.disconnect();
    }
    clearInterval(this.timer);
    this.$emit('round-ended', this.totalScore);
  }
};
</script>
