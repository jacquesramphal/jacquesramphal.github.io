<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script>
export default {
  name: "GridContainer",
  props: {
    tight: {
      type: Boolean,
      default: false,
    },
    fullvw: {
      type: Boolean,
      default: false,
    },
    fullvh: {
      type: Boolean,
      default: false,
    },
    maxvw: {
      type: Boolean,
      default: false,
    },
    overflowVisible: {
      type: Boolean,
      default: false,
    },
    full: {
      type: Boolean,
      default: false,
    },
    noBottom: {
      type: Boolean,
      default: false,
    },
    // From 768 up, renders the container as an inset card — an outer margin plus
    // a radius, instead of a band running edge to edge. The margin is subtracted
    // back out of the padding, so the distance from viewport edge to content is
    // unchanged and the card's contents still line up with every other section
    // on the page. Tune the trade with `--inset-gap` on the element.
    //
    // Below 768 this is a no-op: the band stays full-bleed on its default
    // padding, since the mobile gutter is too narrow to split.
    inset: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        "container-spacing": true,
        "container-spacing--inset": this.inset,
        "container-spacing--tight": this.tight,
        "container-spacing--fullvw": this.fullvw,
        "container-spacing--maxvw": this.maxvw,
        "container-spacing--fullvh": this.fullvh,
        "container-spacing--overflow-visible": this.overflowVisible,
        "container-spacing--full": this.full,
        "container-spacing--no-bottom": this.noBottom,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.container-spacing {
  inline-size: 100%;
  inline-size: -moz-available;
  inline-size: -webkit-fill-available;
  inline-size: stretch;
  position: relative;
  padding: var(--spacing-sm) !important;
  display: grid;
  grid-template-columns: 1;
  block-size: auto;
  margin-inline-start: auto;
  margin-inline-end: auto;
  // max-width: 1440px;
  // max-width: 1680px;
  overflow: hidden;

  @media only screen and (min-width: 768px) {
    padding: var(--spacing-lg)!important;
  }
  @media only screen and (min-width: 1201px) {
    padding: var(--spacing-lg) var(--spacing-xl) !important;
  }
  // @media only screen and (min-width: 1201px) {
  //   padding: var(--spacing-lg) var(--spacing-xl) !important;
  // }

  &--tight {
    @media only screen and (min-width: 768px) {
      padding: var(--spacing-md) !important;
    }
    @media only screen and (min-width: 1201px) {
      padding: var(--spacing-md) !important;
    }
  }

  &--fullvw {
    padding: 0 !important;
    margin-inline: 0 !important;
    width: 100vw !important;
    max-width: 100vw !important;
    // span {
    //   border-radius: none !important;
    // }
    // .bg {
    //   border-radius: 0 !important;
    // }
  }

  &--fullvh {
    min-block-size: 468px;
    block-size: 100vh !important;
    align-items: center !important;
  }
  &--maxvw {
    max-width: 86.4rem !important;
    float: none;
    margin-inline-start: auto;
    margin-inline-end: auto;
  }

  &--overflow-visible {
    overflow: visible !important;
  }

  // Inset card. The invariant from 768 up: margin + padding equals the padding
  // this container would otherwise have, so pulling the edges in never shifts
  // the content — only --inset-gap moves between the two sides of that sum.
  //
  // Mobile deliberately opts out and stays a full-bleed band. There is only
  // spacing-sm (2.4rem) of gutter to divide, so an inset would leave too little
  // inside, and a radius with no margin puts the corners on the viewport edge
  // where they read as a mistake. Inheriting the container's default padding
  // also lands the band at exactly the height the inset version had (its margin
  // plus its reduced padding summed to the same spacing-sm), so the page's
  // vertical rhythm is unchanged either way.
  //
  // inline-size: auto rather than the stretch/fill-available stack above — a
  // block element at auto width absorbs its own margins exactly, where a
  // percentage width plus margin would overflow if `stretch` isn't supported.
  &--inset {
    @media only screen and (min-width: 768px) {
      --inset-gap: var(--spacing-md);

      inline-size: auto !important;
      margin: var(--inset-gap) !important;
      border-radius: var(--spacing-xs);
      padding: calc(var(--spacing-lg) - var(--inset-gap)) !important;
    }

    @media only screen and (min-width: 1201px) {
      padding: calc(var(--spacing-lg) - var(--inset-gap))
        calc(var(--spacing-xl) - var(--inset-gap)) !important;
    }
  }

  &--full {
    padding-inline: 0 !important;
  }

  &--no-bottom {
    // Bottom-axis sibling of --full: zeros only padding-block-end at every breakpoint,
    // leaving inline padding, margins, and grid gaps intact.
    padding-block-end: 0 !important;
  }
}
</style>
