<template>
  <div @click.stop="emitClose" class="absolute inset-0 w-screen h-screen bg-gray-800 opacity-60"></div>
  <div class="absolute z-40 w-full max-h-[95vh] overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[3rem] left-1/2 top-1/2 max-w-[54rem]">
    <button @click.stop="emitClose" class="absolute transition duration-300 ease-out top-6 right-6 text-brown hover:text-brown-hover">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
    <div class="p-6">
      <span class="title text-brown"> Tableau des meilleurs scores</span>
      <div class="flex flex-col pt-12 space-y-4 text-left xl:space-y-0 xl:space-x-12 xl:flex-row">
        <div class="xl:w-1/2">
          <span class="subtitle text-brown">Équipes</span>
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
        <div class="xl:w-1/2">
          <span class="subtitle text-brown">Joueurs</span>
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

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const emit = defineEmits(['close']);

const teams = ref([]);
const players = ref([]);

const emitClose = () => {
  emit('close');
};

const fetchTeams = async () => {
  const db = getFirestore();
  const teamsCollection = collection(db, 'Teams');
  const teamsSnapshot = await getDocs(teamsCollection);
  teams.value = teamsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })).sort((a, b) => b.bestGlobalScore - a.bestGlobalScore);
};

const fetchPlayers = async () => {
  const db = getFirestore();
  const playersCollection = collection(db, 'Players');
  const playerSnapshot = await getDocs(playersCollection);
  players.value = playerSnapshot.docs.map(doc => {
    const playerData = doc.data();
    return {
      id: doc.id,
      ...playerData
    };
  }).filter(player => player.bestScore !== undefined && player.bestScore !== null)
    .sort((a, b) => b.bestScore - a.bestScore);
};

onMounted(async () => {
  await fetchTeams();
  await fetchPlayers();
});
</script>
