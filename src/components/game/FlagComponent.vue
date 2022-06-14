<script>
import { mapState } from "vuex";
import flagsData from "@/datas/flags.json";

export default {
  name: "FlagComponent",
  data() {
    return {
      flags: flagsData,
    };
  },
  computed: {
    ...mapState(["country"]),
  },
  mounted() {},
};
</script>

<style scoped></style>

<template>
  <div class="p-8 flex items-center">
    <img
      class="rounded-lg"
      :src="require(`@/assets/flags/${flags[country].img}.jpg`)"
      alt="Country flag"
    />
  </div>
</template>
