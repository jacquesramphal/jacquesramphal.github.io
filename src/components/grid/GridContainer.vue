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
  },
  computed: {
    classes() {
      return {
        "container-spacing": true,
        "container-spacing--tight": this.tight,
        "container-spacing--normal": !this.tight,
      };
    },
  },
};
</script>

<style lang="sass" scoped>
.container-spacing
  width: 100%
  width: -moz-available
  width: -webkit-fill-available
  width: stretch
  position: relative
  padding: var(--spacing-sm) !important
  display: grid
  grid-template-columns: 1
  height: auto
  margin-left: auto
  margin-right: auto
  max-width: 1920px
  overflow: hidden

.container-spacing--normal
  @media only screen and (min-width: 740px)
    padding: var(--spacing-lg) !important
  @media only screen and (min-width: 1201px)
    padding: var(--spacing-lg) !important

.container-spacing--tight
  @media only screen and (min-width: 740px)
    padding: var(--spacing-md) !important
  @media only screen and (min-width: 1201px)
    padding: var(--spacing-md) !important
</style>
