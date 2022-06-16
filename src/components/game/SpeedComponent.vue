<script>
import gsap from "gsap";

export default {
  name: "SpeedComponent",
  data() {
    return {
      time: new Date(),
      angle: 0,
      new: false,
      steps: [
        { time: 150, angle: 190 },
        { time: 200, angle: 135 },
        { time: 250, angle: 90 },
        { time: 300, angle: 45 },
        { time: 350, angle: 0 },
      ],
    };
  },
  mounted() {
    gsap.set(this.$refs.aiguille, { transformOrigin: "center center" });
  },
  methods: {
    update() {
      let end = new Date();
      let timeDiff = end - this.time;
      let angle = this.steps.reduce((previous, key) => {
        return timeDiff > key.time ? key.angle : previous;
      }, 0);
      if (angle != this.angle) {
        this.anim(angle);
        this.angle = angle;
      }
      this.time = end;
      this.new = true;
      setTimeout(() => {
        if (this.new == false) this.update();
      }, 2000);
    },
    anim(angle) {
      // gsap.set(".speed-aiguille", { autoAlpha: 0 });
      // gsap.set(this.$refs[`speed-${angle}`], { autoAlpha: 1 });

      gsap.set(this.$refs.aiguille, {
        rotation: angle,
        // transition: 0.1,
        ease: "none",
      });
    },
    start() {
      this.anim(0);
    },
  },
};
</script>

<style scoped></style>

<template>
  <div class="flex items-center">
    <!-- <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      viewBox="0 0 201 201"
      xml:space="preserve"
    >
      <path
        d="m129 88.8 19.6-19.6c-12.3-12.3-29.3-19.9-48.1-19.9V77c11.1 0 21.2 4.5 28.5 11.8z"
        fill="#fed000"
      />
      <path
        d="M72 88.8 52.5 69.2c-12.3 12.3-19.9 29.3-19.9 48.1h27.7c0-11.2 4.5-21.3 11.7-28.5z"
        fill="#008138"
      />
      <path
        d="M140.8 117.2h27.7c0-18.8-7.6-35.8-19.9-48.1L129 88.8c7.3 7.2 11.8 17.3 11.8 28.4z"
        fill="#e07318"
      />
      <path
        d="M100.5 77V49.3c-18.8 0-35.8 7.6-48.1 19.9L72 88.8C79.3 81.5 89.4 77 100.5 77z"
        fill="#3fae5f"
      />
      <g ref="aiguille">
        <path
          class="fill-blue"
          d="m104.1 128.9 35-11.3-34.8-12.5c-1.3-.5-2.7-.7-4.2-.7-6.9 0-12.6 5.6-12.6 12.6s5.6 12.6 12.6 12.6c1.4 0 2.8-.2 4-.7z"
        />
        <path
          d="m96.1 105.1-35 11.3L96 128.9c1.3.5 2.7.7 4.2.7 6.9 0 12.6-5.6 12.6-12.6s-5.6-12.6-12.6-12.6c-1.5 0-2.8.3-4.1.7z"
          class="fill-light"
        />
        <circle class="fill-blue" cx="100.1" cy="117" r="6.3" />
      </g>
    </svg> -->

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 201 201"
      xml:space="preserve"
    >
      <g>
        <path
          d="M134.9 83.7 158.6 60c-14.9-14.9-35.4-24-58.1-24v33.5c13.4 0 25.6 5.4 34.4 14.2z"
          fill="#fdd000"
        />
        <path
          d="M66.1 83.7 42.4 60.1c-14.9 14.9-24 35.4-24 58.1h33.5c0-13.5 5.4-25.7 14.2-34.5z"
          fill="#008038"
        />
        <path
          d="M149.1 118.1h33.5c0-22.7-9.2-43.2-24-58.1l-23.7 23.7c8.8 8.8 14.2 21 14.2 34.4z"
          fill="#df7318"
        />
        <path
          d="M100.5 69.5V36c-22.7 0-43.2 9.2-58.1 24l23.7 23.7c8.8-8.8 21-14.2 34.4-14.2z"
          fill="#40ad5f"
        />
      </g>
      <g ref="aiguille" class="speed-aiguille">
        <path
          class="fill-blue"
          d="M104.9 132.3v.1l42.3-13.7-42.1-15.1c-1.6-.6-3.3-.9-5-.9-8.4 0-15.2 6.8-15.2 15.2s6.8 15.2 15.2 15.2c1.7 0 3.3-.3 4.8-.8z"
        />
        <path
          class="fill-light"
          d="M95.2 103.5v-.1L53 117.1l42.1 15.1c1.6.6 3.3.9 5 .9 8.4 0 15.2-6.8 15.2-15.2s-6.8-15.2-15.2-15.2c-1.7 0-3.3.3-4.9.8z"
        />
        <circle class="fill-blue" cx="100.1" cy="117.9" r="7.6" />
      </g>
      <!-- <g ref="speed-45" class="speed-aiguille">
        <path
          class="fill-blue"
          d="m93.3 131.5 39.5 20.3-19.1-40.5c-.7-1.5-1.7-2.9-2.9-4.2-5.9-5.9-15.6-5.9-21.5 0s-5.9 15.6 0 21.5c1.2 1.2 2.6 2.2 4 2.9z"
        />
        <path
          class="fill-light"
          d="M106.8 104.3 67.3 84l19.1 40.5c.7 1.5 1.7 2.9 2.9 4.2 5.9 5.9 15.6 5.9 21.5 0s5.9-15.6 0-21.5c-1.2-1.3-2.5-2.2-4-2.9z"
        />
        <circle class="fill-blue" cx="100.1" cy="117.9" r="7.6" />
      </g>
      <g ref="speed-90" class="speed-aiguille">
        <path
          class="fill-blue"
          d="M85.7 122.7h-.1L99.3 165l15.1-42.1c.6-1.6.9-3.3.9-5 0-8.4-6.8-15.2-15.2-15.2s-15.2 6.8-15.2 15.2c0 1.7.3 3.3.8 4.8z"
        />
        <path
          class="fill-light"
          d="M114.5 113h.1l-13.7-42.3-15.1 42.1c-.6 1.6-.9 3.3-.9 5 0 8.4 6.8 15.2 15.2 15.2s15.2-6.8 15.2-15.2c0-1.6-.3-3.3-.8-4.8z"
        />
        <circle class="fill-blue" cx="100.1" cy="117.9" r="7.6" />
      </g>
      <g ref="speed-135" class="speed-aiguille">
        <path
          class="fill-blue"
          d="m86.5 111.1-20.3 39.5 40.5-19.1c1.5-.7 2.9-1.7 4.2-2.9 5.9-5.9 5.9-15.6 0-21.5s-15.6-5.9-21.5 0c-1.3 1.2-2.2 2.6-2.9 4z"
        />
        <path
          class="fill-light"
          d="M113.7 124.6 134 85.1l-40.5 19.1c-1.5.7-2.9 1.7-4.2 2.9-5.9 5.9-5.9 15.6 0 21.5s15.6 5.9 21.5 0c1.2-1.2 2.2-2.5 2.9-4z"
        />
        <circle class="fill-blue" cx="100.1" cy="117.9" r="7.6" />
      </g>
      <g ref="speed-180" class="speed-aiguille">
        <path
          class="fill-blue"
          d="M95.2 103.5v-.1L53 117.1l42.1 15.1c1.6.6 3.3.9 5 .9 8.4 0 15.2-6.8 15.2-15.2s-6.8-15.2-15.2-15.2c-1.7 0-3.3.3-4.9.8z"
        />
        <path
          class="fill-light"
          d="M104.9 132.3v.1l42.3-13.7-42.1-15.1c-1.6-.6-3.3-.9-5-.9-8.4 0-15.2 6.8-15.2 15.2s6.8 15.2 15.2 15.2c1.7 0 3.3-.3 4.8-.8z"
        />
        <circle class="fill-blue" cx="100.1" cy="117.9" r="7.6" />
      </g> -->
    </svg>
  </div>
</template>
