<script>
import { mapState } from "vuex";
import gsap from "gsap";
import popupsData from "@/datas/popups.json";

export default {
  name: "PopupComponent",
  data() {
    return {
      popups: popupsData,
    };
  },
  computed: {
    ...mapState(["popup"]),
  },
  mounted() {
    this.popupTl = gsap
      .timeline({ paused: true })
      .fromTo(this.$refs.popup, { scale: 0 }, { scale: 1, duration: 0.5 })
      .fromTo(
        this.$refs.popup,
        { scale: 1 },
        { scale: 0, duration: 0.5 },
        "+=3"
      );
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === "incrementPopup") this.popupTl.restart();
    });
  },
  beforeUnmount() {
    this.unsubscribe();
  },
  methods: {
    start() {
      gsap.set(this.$refs.popup, { scale: 0 });
    },
  },
};
</script>

<style lang="scss" scoped>
.popups {
  img {
    width: 600px;
  }
}
</style>

<template>
  <div class="popups h-full flex items-center justify-center">
    <img
      ref="popup"
      :src="require(`@/assets/popups/${popups[popup].img}.png`)"
      alt="Popup"
    />
  </div>
</template>
