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
</style>
