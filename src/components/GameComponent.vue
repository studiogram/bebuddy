<template>
  <div class="game panel">
    <div class="game__map">
      distance: {{ distance }} dossard :{{ dossard }} country:{{
        country
      }}
      popup:{{ popup }} bestscores{{ bestscores }}
      <MapComponent />
    </div>
    <div class="game__infos">
      <div class="game__infos__dossard">
        <DossardComponent />
      </div>
      <ul class="game__infos__details flex items-stretch justify-evenly">
        <li class="game__infos__details__single"><FlagComponent /></li>
        <li class="game__infos__details__single"><MiniMapComponent /></li>
        <li class="game__infos__details__single"><SpeedComponent /></li>
        <li class="game__infos__details__single"><TimerComponent /></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MapComponent from "./game/MapComponent.vue";
import DossardComponent from "./game/DossardComponent.vue";
import FlagComponent from "./game/FlagComponent.vue";
import MiniMapComponent from "./game/MiniMapComponent.vue";
import SpeedComponent from "./game/SpeedComponent.vue";
import TimerComponent from "./game/TimerComponent.vue";

export default {
  name: "GameComponent",
  components: {
    MapComponent,
    DossardComponent,
    FlagComponent,
    MiniMapComponent,
    SpeedComponent,
    TimerComponent,
  },
  computed: {
    ...mapState(["distance", "dossard", "country", "popup", "bestscores"]),
  },
};
</script>

<style lang="scss" scoped>
.game {
  background: purple;
  .game__map {
    background: blue;
    height: 80vh;
  }
  .game__infos {
    background: red;
    height: 20vh;
    .game__infos__dossard {
      background: black;
      height: 5vh;
    }
    .game__infos__details {
      background: yellow;
      height: 15vh;
    }
  }
}
</style>
