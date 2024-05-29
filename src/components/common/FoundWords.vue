<template>
  <div class="py-2 mx-auto mt-1 overflow-y-auto bg-white rounded-lg max-h-96 max-w-prose xl:py-4 xl:mt-2">
    <div class="pt-2 space-y-2">
      <div class="px-4 text-left">
        <span class="text-lg font-medium text-gray-700">
          Mots trouvés
        </span>
      </div>
      <div class="grid grid-cols-3 gap-2 px-4">
        <div
          v-for="message in correctGuess"
          :key="message.id"
          class="py-1 pl-1 truncate border border-gray-200 rounded-lg shadow-md bg-amber-50"
        >
          <span class="text-sm text-gray-800">
            {{ message.text }}
          </span>
          <span class="text-sm text-gray-700">
            ({{ message.username }})
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    correctGuess: {
      type: Array,
      required: true,
    },
  },
};
</script>
