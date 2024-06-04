<template>
  <div class="px-4 mt-4 overflow-y-auto rounded-b-card max-h-36">
    <div class="space-y-2">
      <div class="grid grid-cols-3 gap-2 pt-1">
        <div
          v-for="message in props.correctGuess"
          :key="message.id"
          class="py-1.5 pl-1 truncate  border border-gray-200 bg-amber-50 rounded-lg shadow-md"
        >
          <span class="font-bold text-brown">
            {{ message.text }}
          </span>
          <span class=" text-brown">
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
