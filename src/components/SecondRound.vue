<template>
  <div class="round bg-white p-6">
    <div v-if="timeLeft > 0">
      <p>Time left: {{ timeLeft }} seconds</p>
      <p>Definition: {{ definition }}</p>
    </div>
    <div v-else>
      <h4>Round ended!</h4>
      <button @click="endRound">Show Results</button>
    </div>
    <div>
      <span>Word to found: {{ word }}</span>
      <div>
        <span>Correct Answers:</span>
        <li v-for="message in correctGuess" :key="message.id">
          {{ message.text }} ({{ message.username }})
        </li>
      </div>
    </div>
  </div>
  <div class="bg-white p-6 mt-12 max-w-xl">
    <span>La Rivière des fausses réponses</span>
    <ul class="pt-4 flex space-x-4 overflow-x-auto whitespace-nowrap">
      <li v-for="message in incorrectGuess" :key="message.id">
        {{ message.text }} ~
      </li>
    </ul>
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
      timeLeft: 120,
      timer: null,
      channelName: '',
      guesses: [],
      correctGuess: [],
      incorrectGuess: [],
      messages: [],
      word: '',
      definition: '',
      scores: {}
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
      const wordList = ['chien', 'loutre', 'truite']; // Simplified example
      this.word = wordList[Math.floor(Math.random() * wordList.length)];
      const url = `/.netlify/functions/fetchDefinition?word=${this.word}`;
      try {
        const response = await axios.get(url);
        const data = response.data;
        this.definition = data.definition; // Received clean definition
      } catch (error) {
        console.error('Failed to fetch definition:', error);
        this.definition = 'Failed to load definition.';
      }
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.timer);
          this.endRound();
        }
      }, 1000);
    },
    checkGuess(message, username) {
      if (message.trim().toLowerCase() === this.word.toLowerCase()) {
        console.log(username)
        const correctGuess = {
          id: this.correctMessages,
          username: username,
          text: message,
          correct: true
        };
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
      clearInterval(this.categoryTimer); // Clear the category changing timer
      this.$emit('round-ended', this.foundWords.length);
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
  }
};
</script>
