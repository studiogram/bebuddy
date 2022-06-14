import { createStore } from "vuex";
import flagsData from "@/datas/flags.json";
import popupsData from "@/datas/popups.json";
// const distance = 0.0001;
const distance = 0.1;
const total = 1859;

console.log(popupsData.length);

const initialState = () => {
  return {
    currentDistance: 0,
    distance: 0,
    dossard: 1,
    country: 0,
    popup: 0,
    highscores: [],
  };
};
const state = initialState();

const mutations = {
  incrementDistance(state) {
    state.distance += distance;
    console.log(state.distance);
  },
  incrementCurrentDistance(state) {
    state.currentDistance += (distance * total) / 100;
  },
  incrementCountry(state) {
    if (state.country < flagsData.length) state.country++;
  },
  incrementPopup(state) {
    if (state.popup < popupsData.length) state.popup++;
    console.log(popupsData[state.popup].distance);
  },
  newGame() {
    console.log("new game");
    state.dossard++;
    state.currentDistance = 0;
  },
  gameOver() {
    console.log("gameover");
  },
  reset(state) {
    Object.assign(state, initialState());
    return state;
  },
  initialiseStore(state) {
    if (localStorage.getItem("store")) {
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem("store")))
      );
    }
  },
};
const actions = {
  increment(context) {
    if (context.state.distance + distance <= 100) {
      context.commit("incrementDistance");
      context.commit("incrementCurrentDistance");
      if (
        context.state.popup < popupsData.length - 1 &&
        context.state.distance >= popupsData[context.state.popup + 1].distance
      ) {
        context.commit("incrementPopup");
      }
      if (
        context.state.country < flagsData.length - 1 &&
        context.state.distance >= flagsData[context.state.country + 1].distance
      ) {
        context.commit("incrementCountry");
      }
    }
  },
};
const store = createStore({
  state,
  mutations,
  actions,
});
store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
