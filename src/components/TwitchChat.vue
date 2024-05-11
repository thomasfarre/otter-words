<template>
  <div class="pt-6">
    <div class="bg-white p-6 rounded-md max-h-96 max-w-prose overflow-auto">
      <h2 class="text-gray-700">Twitch Chat de <span class="font-bold text-gray-900">{{ channelName }}</span></h2>
      <ul class="pt-4 space-y-2">
        <li v-for="message in messages" :key="message.id">
          {{ message.username }}: {{ message.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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
  },
  beforeUnmount() {
    if (this.client) {
      this.client.disconnect();
    }
  }
};
</script>
