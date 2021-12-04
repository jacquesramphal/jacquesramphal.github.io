<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "PageWrapper",
  props: {},
};
</script>

<style lang="sass" scoped>
div
  overflow: hidden
  padding-bottom: var(--spacing-lg) !important
  @media only screen and (min-width: 740px)
    padding-bottom: none !important
  @media only screen and (min-width: 1201px)
    padding-bottom: none !important

</style>
