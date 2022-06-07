<template>
  <div>
    <svg
      id="demo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      width="1000"
      height="1000"
    >
      <circle ref="target1" r="240" stroke="#991a1a" cx="500" cy="500" />
      <circle ref="target2" r="240" stroke="#307d40" cx="500" cy="500" />
      <circle ref="target3" r="240" stroke="#304f7d" cx="500" cy="500" />
    </svg>
  </div>
</template>

<script>
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin);

export default {
  name: "TimerComponent",
  mounted() {
    console.log("yoyo");
    gsap.set("circle", {
      drawSVG: 0,
      rotation: -90,
      transformOrigin: "center center",
    });
    gsap
      .timeline({
        defaults: { duration: 1, ease: "sine.inOut" },
        repeat: -1,
        yoyo: true,
        repeatDelay: 1,
      })
      .to(this.$refs.target1, { drawSVG: "0% 23%" })
      .to(this.$refs.target2, { drawSVG: "23% 56%" }, 0)
      .to(this.$refs.target3, { drawSVG: "56% 100%" }, 0);
  },
};
</script>

<style scoped>
svg {
  width: 500px;
}
</style>
