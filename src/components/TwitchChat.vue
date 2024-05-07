<template>
  <div class="pt-6">
    <div class="bg-white p-6 rounded-md max-h-96 max-w-prose overflow-auto">
      <h2 class="">Twitch Chat de {{ channelName }}</h2>
      <ul>
        <li v-for="message in messages" :key="message.id">
          {{ message.username }}: {{ message.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import tmi from 'tmi.js';

export default {
  name: 'TwitchChat',
  data() {
    return {
      client: null,
      messages: [],
      channelName: '' // Initialize channelName as empty
    };
  },
  created() {
    this.channelName = sessionStorage.getItem("twitchChannelName");
    this.connectChat(this.channelName);
  },
  methods: {
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
    }
  },
  beforeUnmount() {
    if (this.client) {
      this.client.disconnect();
    }
  }
};
</script>
