<template>
  <div class="absolute z-30 -top-4 -left-4">
    <img class="w-10 h-10" :src="otterImage" alt="" />
  </div>
  <div
    class="absolute z-20 w-6 h-6 transform -translate-x-1/2 -top-2"
    :style="{ left: progressBarWidth, transition: 'all 1s linear' }"
  >
    <img class="w-full h-full" :src="cartoonTroutImage" alt="" />
  </div>
  <div
    class="absolute inset-0 top-0 z-10 h-2 bg-emerald-400"
    :style="{
      width: progressBarWidth,
      transition: 'width 1s linear',
    }"
  ></div>
  <div class="absolute inset-0 top-0 h-2 bg-gray-300"></div>
</template>

<script>
export default {
  props: {
    progressBarWidth: {
      type: String,
      required: true,
    },
    cartoonTroutImage: {
      type: String,
      required: true,
    },
    otterImage: {
      type: String,
      required: true,
    },
  },
};
</script>
