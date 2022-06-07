import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

const app = createApp(App);
app.use(store);
app.mount("#app");

// import { createApp } from 'vue'
// import { createStore } from 'vuex'

// const store = createStore({
//     state () {
//       return {
//         distance: 0,
//         dossard: 0,
//         country: 0,
//         popup:0,
//         scores: []
//       }
//     },
//     mutations: {
//       increment (state) {
//         state.count++
//       }
//     }
// })

// const app = createApp(App).mount('#app');
// app.use(store);
