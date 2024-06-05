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
        <TwitchLogin />
      </div>
    </div>
  </div>
</template>

<script setup>
import TwitchLogin from "./TwitchLogin.vue";
import bgImage from "/public/images/bg-loutre-2.jpg";
import logoImage from "/public/images/logo.png";

</script>
