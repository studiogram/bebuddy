import { createStore } from "vuex";
import flagsData from "@/datas/flags.json";
import popupsData from "@/datas/popups.json";

const total = 1859000;

const initialState = () => {
  return {
    currentDistance: 0,
    distance: 0,
    dossard: 0,
    country: 0,
    popup: 0,
    highscores: [],
    ratio: 7,
  };
};
const state = initialState();

const mutations = {
  incrementDistance(state) {
    state.distance += (0.31 * state.ratio * 100) / total;
  },
  incrementCurrentDistance(state) {
    state.currentDistance += (0.31 * state.ratio) / 1000;
  },
  incrementCountry(state) {
    if (state.country < flagsData.length) state.country++;
  },
  incrementPopup(state) {
    if (state.popup < popupsData.length) state.popup++;
  },
  incrementRatio(state) {
    state.ratio++;
  },
  decrementRatio(state) {
    if (state.ratio > 0) state.ratio--;
  },
  updateRatio(state, value) {
    state.ratio = value;
  },
  newGame(state) {
    state.dossard++;
    state.currentDistance = 0;
  },
  gameOver(state) {
    state.highscores.push({
      dossard: state.dossard,
      km: state.currentDistance.toFixed(2),
    });
    if (state.highscores.length != 0) {
      const sort = state.highscores.sort((a, b) => b.km - a.km);
      state.highscores = sort.filter((highscore, i) => i <= 2);
    }
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
    if (context.state.distance + (0.31 * state.ratio * 100) / total > 100) {
      context.commit("gameOver");
    } else {
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
