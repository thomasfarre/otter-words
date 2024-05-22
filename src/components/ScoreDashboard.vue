<template>
  <div @click.stop="$emit('close')" class="absolute inset-0 w-screen h-screen bg-gray-800 opacity-60"></div>
  <div class="absolute z-30 p-1 overflow-auto transform -translate-x-1/2 bg-white rounded-md left-1/2 top-20">
    <button @click.stop="$emit('close')" class="absolute top-4 right-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
    <div class="p-6 overflow-auto border border-gray-300 rounded-md h-[30rem] max-h-[30rem] min-w-[720px]">
      <span class="text-2xl font-bold"> Tableau des meilleurs scores </span>
      <div class="flex pt-12 space-x-12">
        <div class="w-1/2">
          <span class="font-bold">Équipes</span>

          <ul class="pt-4">
            <li v-for="team in teams" :key="team.id">
              {{ team.displayName }}: {{ team.bestGlobalScore }}
            </li>
          </ul>
        </div>
        <div class="w-1/2">
          <span class="font-bold">Joueurs</span>
          <ul class="pt-4">
            <li v-for="player in players" :key="player.id">
              {{ player.displayName }}: {{ player.bestScore }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export default {
  name: 'ScoreDashboard',
  data() {
    return {
      teams: [],
      players: []
    };
  },
  async created() {
    await this.fetchTeams();
    await this.fetchPlayers();
  },
  methods: {
    async fetchTeams() {
      const db = getFirestore();
      const teamsCollection = collection(db, 'Teams');
      const teamsSnapshot = await getDocs(teamsCollection);
      this.teams = teamsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => b.bestGlobalScore - a.bestGlobalScore); // Sort by bestGlobalScore in descending order
    },
    async fetchPlayers() {
      const db = getFirestore();
      const playersCollection = collection(db, 'Players');
      const playerSnapshot = await getDocs(playersCollection);
      this.players = playerSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => b.bestScore - a.bestScore); // Sort by bestScore in descending order
    }
  }
};
</script>
