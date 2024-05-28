<template>
  <div class="absolute z-20 p-2 transform -translate-x-1/2 bg-white rounded-md left-1/2 top-20 min-w-[720px]">
    <div class="p-6 border border-gray-300 rounded-md">
      <div>
        <span class="text-2xl font-bold text-gray-900 font-poppins">
          Fin du round!
        </span>
        <span v-if="previousWord" class="text-xl text-gray-900 font-poppins" >
          Le mot précédent était : <strong>{{ previousWord }}</strong>
        </span>
      </div>
      <div>Vous avez marqué un total de <span class="text-xl font-bold">{{ totalScore }}</span></div>
      <div class="pt-10">
        <span> Classement des participants: </span>
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
      <div class="pt-6">
        <button @click="endRound" class="border-2 btn border-emerald-700">
          Vite, la suite!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalScore: {
      type: Number,
      required: true,
    },
    sortedScores: {
      type: Array,
      required: true,
    },
    previousWord: {
      type: String,
      required: false,
    }
  },
  methods: {
    endRound() {
      this.$emit('end-round');
    },
  },
};
</script>
