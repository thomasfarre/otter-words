<template>
  <div class="absolute z-20 w-full p-1 transform -translate-x-1/2 bg-white rounded-md left-1/2 top-24 xl:max-w-prose">
    <div class="p-6 border border-gray-300 rounded-md min-h-96">
      <div class="">
        <span class="font-bold"> Meilleur score de chaque équipe </span>
        <ul class="pt-4">
          <li v-for="team in teams" :key="team.id">
            {{ team.displayName }}: {{ team.bestGlobalScore }}
          </li>
        </ul>
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
      teams: []
    };
  },
  async created() {
    await this.fetchTeams();
  },
  methods: {
    async fetchTeams() {
      const db = getFirestore();
      const teamsCollection = collection(db, 'Teams');
      const teamsSnapshot = await getDocs(teamsCollection);
      this.teams = teamsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }
  }
};
</script>
