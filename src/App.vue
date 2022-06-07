<template>
  <main>
    <p>Count: {{ distance }}</p>
    <button @click="increment()">Increment</button>
    <button @click="decrement()">Decrement</button>
    <p>
      distance: {{ distance }} dossard :{{ dossard }} country:{{
        country
      }}
      popup:{{ popup }} bestscores{{ bestscores }}
    </p>
    <GameComponent />
    <HighscoreComponent />
    <ResetComponent />
  </main>
</template>

<script>
import { io } from "socket.io-client";
import { mapState } from "vuex";
import GameComponent from "./components/GameComponent.vue";
import HighscoreComponent from "./components/HighscoreComponent.vue";
import ResetComponent from "./components/ResetComponent.vue";

export default {
  name: "App",
  components: {
    GameComponent,
    HighscoreComponent,
    ResetComponent,
  },
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
  computed: {
    ...mapState(["distance", "dossard", "country", "popup", "bestscores"]),
  },
  methods: {
    increment() {
      this.$store.commit("increment");
    },
    decrement() {
      this.$store.commit("decrement");
    },
  },
  mounted() {
    console.log("mounted");
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
* {
  cursor: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
