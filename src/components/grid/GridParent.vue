<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script>
export default {
  name: "GridParent",
  props: {
    rows: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        "grid-template": true,
        "grid-template--rows": this.rows,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.grid-template {
  display: grid;
  grid-gap: var(--spacing-sm);
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);

  @media only screen and (min-width: 740px) {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 0;
    grid-gap: var(--spacing-md);
  }
  @media only screen and (min-width: 1201px) {
    grid-template-columns: repeat(3, 1fr);
  }

  &--rows {
    display: flex;
    flex-direction: column;
  }
}
</style>
