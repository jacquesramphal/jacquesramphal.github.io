<template>
  <div id="container" class="">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Container",
  props: {},
};
</script>

<style lang="sass" scoped>
#container
  width: 100%
  width: -moz-available
  width: -webkit-fill-available
  width: stretch
  position: relative
  padding: var(--spacing-sm) !important
  display: grid
  height: auto
  margin-left: auto
  margin-right: auto
  max-width: 1440px
  overflow: hidden
  @media only screen and (min-width: 740px)
    padding: var(--spacing-lg) !important
  @media only screen and (min-width: 1201px)
    padding: var(--spacing-lg) !important
</style>
