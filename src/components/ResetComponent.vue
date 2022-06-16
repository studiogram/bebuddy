<script>
import gsap from "gsap";
// import { mapState } from "vuex";

export default {
  name: "ResetComponent",
  data() {
    return {
      valid: false,
    };
  },
  computed: {
    ratio: {
      get() {
        return this.$store.state.ratio;
      },
      set(value) {
        this.$store.commit("updateRatio", value);
      },
    },
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

    this.$refs.moins.addEventListener("click", () => {
      this.$store.commit("decrementRatio");
    });

    this.$refs.plus.addEventListener("click", () => {
      this.$store.commit("incrementRatio");
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
      max-width: 650px;
    }
    .reset__panel__content__ratio {
      text-align: center;
      line-height: 50px;
      font-size: 2.5em;
      span {
        width: 50px;
        height: 50px;
      }
      input {
        text-align: center;
        width: calc(100% - 100px);
        height: 50px;
        -moz-appearance: textfield;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
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
        <p class="flex justify-center">
          <button class="bg-orange color-light" ref="cancel">Annuler</button>
          <button class="bg-brown color-light" ref="reset">
            Tout recommencer
          </button>
          <button class="bg-green color-light" ref="gameover">
            Terminer la course
          </button>
        </p>
        <p class="reset__panel__content__ratio flex mt-10">
          <span ref="moins" class="border-orange bg-orange color-light">-</span>
          <input class="border-orange" type="number" v-model="ratio" />
          <span ref="plus" class="border-orange bg-orange color-light">+</span>
        </p>
      </div>
    </div>
  </div>
</template>
