<template>
  <div>
    <div class="absolute z-20 w-full h-[95vh] p-2 transform -translate-x-1/2 bg-white rounded-md left-1/2 top-1/2 -translate-y-1/2 overflow-y-auto md:w-1/2 xl:w-1/3">
      <div class="p-6">
        <div>
          <span class="text-2xl font-bold text-gray-900 font-poppins">
            Fin du round!
          </span>
          <span v-if="previousWord" class="text-xl text-gray-900 font-poppins">
            Le mot précédent était : <strong>{{ previousWord }}</strong>
          </span>
        </div>
        <div>Vous avez marqué un total de <span class="text-xl font-bold">{{ totalScore }}</span></div>

        <!-- Tabs Navigation -->
        <div class="pt-10">
          <button @click="activeTab = 'classement'" :class="{ 'font-bold': activeTab === 'classement' }" class="px-4 py-2">
            Classement des participants
          </button>
          <button @click="activeTab = 'resume'" :class="{ 'font-bold': activeTab === 'resume' }" class="px-4 py-2 ml-4">
            Résumé du round
          </button>
        </div>

        <div v-if="activeTab === 'classement'" class="pt-10">
          <span>Classement des participants:</span>
          <table class="min-w-full mt-4 divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Position</th>
                <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Nom</th>
                <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Score</th>
              </tr>
            </thead>
            <tbody class="min-w-full bg-white divide-y divide-gray-200">
              <tr v-for="(score, index) in sortedScores" :key="score.username" class="first:bg-yellow-100 [&:nth-child(2)]:bg-slate-200 [&:nth-child(3)]:bg-amber-400/40">
                <td class="px-2 py-3 text-sm whitespace-nowrap">{{ index + 1 }}.</td>
                <td class="px-2 py-3 text-sm whitespace-nowrap">{{ score.username }}</td>
                <td class="px-2 py-3 text-sm whitespace-nowrap">{{ score.score }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="activeTab === 'resume'" class="pt-10">
          <span>Résumé du Round</span>
          <table class="min-w-full mt-4 divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Catégorie</th>
                <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Lettre</th>
                <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Mauvaise réponses</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(group, index) in summary.incorrectGuesses" :key="index">
                <td class="px-2 py-3 text-sm whitespace-nowrap">{{ formatCategories(group.category) }}</td>
                <td class="px-2 py-3 text-sm whitespace-nowrap">{{ group.letter }}</td>
                <td class="px-2 py-3 text-sm">
                  <ul>
                    <li v-for="(guess, idx) in group.guesses" :key="idx">{{ guess }}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pt-6">
          <button @click="endRound" class="border-2 btn border-emerald-700">
            Vite, la suite!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalScore: Number,
    sortedScores: Array,
    summary: Object,
    previousWord: String
  },
  data() {
    return {
      activeTab: 'classement'
    };
  },
  methods: {
    formatCategories(selectedCategory) {
      const categoryMap = {
        animaux: "animaux",
        anatomie: "parties du corps",
        fromages: "fromages",
        prenoms: "prénoms",
        metiers: "métiers",
        pays: "pays",
        vegetaux: "végétaux",
        qualitedefaut: "qualités & défauts",
        adverbes: "adverbes en -ment",
      };
      return categoryMap[selectedCategory] || selectedCategory;
    },
    endRound() {
      this.$emit('end-round');
    },
  }
};
</script>

<style scoped>
.button {
  cursor: pointer;
}
.button:focus {
  outline: none;
}
.font-bold {
  font-weight: bold;
}
</style>
