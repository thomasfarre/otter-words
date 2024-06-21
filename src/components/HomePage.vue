<template>
  <div
    class="min-h-screen bg-cover"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div class="mx-auto text-center pt-28">
      <div class="flex justify-center">
        <img :src="logoImage" alt="" />
      </div>
      <div class="pt-8 text-center">
        <div>
          <h1 class="text-white title">Le Jeu trop cool</h1>
        </div>
        <div>
          <span class="text-white subtitle"
            >des loutres, des mots et des truites bien sûr</span
          >
        </div>
        <button @click="startModal = true" class="mt-16 btn-white">
          Lancer une partie
        </button>
        <div v-show="startModal">
          <div @click.stop="startModal = false" class="absolute inset-0 w-screen h-screen bg-gray-800 opacity-60"></div>
          <div class="absolute z-20 w-full max-h-[95vh] overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[3rem] left-1/2 top-1/2 max-w-[54rem]">
            <button @click.stop="startModal = false" class="absolute transition duration-300 ease-out top-2 right-2 text-brown hover:text-brown-hover md:top-8 md:right-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <div class="py-8 text-center">
              <span class="title text-brown">
                Tu préfère jouer ?
              </span>
            </div>
            <div>

            </div>
            <div class="flex flex-col items-center px-16 py-8 space-y-4 md:space-y-0 md:space-x-4 md:flex-row">
              <TwitchLogin />
              <button @click="startSoloGame" class="md:w-1/2 btn-yellow min-w-[19rem]">
                En solo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import TwitchLogin from "./TwitchLogin.vue";
import bgImage from "/public/images/bg-loutre-2.jpg";
import logoImage from "/public/images/logo.png";

const startModal = ref(false);

const router = useRouter();
const startSoloGame = () => {
  router.push('/game');
};
</script>
