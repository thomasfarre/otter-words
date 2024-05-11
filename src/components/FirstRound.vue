<template>
  <div class="round bg-white p-6">
    <h3>Round: Find {{ selectedCategory }} starting with "{{ startLetter }}"</h3>
    <div v-if="timeLeft > 0">
      <p>Time left: {{ timeLeft }} seconds</p>
      <ul>
        <li v-for="wordObj in foundWords" :key="wordObj.word">{{ wordObj.word }} (Found by: {{ wordObj.foundBy }})</li>
      </ul>
    </div>
    <div v-else>
      <h4>Round ended!</h4>
      <button @click="endRound">Show Results</button>
    </div>
  </div>
  <div class="bg-white p-6 mt-12 max-w-xl">
    <span>La Rivière</span>
    <ul class="pt-4 space-y-2 flex space-x-4 overflow-x-auto whitespace-nowrap">
      <li v-for="message in messages" :key="message.id">
        {{ message.text }} ~
      </li>
    </ul>
  </div>
</template>

<script>
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import tmi from 'tmi.js';

export default {
  emits: ['round-ended'],
  name: 'FirstRound',
  data() {
    return {
      client: null,
      timeLeft: 120,
      timer: null,
      categoryTimer: null,
      messages: [],
      channelName: '',
      foundWords: [],
      validWords: new Map(),  // Changed from Set to Map for easier lookup with categories
      selectedCategory: '',
      startLetter: '',
      scores: {}
    };
  },
  created() {
    this.fetchChannelNameAndConnect();
    this.selectRandomCategoryAndLetter();
    this.startTimer();
    this.categoryTimer = setInterval(() => {
      this.selectRandomCategoryAndLetter(); // Reselect category and letter every 30 seconds
    }, 30000);
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
      const db = getFirestore();
      const categoriesRef = collection(db, "words");
      const categoriesSnapshot = await getDocs(query(categoriesRef, where("category", "==", "animals"))); // Should be generalized if you have more categories
      const categories = categoriesSnapshot.docs.map(doc => doc.data().category);

      // Select a random category (if more than one category, adjust logic here)
      this.selectedCategory = categories[Math.floor(Math.random() * categories.length)];
      this.startLetter = String.fromCharCode(65 + Math.floor(Math.random() * 25)); // Random letter A-Z
      this.fetchValidWords();
    },
    async fetchValidWords() {
      const db = getFirestore();
      const wordsRef = collection(db, "words");
      const q = query(wordsRef, where("category", "==", this.selectedCategory), where("firstLetter", "==", this.startLetter));
      const snapshot = await getDocs(q);
      snapshot.docs.forEach(doc => {
        this.validWords.set(doc.data().word.toLowerCase(), doc.data().word); // Store original casing for display
      });
    },
    checkWord(message, username) {
      const cleanMessage = message.trim().toLowerCase();
      if (this.validWords.has(cleanMessage) && !this.foundWords.some(w => w.word === this.validWords.get(cleanMessage))) {
        this.foundWords.push({ word: this.validWords.get(cleanMessage), foundBy: username });
        this.scores[username] = (this.scores[username] || 0) + 10; // Increment score for user
        console.log("Valid word found:", this.validWords.get(cleanMessage));
        return true;
      }
      return false;
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
        this.checkWord(message);
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
