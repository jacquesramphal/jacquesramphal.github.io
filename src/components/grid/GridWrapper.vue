<template>
  <div class="grid-wrapper" :style="wrapperStyles">
    <slot />
    <div class="motif" v-if="motif1" />
    <div class="motif" v-else-if="motif2" />
  </div>
</template>

<script>
export default {
  name: "GridWrapper",
  props: {
    motif1: Boolean,
    motif2: Boolean,
  },
  computed: {
    wrapperStyles() {
      return {
        overflow: "hidden",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.grid-wrapper {
  position: relative;
}

.motif {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  opacity: 0.2;
}

.motif::before {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0.2;
}

.motif1 {
  background-image: url("../../assets/images/splash.svg");
  background-color: red;
}

.motif2 {
  // background-image: url("/path/to/motif2.svg");
}
</style>
