<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script>
export default {
  name: "GridContainer",
  props: {
    tight: {
      type: Boolean,
      default: false,
    },
    fullvw: {
      type: Boolean,
      default: false,
    },
    fullvh: {
      type: Boolean,
      default: false,
    },
    maxvw: {
      type: Boolean,
      default: false,
    },
    overflowVisible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        "container-spacing": true,
        "container-spacing--tight": this.tight,
        "container-spacing--fullvw": this.fullvw,
        "container-spacing--maxvw": this.maxvw,
        "container-spacing--fullvh": this.fullvh,
        "container-spacing--overflow-visible": this.overflowVisible,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.container-spacing {
  inline-size: 100%;
  inline-size: -moz-available;
  inline-size: -webkit-fill-available;
  inline-size: stretch;
  position: relative;
  padding: var(--spacing-sm) !important;
  display: grid;
  grid-template-columns: 1;
  block-size: auto;
  margin-inline-start: auto;
  margin-inline-end: auto;
  // max-width: 1440px;
  // max-width: 1680px;
  overflow: hidden;

  @media only screen and (min-width: 768px) {
    padding: var(--spacing-lg)!important;
  }
  @media only screen and (min-width: 1201px) {
    padding: var(--spacing-lg) var(--spacing-xl) !important;
  }
  // @media only screen and (min-width: 1201px) {
  //   padding: var(--spacing-lg) var(--spacing-xl) !important;
  // }

  &--tight {
    @media only screen and (min-width: 768px) {
      padding: var(--spacing-md) !important;
    }
    @media only screen and (min-width: 1201px) {
      padding: var(--spacing-md) !important;
    }
  }

  &--fullvw {
    padding: 0 !important;
    // span {
    //   border-radius: none !important;
    // }
    // .bg {
    //   border-radius: 0 !important;
    // }
  }

  &--fullvh {
    min-block-size: 468px;
    block-size: 100vh !important;
    align-items: center !important;
  }
  &--maxvw {
    max-width: 86.4rem !important;
    float: none;
    margin-inline-start: auto;
    margin-inline-end: auto;
  }

  &--overflow-visible {
    overflow: visible !important;
  }
}
</style>
