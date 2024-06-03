<template>
  <div class="py-2 mx-auto mt-1 overflow-y-auto bg-white rounded-lg max-h-96 max-w-prose xl:py-4 xl:mt-2">
    <div class="pt-2 space-y-2">
      <div class="px-4 text-left">
        <span class="text-xl font-medium text-gray-700">
          Mots trouvés
        </span>
      </div>
      <div class="grid grid-cols-3 gap-2 px-4">
        <div
          v-for="message in props.correctGuess"
          :key="message.id"
          class="py-1 pl-1 truncate border border-gray-200 rounded-lg shadow-md bg-amber-50"
        >
          <span class="text-base text-gray-800">
            {{ message.text }}
          </span>
          <span class="text-base text-gray-700">
            ({{ message.username }})
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  correctGuess: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
</style>
