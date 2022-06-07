<template>
  <div>
    <MapComponent />
    <DossardComponent />
    <FlagComponent />
    <MiniMapComponent />
    <SpeedComponent />
    <TimerComponent />
  </div>
</template>

<script>
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
  mounted() {},
};
</script>

<style scoped></style>
