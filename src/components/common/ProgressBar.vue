<template>
  <div class="absolute z-40 -top-7 -left-6">
    <img class="w-16 h-16" :src="props.otterImage" alt="" />
  </div>
  <div
    class="absolute z-30 w-8 h-8 transform -translate-x-1/2 -top-3"
    :style="{ left: props.progressBarWidth, transition: 'all 1s linear' }"
  >
    <img class="w-full h-full transition-transform duration-300 animate-wiggle" :src="props.cartoonTroutImage" alt="" />
  </div>
  <div
    class="absolute inset-0 top-0 z-10 h-3 rounded-full bg-green"
    :style="{
      width: props.progressBarWidth,
      transition: 'width 1s linear',
    }"
  ></div>
  <div class="absolute inset-0 top-0 h-3 bg-gray-300 rounded-full"></div>
  <div class="absolute left-[16.6%] h-3 bg-white w-px z-20"></div>
  <div class="absolute left-[33.3%] h-3 bg-white w-px z-20"></div>
  <div class="absolute left-[49.9%] h-3 bg-white w-px z-20"></div>
  <div class="absolute left-[66.5%] h-3 bg-white w-px z-20"></div>
  <div class="absolute left-[83.3%] h-3 bg-white w-px z-20"></div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps ({
  progressBarWidth: String,
  cartoonTroutImage: String,
  otterImage: String
});

</script>
