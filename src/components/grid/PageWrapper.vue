<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "PageWrapper",
  props: {},
  mounted () {
  window.scrollTo(0, 0)
}
};
</script>

<style lang="sass" scoped>
div
  overflow: hidden
  // padding-bottom: var(--spacing-lg) !important
  @media only screen and (min-width: 740px)
    padding-bottom: 0 !important
  @media only screen and (min-width: 1201px)
    padding-bottom: 0 !important

</style>
