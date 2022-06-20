<script>
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
    leave() {
      console.log("leave app");
      this.$refs.game.gamestart();
    },
    reset() {
      console.log("reset app");
      this.$refs.highscore.entering();
      this.$refs.game.clearFake();
    },
    gameover() {
      console.log("gameover app");
      this.$store.commit("gameOver");
      this.$refs.highscore.entering();
      this.$refs.game.clearFake();
    },
    fake() {
      this.$refs.highscore.entering();
      this.$refs.game.clearFake();
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
    <ResetComponent
      ref="reset"
      @reset="reset()"
      @gameover="gameover()"
      @fake="fake()"
    />
  </main>
</template>
