// useStore.js
import { reactive, readonly } from "vue";

const state = reactive({
  channelName: "",
});

export function useStore() {
  return {
    state: readonly(state),

    setChannelName(name) {
      state.channelName = name;
    },
  };
}
