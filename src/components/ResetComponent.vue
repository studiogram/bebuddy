<template>
  <div class="reset">
    <div ref="hidden" class="reset__hidden">&nbsp;</div>
    <div
      ref="panel"
      class="reset__panel panel flex justify-center items-center"
    >
      <div class="reset__panel__content p-5">
        distance: {{ distance }} dossard :{{ dossard }} country:{{
          country
        }}
        popup:{{ popup }} bestscores{{ bestscores }}
        <p>Êtes vous sûr(e) de vouloir redémarrer la course à 0 ?</p>
        <p class="flex">
          <button ref="cancel">Annuler</button>
          <button ref="reset">Valider</button>

          <button ref="plus">Ajout</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import { mapState } from "vuex";

export default {
  name: "ResetComponent",
  computed: {
    ...mapState(["distance", "dossard", "country", "popup", "bestscores"]),
  },
  mounted() {
    this.$refs.plus.addEventListener("click", () => {
      this.$store.commit("increment");
    });

    this.$refs.hidden.addEventListener("click", (e) => {
      if (e.detail === 3) this.show();
    });
    this.$refs.panel.addEventListener("click", (e) => {
      if (e.target !== e.currentTarget) return;
      this.hide();
    });
    this.$refs.cancel.addEventListener("click", () => {
      this.hide();
    });
    this.$refs.reset.addEventListener("click", () => {
      this.$store.commit("reset");
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
      max-width: 400px;
    }
  }
}
</style>
