<template>
  <div
    class="top-0 hidden w-64 h-64 pt-2 space-y-2 overflow-y-auto translate-x-full bg-white border-2 shadow-md md:absolute md:block -right-8 rounded-xl border-emerald-800"
  >
    <div class="flex justify-between w-full px-4 text-left">
      <span class="text-lg font-medium text-gray-700"> Score d'équipe </span>
      <span class="text-lg font-light text-gray-700">
        {{ props.totalScore }} pts
      </span>
    </div>
    <div
      class="flex flex-col items-start justify-start space-y-2 divide-y divide-gray-200"
    >
      <div
        v-for="(score, index) in props.sortedScores"
        :key="score.username"
        class="flex px-4 py-2 justify-between w-full first:bg-yellow-100 [&:nth-child(2)]:bg-slate-200 [&:nth-child(3)]:bg-amber-400/40"
      >
        <div class="flex space-x-2">
          <span class="text-base font-bold"> {{ index + 1 }}. </span>
          <span class="text-base font-medium text-gray-800 capitalize">
            {{ score.username }}
          </span>
        </div>
        <span class="text-base font-light text-gray-700"> {{ score.score }} pts </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  sortedScores: Array,
  totalScore: Number
});
</script>
