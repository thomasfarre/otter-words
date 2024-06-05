<template>
  <div>
    <div
    class="absolute inset-0 w-screen h-screen bg-gray-800 opacity-60"
  ></div>
    <div class="absolute mt-2 z-20 w-full max-h-[95vh] overflow-y-auto transform -translate-x-1/2 -translate-y-1/4 bg-white rounded-card left-1/2 top-1/4 max-w-[50rem]">
      <div class="p-8 text-center">
        <div>
          <span class="title text-brown">
            Fin du round!
          </span>
          <span v-if="previousWord" class="subtitle text-brown">
            Le mot précédent était : <strong>{{ props.previousWord }}</strong>
          </span>
        </div>
        <div class="subtitle text-brown">Vous avez marqué un total de <span class="text-2xl text-green">{{ props.totalScore }}</span> points</div>

        <div class="pt-10 text-left">
          <button @click="activeTab = 'classement'" :class="{ 'font-bold text-green': activeTab === 'classement' }" class="p-2 transition duration-300 ease-out text-brown hover:text-green">
            Classement des participants
          </button>
          <button v-if="props.summary" @click="activeTab = 'resume'" :class="{ 'font-bold text-green': activeTab === 'resume' }" class="p-2 transition duration-300 ease-out text-brown hover:text-green">
            Résumé du round
          </button>
        </div>

        <div v-if="activeTab === 'classement'">
          <table class="min-w-full mt-4 divide-y divide-gray-200 ">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Position</th>
                <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Nom</th>
                <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Score</th>
              </tr>
            </thead>
            <tbody class="min-w-full text-left bg-white divide-y divide-gray-200">
              <tr v-for="(score, index) in props.sortedScores" :key="score.username" class="first:bg-yellow-100 [&:nth-child(2)]:bg-slate-200 [&:nth-child(3)]:bg-amber-400/40">
                <td class="px-2 py-3 text-lg text-brown whitespace-nowrap">{{ index + 1 }}.</td>
                <td class="px-2 py-3 text-lg text-brown whitespace-nowrap">{{ score.username }}</td>
                <td class="px-2 py-3 text-lg font-bold text-brown whitespace-nowrap">{{ score.score }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="activeTab === 'resume'">
          <table class="min-w-full mt-4 divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Catégorie</th>
                <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Lettre</th>
                <th scope="col" class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Mauvaise réponses</th>
              </tr>
            </thead>
            <tbody class="min-w-full text-left bg-white divide-y divide-gray-200">
              <tr v-for="(group, index) in props.summary.incorrectGuesses" :key="index">
                <td class="px-2 py-3 text-lg text-brown whitespace-nowrap">{{ formatCategories(group.category) }}</td>
                <td class="px-2 py-3 text-lg text-brown whitespace-nowrap">{{ group.letter }}</td>
                <td class="px-2 py-3 text-lg text-brown">
                  <ul>
                    <li v-for="(guess, idx) in group.guesses" :key="idx">{{ guess }}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pt-8">
          <button @click="endRound" class="btn text-brown">
            Vite, la suite!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  totalScore: Number,
  sortedScores: Array,
  summary: Object,
  previousWord: String
});

const emit = defineEmits(['end-round']);

const activeTab = ref('classement');

const formatCategories = (selectedCategory) => {
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
};

const endRound = () => {
  emit('end-round');
};
</script>
