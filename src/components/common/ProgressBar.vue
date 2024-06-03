<template>
  <div class="absolute z-30 -top-4 -left-4">
    <img class="w-10 h-10" :src="props.otterImage" alt="" />
  </div>
  <div
    class="absolute z-20 w-6 h-6 transform -translate-x-1/2 -top-2"
    :style="{ left: props.progressBarWidth, transition: 'all 1s linear' }"
  >
    <img class="w-full h-full" :src="props.cartoonTroutImage" alt="" />
  </div>
  <div
    class="absolute inset-0 top-0 z-10 h-2 bg-emerald-400"
    :style="{
      width: props.progressBarWidth,
      transition: 'width 1s linear',
    }"
  ></div>
  <div class="absolute inset-0 top-0 h-2 bg-gray-300"></div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps ({
  progressBarWidth: String,
  cartoonTroutImage: String,
  otterImage: String
});

</script>
