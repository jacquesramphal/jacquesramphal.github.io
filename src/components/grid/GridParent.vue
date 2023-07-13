<template>
  <div class="grid-parent">
    <slot />
  </div>
</template>

<script>
export default {
  name: "GridParent",
  props: {},
};
</script>

<style lang="scss" scoped>
.grid-parent {
  display: grid;
  grid-gap: var(--spacing-sm);
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);
}
@media only screen and (min-width: 740px) {
  .grid-parent {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 0;
    grid-gap: var(--spacing-md);
  }
}
@media only screen and (min-width: 1201px) {
  .grid-parent {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
