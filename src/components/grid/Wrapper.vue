<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "Wrapper",
  props: {},
};
</script>

<style lang="sass" scoped>
div
  overflow: hidden
  padding-bottom: var(--spacing-lg)
  @media only screen and (min-width: 740px)
    padding-bottom: none
  @media only screen and (min-width: 1201px)
    padding-bottom: none

</style>
