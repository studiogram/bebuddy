<script>
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin);

export default {
  name: "TimerComponent",
  data() {
    return {
      time: 240,
      update: 5,
    };
  },
  mounted() {
    this.setTimelines();
  },
  methods: {
    reset() {
      this.circleTl.seek(0);
    },
    start() {
      this.circleTl.restart();
    },
    setTimelines() {
      this.circleTl = gsap
        .timeline({
          paused: true,
          onComplete: () => {
            this.$emit("timerend");
          },
        })
        .set(this.$refs.circle, { stroke: "#FED200" })
        .fromTo(
          this.$refs.circle,
          { drawSVG: "0% 0%", rotation: -90, transformOrigin: "center center" },
          { drawSVG: "0% 100%", duration: this.time, ease: "none" }
        )
        .to(this.$refs.circle, { stroke: "#E1751D", duration: 0.25 }, "-=5");
    },
  },
};
</script>

<style lang="scss" scoped>
.timer {
  circle {
    fill: none;
    stroke-width: 46px;
  }
}
</style>

<template>
  <div class="timer flex items-center">
    <svg
      ref="timer"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 201 201"
      xml:space="preserve"
    >
      <path
        class="fill-light"
        d="m167.6 52.1-1.4-1.4c-5.1-5.1-13.5-5.1-18.6 0l-7.4 7.4c-7.7-6-16.8-10.4-26.6-12.6V33.2c0-7.3-5.9-13.2-13.2-13.2h-2c-7.3 0-13.2 5.9-13.2 13.2V45c-31.7 6.1-55.6 33.9-55.6 67.3 0 37.9 30.7 68.6 68.6 68.6s68.6-30.7 68.6-68.6c0-11.8-3-22.9-8.2-32.6l9-9c5.1-5.1 5.1-13.4 0-18.6zM98.2 170c-31.8 0-57.6-25.8-57.6-57.6s25.8-57.6 57.6-57.6 57.6 25.8 57.6 57.6c0 31.7-25.8 57.6-57.6 57.6z"
      />
      <circle ref="circle" class="stroke-yellow" cx="98.7" cy="112.1" r="23" />
    </svg>
  </div>
</template>
