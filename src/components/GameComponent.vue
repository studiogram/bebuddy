<script>
import { io } from "socket.io-client";
import { mapState } from "vuex";
import CountDownComponent from "./game/CountDownComponent.vue";
import MapComponent from "./game/MapComponent.vue";
import PopupComponent from "./game/PopupComponent.vue";
import DossardComponent from "./game/DossardComponent.vue";
import MiniMapComponent from "./game/MiniMapComponent.vue";
import FlagComponent from "./game/FlagComponent.vue";
// import SpeedComponent from "./game/SpeedComponent.vue";
import TimerComponent from "./game/TimerComponent.vue";

export default {
  name: "GameComponent",
  components: {
    CountDownComponent,
    MapComponent,
    PopupComponent,
    DossardComponent,
    MiniMapComponent,
    FlagComponent,
    // SpeedComponent,
    TimerComponent,
  },
  computed: {
    ...mapState(["distance", "fake"]),
  },
  data() {
    return {
      fakeKmh: 10,
      fakeInterval: false,
      available: false,
      countInterval: false,
    };
  },
  mounted() {
    console.log("game mounted");
    this.detected = (e) => {
      if (e.key == "a") this.action();
    };
    this.detectHandler = this.detected.bind(this);
    const socket = io("http://localhost:8000");
    socket.on("connect", () => {
      console.log(`connect ${socket.id}`);
      socket.on("timer", () => this.action());
    });
  },
  methods: {
    action() {
      if (this.available) {
        this.$store.dispatch("increment");
        // this.$refs.speed.update();
        if (this.$refs.map) this.$refs.map.update(this.distance);
        if (this.$refs.minimap) this.$refs.minimap.update(this.distance);
      }
    },
    countdownend() {
      console.log("end countdown");
      this.$refs.timer.start();
      this.available = true;
      document.body.addEventListener("keyup", this.detectHandler);
      console.log(`fake: ${this.fake}`);

      if (this.fake == true) {
        this.fakeInterval = setInterval(() => {
          this.action();
        }, 1000 / ((this.fakeKmh * 1000) / 0.31 / 3600));
      }
    },
    gameover() {
      console.log("gameover gammmmeeee");
      this.$emit("gameover");
      this.available = false;
      document.body.removeEventListener("keyup", this.detectHandler);
    },

    gamestart() {
      this.$store.commit("newGame");
      this.$refs.timer.reset();
      this.$refs.countdown.start();
      this.$refs.popup.start();
    },
    clearFake() {
      console.log("clear faker");
      if (this.fakeInterval != false) clearInterval(this.fakeInterval);
      this.fakeInterval = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.game {
  .game__countdown {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .game__map {
    height: 80vh;
    overflow: hidden;
  }
  .game__popup {
    width: 100%;
    height: 80vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 49;
  }
  .game__infos {
    height: 18vh;
    .game__infos__dossard {
      height: 5vh;
    }
    .game__infos__details {
      height: 15vh;
      .game__infos__details__single {
        width: 25%;
        div {
          height: 100%;
        }
      }
    }
  }
}
</style>

<template>
  <div class="game panel">
    <div class="game__countdown">
      <CountDownComponent ref="countdown" @countdownend="countdownend()" />
    </div>
    <div class="game__map">
      <MapComponent ref="map" />
    </div>
    <div class="game__popup">
      <PopupComponent ref="popup" />
    </div>
    <div class="game__infos">
      <div
        class="game__infos__dossard flex justify-center items-center bg-grey color-light"
      >
        <DossardComponent ref="dossard" />
      </div>
      <ul
        class="game__infos__details flex items-stretch justify-between bg-blue"
      >
        <li class="game__infos__details__single">
          <MiniMapComponent ref="minimap" />
        </li>
        <li class="game__infos__details__single">
          <FlagComponent ref="flag" />
        </li>
        <!-- <li class="game__infos__details__single">
          <SpeedComponent ref="speed" />
        </li> -->
        <li class="game__infos__details__single">
          <TimerComponent ref="timer" @timerend="gameover()" />
        </li>
      </ul>
    </div>
  </div>
</template>
