<template>
  <div>
    <div ref="hidden" id="hidden">&nbsp;</div>
  </div>
</template>

<script>
export default {
  name: "ResetComponent",
  mounted() {
    this.$refs.hidden.addEventListener("click", (evt) => {
      if (evt.detail === 3) {
        alert("triple click!");
      }
    });
  },
};
</script>

<style scoped>
#hidden {
  width: 20%;
  height: 20%;
  position: fixed;
  background: blue;
  top: 0;
  right: 0;
}
</style>
