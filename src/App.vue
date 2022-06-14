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
  methods: {
    leave() {
      console.log("leave app");
      this.$refs.game.gamestart();
    },
    reset() {
      console.log("reset app");
      this.$refs.highscore.entering();
    },
    gameover() {
      console.log("gameover app");
      this.$refs.highscore.entering();
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>

<template>
  <main>
    <GameComponent ref="game" @gameover="gameover()" />
    <HighscoreComponent ref="highscore" @leave="leave()" />
    <ResetComponent ref="reset" @reset="reset()" @gameover="gameover()" />
  </main>
</template>
