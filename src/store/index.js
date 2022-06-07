import { createStore } from "vuex";

const state = {
  distance: 0,
  dossard: 0,
  country: 0,
  popup: 0,
  scores: [],
};

const mutations = {
  increment(state) {
    state.distance++;
  },
  decrement(state) {
    state.distance--;
  },
};

export default createStore({
  state,
  mutations,
});
