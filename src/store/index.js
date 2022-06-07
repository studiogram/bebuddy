import { createStore } from "vuex";

const initialState = () => {
  return {
    distance: 0,
    dossard: 0,
    country: 0,
    popup: 0,
    bestscores: [],
  };
};
const state = initialState();

const mutations = {
  increment(state) {
    state.distance++;
  },
  decrement(state) {
    state.distance--;
  },
  reset(state) {
    Object.assign(state, initialState());
    return state;
  },
  initialiseStore(state) {
    console.log("initial store");
    if (localStorage.getItem("store")) {
      console.log("already exists");
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem("store")))
      );
    }
  },
};
const store = createStore({
  state,
  mutations,
});
store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
