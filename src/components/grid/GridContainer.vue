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
  },
  computed: {
    classes() {
      return {
        "container-spacing": true,
        "container-spacing--tight": this.tight,
        "container-spacing--fullvw": this.fullvw,
        "container-spacing--maxvw": this.maxvw,
        "container-spacing--fullvh": this.fullvh,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.container-spacing {
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  width: stretch;
  position: relative;
  padding: var(--spacing-sm) !important;
  display: grid;
  grid-template-columns: 1;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  max-width: 1920px;
  overflow: hidden;

  @media only screen and (min-width: 740px) {
    padding: var(--spacing-lg) !important;
  }
  @media only screen and (min-width: 1201px) {
    padding: var(--spacing-lg) !important;
  }

  &--tight {
    @media only screen and (min-width: 740px) {
      padding: var(--spacing-md) !important;
    }
    @media only screen and (min-width: 1201px) {
      padding: var(--spacing-md) !important;
    }
  }

  &--fullvw {
    padding: 0 !important;
  }

  &--fullvh {
    min-height: 468px;
    height: 100vh !important;
    align-items: center !important;
  }
  &--maxvw {
    max-width: 86.4rem !important;
    float: none;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
