<script>
import gsap from "gsap";
import { mapState } from "vuex";

export default {
  name: "ResetComponent",
  data() {
    return {
      valid: false,
    };
  },
  computed: {
    ...mapState(["distance", "dossard", "country", "popup", "bestscores"]),
  },
  mounted() {
    this.$refs.hidden.addEventListener("click", (e) => {
      if (e.detail === 3) {
        this.show();
        setTimeout(() => (this.valid = true), 1000);
      }
    });
    this.$refs.panel.addEventListener("click", (e) => {
      if (e.target !== e.currentTarget || !this.valid) return;
      this.valid = false;
      this.hide();
    });
    this.$refs.cancel.addEventListener("click", () => {
      if (!this.valid) return;
      this.valid = false;
      this.hide();
    });
    this.$refs.reset.addEventListener("click", () => {
      if (!this.valid) return;
      this.valid = false;
      this.$emit("reset");
      this.$store.commit("reset");
      this.hide();
    });
    this.$refs.gameover.addEventListener("click", () => {
      if (!this.valid) return;
      this.valid = false;
      this.$emit("gameover");
      this.hide();
    });
  },
  methods: {
    show() {
      gsap.to(this.$refs.panel, { autoAlpha: 1, duration: 1 });
    },
    hide() {
      gsap.to(this.$refs.panel, { autoAlpha: 0, duration: 1 });
    },
  },
};
</script>

<style lang="scss" scoped>
.reset {
  p,
  button {
    font-size: 1rem;
  }
  .reset__hidden {
    width: 20%;
    height: 20%;
    position: fixed;
    top: 0;
    right: 0;
  }
  .reset__panel {
    opacity: 0;
    visibility: hidden;
    background: rgba(0, 0, 0, 0.5);
    .reset__panel__content {
      background: white;
      max-width: 600px;
    }
  }
  button {
    padding: 1em;
    margin: 1em;
    border-radius: 1em;
  }
}
</style>

<template>
  <div class="reset">
    <div ref="hidden" class="reset__hidden">&nbsp;</div>
    <div
      ref="panel"
      class="reset__panel panel flex justify-center items-center"
    >
      <div class="reset__panel__content p-5 text-center">
        <p>Êtes vous sûr(e) de vouloir quitter la course ?</p>
        <p class="flex">
          <button class="bg-orange color-light" ref="cancel">Annuler</button>
          <button class="bg-brown color-light" ref="reset">
            Recommencer le parcours
          </button>
          <button class="bg-green color-light" ref="gameover">
            Nouvelle course
          </button>
        </p>
      </div>
    </div>
  </div>
</template>
