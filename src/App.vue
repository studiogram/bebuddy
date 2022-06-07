<template>
  <main>
    <p>Count: {{ distance }}</p>
    <button @click="increment()">Increment</button>
    <button @click="decrement()">Decrement</button>
    <GameComponent />
    <HighscoreComponent />
    <ResetComponent />
  </main>
</template>

<script>
import { io } from "socket.io-client";
import GameComponent from "./components/GameComponent.vue";
import HighscoreComponent from "./components/HighscoreComponent.vue";
import ResetComponent from "./components/ResetComponent.vue";

import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const distance = computed(() => store.state.distance);
    console.log(distance);

    function increment() {
      store.commit("increment");
    }

    function decrement() {
      store.commit("decrement");
    }

    return { distance, increment, decrement };
  },
  name: "App",
  components: {
    GameComponent,
    HighscoreComponent,
    ResetComponent,
  },
  mounted() {
    const socket = io("http://localhost:8000");
    socket.on("connect", () => {
      console.log(`connect ${socket.id}`);
    });
    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
