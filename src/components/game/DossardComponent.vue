<script>
import { mapState } from "vuex";

export default {
  name: "DossardComponent",
  computed: {
    fixed() {
      return (v) => {
        return v.toFixed(2);
      };
    },
    ...mapState(["dossard", "currentDistance"]),
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
<template>
  <div class="flex justify-between w-full px-6">
    <p class="color-light">{{ fixed(currentDistance) }}km</p>
    <p class="color-light balmy">Dossard {{ dossard }}</p>
  </div>
</template>
