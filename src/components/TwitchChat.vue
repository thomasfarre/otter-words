<template>
  <div>
    <h1>Twitch Chat for {{ twitchChannelName }}</h1>
    <ul>
      <li v-for="message in messages" :key="message.id">
        {{ message.username }}: {{ message.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import tmi from 'tmi.js';

export default {
  name: 'TwitchChat',

  data() {
    return {
      client: null,
      messages: []
    };
  },
  watch: {
    twitchChannelName(newChannel, oldChannel) {
      if (newChannel !== oldChannel) {
        this.connectChat(newChannel);
      }
    }
  },
  created() {
    this.connectChat(this.twitchChannelName);
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
          id: this.messages.length,
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
