<script>
import { mapState } from "vuex";

export default {
  name: "DossardComponent",
  computed: {
    ...mapState(["dossard", "currentDistance"]),
  },
  methods: {
    reset() {
      this.currentDistance = 0;
    },
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <div class="flex justify-between w-full px-6">
    <p class="color-light">{{ currentDistance.toFixed(2) }}km</p>
    <p class="color-light balmy">Dossard {{ dossard }}</p>
  </div>
</template>
