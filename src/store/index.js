import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      twitchChannelName: null,
    },
  },
  mutations: {
    setTwitchChannelName(state, name) {
      state.user.twitchChannelName = name;
    },
  },
  actions: {
    updateTwitchChannelName({ commit }, name) {
      commit("setTwitchChannelName", name);
    },
  },
  getters: {
    twitchChannelName: (state) => state.user.twitchChannelName,
  },
});
