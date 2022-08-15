<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "GridWrapper",
  props: {},
};
</script>

<style lang="sass" scoped>
div
  overflow: hidden
  @media only screen and (min-width: 740px)
  @media only screen and (min-width: 1201px)
</style>
