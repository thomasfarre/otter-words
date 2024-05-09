<template>
  <div class="pt-6">
    <div class="bg-white p-6 rounded-md max-h-96 max-w-prose overflow-auto">
      <h2 class="text-gray-700">Twitch Chat de <span class="font-bold text-gray-900">{{ channelName }}</span></h2>
      <ul class="pt-4 space-y-2">
        <li v-for="message in messages" :key="message.id">
          {{ message.username }}: {{ message.text }}
        </li>
      </ul>
      <div class="mt-4">
        <p class="text-lg">Random Word: <strong>{{ randomWord }}</strong></p>
        <p>Definition: <em>{{ definition }}</em></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import tmi from 'tmi.js';

export default {
  name: 'TwitchChat',
  data() {
    return {
      client: null,
      messages: [],
      channelName: '',
      randomWord: '',
      definition: ''
    };
  },
  created() {
    this.fetchChannelNameAndConnect();
    this.fetchRandomWord();
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
    connectChat(channel) {
      if (this.client) {
        this.client.disconnect(); // Disconnect if already connected
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
        if (self) return;
        this.messages.push({
          id: this.messages.length + 1, // updated to avoid duplication in keys
          username: tags['display-name'],
          text: message
        });
      });

      this.client.connect().catch(console.error);
    },
    async fetchRandomWord() {
      try {
        const response = await axios.get('/api', {
          params: {
            action: 'query',
            format: 'json',
            list: 'random',
            rnnamespace: 0,
            rnlimit: 1
          }
        });
        const title = response.data.query.random[0].title;
        this.randomWord = title;

        // Fetching the definition
        const details = await axios.get('/api', {
          params: {
            action: 'query',
            format: 'json',
            prop: 'extracts',
            titles: title
          }
        });
        const page = details.data.query.pages;
        const pageId = Object.keys(page)[0];
        this.definition = page[pageId].extract;
      } catch (error) {
        console.error('Error fetching random word:', error);
      }
    }
  },
  beforeUnmount() {
    if (this.client) {
      this.client.disconnect();
    }
  }
};
</script>
