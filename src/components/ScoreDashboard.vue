<template>
  <div @click.stop="$emit('close')" class="absolute inset-0 w-screen h-screen bg-gray-800 opacity-60"></div>
  <div class="absolute z-30 p-1 overflow-auto transform -translate-x-1/2 bg-white rounded-md top-8 left-1/2 xl:top-20">
    <button @click.stop="$emit('close')" class="absolute top-4 right-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
    <div class="p-6 overflow-auto border border-gray-300 rounded-md  max-h-[54rem]">
      <span class="text-2xl font-bold"> Tableau des meilleurs scores</span>
      <div class="flex flex-col pt-12 space-y-4 text-left xl:space-y-0 xl:space-x-12 xl:flex-wrap">
        <div class="w-1/2">
          <span class="font-bold">Équipes</span>
          <table class="min-w-full mt-4 divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Position</th>
                  <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Nom</th>
                  <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Score</th>
                </tr>
              </thead>
              <tbody class="min-w-full bg-white divide-y divide-gray-200">
                  <tr  v-for="(team, index) in teams" :key="team.id" class="first:bg-yellow-100 [&:nth-child(2)]:bg-slate-200 [&:nth-child(3)]:bg-amber-400/40">
                    <td class="px-2 py-3 text-sm whitespace-nowrap"> {{ index + 1 }}.</td>
                    <td class="px-2 py-3 text-sm whitespace-nowrap"> {{ team.displayName }}</td>
                    <td class="px-2 py-3 text-sm whitespace-nowrap"> {{ team.bestGlobalScore }}</td>
                  </tr>
              </tbody>
          </table>
        </div>
        <div class="w-1/2">
          <span class="font-bold">Joueurs</span>
          <table class="min-w-full mt-4 divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Position</th>
                  <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Nom</th>
                  <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Score</th>
                </tr>
              </thead>
              <tbody class="min-w-full bg-white divide-y divide-gray-200">
                  <tr  v-for="(player, index) in players" :key="player.id" class="first:bg-yellow-100 [&:nth-child(2)]:bg-slate-200 [&:nth-child(3)]:bg-amber-400/40">
                    <td class="px-2 py-3 text-sm whitespace-nowrap"> {{ index + 1 }}.</td>
                    <td class="px-2 py-3 text-sm whitespace-nowrap"> {{ player.displayName }}</td>
                    <td class="px-2 py-3 text-sm whitespace-nowrap"> {{ player.bestScore }}</td>
                  </tr>
              </tbody>
          </table>
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
