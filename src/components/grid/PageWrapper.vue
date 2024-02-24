<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "PageWrapper",
  props: {},
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style lang="scss" scoped>
div {
  overflow: hidden;
  // padding-block-end: var(--spacing-lg) !important

  @media only screen and (min-width: 768px) {
    // padding-block-start: var(--spacing-lg) !important;
    padding-block-end: 0 !important;
  }

  @media only screen and (min-width: 1201px) {
    padding-block-end: 0 !important;
  }
}
</style>
