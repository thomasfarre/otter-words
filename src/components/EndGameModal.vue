<template>
  <div
    @click.stop="emitClose"
    class="absolute inset-0 w-screen h-screen bg-gray-800 opacity-60"
  ></div>
  <div
    class="absolute z-20 w-full max-h-[95vh] overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[3rem] left-1/2 top-1/2 max-w-[54rem]"
  >
    <button
      @click.stop="emitClose"
      class="absolute transition duration-300 ease-out top-8 right-8 text-brown hover:text-brown-hover"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </button>
    <div class="p-8">
      <div class="text-center">
        <div>
          <span class="title text-brown">Fin du jeu!</span>
        </div>
        <div class="subtitle text-brown">
          Vous avez marqué un total de <span class="text-green">{{ props.finalScore }}</span> points, super !
        </div>
      </div>

      <div v-if="!scoreSaved" class="pt-8">
        <div>
          <span class="font-medium text-gray-500"> Classement des participants </span>
        </div>
        <table class="min-w-full mt-2 divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Position
              </th>
              <th
                scope="col"
                class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Nom
              </th>
              <th
                scope="col"
                class="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Score
              </th>
            </tr>
          </thead>
          <tbody class="min-w-full bg-white divide-y divide-gray-200">
            <tr
              v-for="(score, index) in props.detailedScores"
              :key="score.username"
              class="first:bg-yellow-100 [&:nth-child(2)]:bg-slate-200 [&:nth-child(3)]:bg-amber-400/40"
            >
              <td class="px-2 py-3 text-lg text-brown whitespace-nowrap">
                {{ index + 1 }}.
              </td>
              <td class="px-2 py-3 text-lg text-brown whitespace-nowrap">
                {{ score.username }}
              </td>
              <td class="px-2 py-3 text-lg font-bold text-brown whitespace-nowrap">
                {{ score.score }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="!props.isLoggedIn && !scoreSaved" class="pt-8">
        <div>
          <span class="font-medium text-gray-500"> Entrez votre nom pour enregistrer votre score </span>
          <span class="block italic text-red-500">
            Attention, Si vous quittez cette fenêtre le score sera perdu !
          </span>
        </div>
        <div class="flex items-center pt-4 space-x-4">
          <div class="w-1/2">
            <input v-model="userName" type="text" placeholder="Votre nom" class="block w-full px-4 py-2.5 text-lg text-gray-700 border rounded-md border-green focus:ring-2 ring-green focus-visible:outline-none"/>
          </div>
          <div class="flex justify-center w-1/2">
            <button @click="saveScore" class="w-full !rounded btn bg-emerald-100">Enregistrer</button>
          </div>
        </div>
      </div>

      <div v-if="scoreSaved" class="pt-8 text-center">
        <span class="font-medium text-green">Votre score a été enregistré !</span>
      </div>

      <div class="px-16 pt-8">
        <span class="subtitle text-brown">
          Choix des mini-jeux présents
        </span>
        <div class="flex items-center pt-4 space-x-4">
          <div v-for="round in props.availableRounds" :key="round.id" class="flex items-center">
            <div class="flex items-center space-x-2">
              <button type="button" :id="'round-' + round.id" @click="$emit('toggle-round', round.id)" :class="['relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2',
  props.selectedRounds.includes(round.id) ? 'bg-green' : 'bg-gray-200']" role="switch"
                :aria-checked="props.selectedRounds.includes(round.id)" aria-labelledby="'label-' + round.id">
                <span aria-hidden="true" :class="['inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full shadow pointer-events-none',
  props.selectedRounds.includes(round.id) ? 'translate-x-5' : 'translate-x-0']"></span>
              </button>
              <span class="cursor-pointer whitespace-nowrap text-brown" :id="'label-' + round.id" @click="toggleRound(round)">
                {{ round.name }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center pt-10 space-x-6">
        <div>
          <button @click="startGame" class="btn btn-white">
            Nouvelle partie
          </button>
        </div>
        <div>
          <button
            @click="toggleDashboard"
            class="btn btn-yellow"
          >
            Classements
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";

const props = defineProps({
  availableRounds: Array,
  finalScore: Number,
  selectedRounds: Array,
  detailedScores: Array,
  teamExists: Boolean,
  teamName: String,
  isLoggedIn: Boolean,
});

const userName = ref('');
const scoreSaved = ref(false);

const startGame = () => {
  emit("start-game");
};

const emitClose = () => {
  emit("close");
};

const toggleRound = (round) => {
  emit("toggle-round", round.id);
};

const toggleDashboard = () => {
  emit("toggle-dashboard");
};

const saveScore = () => {
  if (userName.value.trim() !== '') {
    emit('save-score', userName.value);
    scoreSaved.value = true;
  } else {
    alert("Veuillez entrer un nom valide.");
  }
};

const emit = defineEmits(["close", "toggle-round", "start-game", "toggle-dashboard", "save-score"]);
</script>
