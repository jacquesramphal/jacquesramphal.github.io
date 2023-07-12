<template>
  <div class="grid-parent">
    <slot />
  </div>
</template>

<script>
export default {
  name: "GridParent",
  props: {
    // tight: {
    //   type: Boolean,
    //   default: false,
    // },
    // fullvw: {
    //   type: Boolean,
    //   default: false,
    // },
    // fullvh: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  // computed: {
  //   classes() {
  //     return {
  //       "container-spacing": true,
  //       "container-spacing--tight": this.tight,
  //       "container-spacing--normal": !this.tight,
  //       "container-spacing--fullvw": this.fullvw,
  //       "container-spacing--fullvh": this.fullvh,
  //     };
  //   },
  // },
};
</script>

<style lang="scss" scoped>

</style>
