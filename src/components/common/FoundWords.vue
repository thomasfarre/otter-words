<template>
  <div class="px-4 mt-4 overflow-y-auto max-h-[18rem]">
    <div class="space-y-2">
      <transition-group
        name="list"
        tag="div"
        class="grid grid-cols-3 gap-2 pt-1"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-50"
        enter-to-class="transform scale-100"
        leave-active-class="transition duration-300 ease-out"
        leave-from-class="transform scale-100"
        leave-to-class="transform scale-50"
      >
        <div
          v-for="message in props.correctGuess"
          :key="message.text"
          class="py-1.5 pl-1 truncate border border-brown/30 bg-amber-50 rounded-lg shadow-md"
        >
            <span class="font-bold text-brown">
              {{ message.text }}
            </span>
            <span class="text-brown">
              ({{ message.username }})
            </span>
        </div>
      </transition-group>
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
