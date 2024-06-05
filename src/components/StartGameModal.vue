<template>
  <div>
    <!-- Modal Background and Content -->
    <div @click.stop="emitClose" class="absolute inset-0 w-screen h-screen bg-gray-800 opacity-60"></div>
    <div class="absolute z-20 w-full max-h-[95vh] overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[3rem] left-1/2 top-1/2 max-w-[54rem]">
      <button @click.stop="emitClose" class="absolute transition duration-300 ease-out top-2 right-2 text-brown hover:text-brown-hover md:top-8 md:right-8">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
          stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="py-6 text-center">
        <!-- Title and Instructions -->
        <div>
          <span class="title text-brown">Explication du jeu super!</span>
        </div>
        <div>
          <span class="subtitle text-brown">
            Loutrons et Loutrones de l’Empire sacré de la Rivière, Bienvenue !
          </span>
        </div>
        <div class="px-8 py-4">
          <p class="text-brown">
            Voici la toute première version du jeu créé spécialement pour vous, virtuoses de la langue française !
            Cette première version se compose de 5 mini-jeux chronométrés.
            <!-- Game Instructions -->
            <br /><br />
            <span class="block subtitle">
              Round 1 : le petit bac
            </span>
            Une lettre et une catégorie s’affichent, à vous de trouver le
            plus de mot possible (exemples : les animaux en L, les pays en T…). Toutes les 30 secondes, la lettre et
            la catégorie changent.
            <br/>
            <br/>
            <span class="block subtitle">
              Round 2 : le dico
            </span>
            La définition est affichée, à vous de retrouver le mot !
            <br />
            <br/>
            <span class="block subtitle">
              Round 3 : le pendu
            </span>
            Les lettres s’affichent au fur et à mesure du temps, à vous de
            retrouver le mot complet le plus vite possible !
            <br />
            <br/>
            <span class="block subtitle">
              Round 4 : les synonymes
            </span>
            Un mot est tiré au sort, à vous de retrouver tout ces synonymes le plus vite possible !
            <br />
            <br/>
            <span class="block subtitle">
              Round 5 : le scrabble
            </span>
            Plusieurs lettres s'affichent directement, d'autre arrivent au fur et à mesures, à vous de former un maximum de mots avec elles !
            <br /><br />
            Vous pouvez taper directement les réponses dans le chat Twitch. Si elles sont correctes, elles
            s’afficheront dans la liste, avec votre pseudo et votre score. Si elles sont incorrectes, elles
            échoueront dans la rivière, juste en dessous.
          </p>
        </div>
        <div class="px-16 pt-4 border-t border-brown">
          <span class="subtitle text-brown">
            Choix des mini-jeux présents
          </span>
          <div class="grid grid-cols-2 gap-4 pt-2 md:gap-0 md:space-x-4 md:flex md:items-center md:justify-center">
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
        <div class="flex flex-col items-center justify-center pt-6 mx-auto space-y-2 w-fit">
          <input v-if="!props.teamExists" v-model="localTeamName" type="text" name="teamName" id="teamName"
            class="block rounded-md w-72 border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-amber-600 placeholder:text-gray-600 hover:ring-amber-500 hover:ring-2 focus:ring-2 focus:ring-inset focus:ring-amber-500 transition ease-out duration-300 focus-visible:outline-none"
            placeholder="Choisis ton nom d'équipe">
          <button @click="emitStartGame" class="btn-white">
            lance la partie !
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';

const props = defineProps({
  availableRounds: Array,
  selectedRounds: Array,
  teamExists: Boolean,
  teamName: String
});

const emit = defineEmits(['close', 'toggle-round', 'start-game', 'update:teamName']);

const localTeamName = ref(props.teamName);

watch(localTeamName, (newValue) => {
  emit('update:teamName', newValue);
});

const emitStartGame = () => {
  emit('update:teamName', localTeamName.value);
  emit('start-game');
}

const emitClose = () => {
  emit('close');
};

const toggleRound = (round) => {
  emit('toggle-round', round.id);
};
</script>
