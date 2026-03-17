<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script>
// import { gsap } from "gsap";

export default {
  name: "GridParent",
  props: {
    rows: {
      type: Boolean,
      default: false,
    },
    tight: {
      type: Boolean,
      default: false,
    },
  },
  // mounted() {
  //   this.$nextTick(function () {
  //     const children = this.$el.children;
  //     gsap.from(children, { autoAlpha: 0, stagger: 0.2, duration: 2 });
  //   });
  // },
  computed: {
    classes() {
      return {
        "grid-template": true,
        "grid-template--rows": this.rows,
        "grid-template--tight": this.tight,
      };
    },
  },
};
</script>


<style lang="scss" scoped>
// @keyframes fadeIn {
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// }
// .grid-item:nth-child(1) {
//   animation: fadeIn .5s ease-in .25s;
// }

// .grid-item:nth-child(2) {
//   animation: fadeIn 0.5s ease-in 0.75s;
// }

// .grid-item:nth-child(3) {
//   animation: fadeIn 0.5s ease-in 1s;
// }
.grid-template {
  display: grid;
  grid-gap: var(--spacing-sm);
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    margin-block-start: 0;
    grid-gap: var(--spacing-md);
  }
  @media only screen and (min-width: 1201px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--spacing-lg);

  }

  &--rows {
    display: flex;
    flex-direction: column;
  }
  &--tight {
    @media only screen and (min-width: 1201px) {
    grid-gap: var(--spacing-md);

  }
  }
}
</style>
