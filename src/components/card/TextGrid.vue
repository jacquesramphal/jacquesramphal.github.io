<template>
  <div class="">
    <GridContainer class="grid-parent">
      <h2 id="section-title" tabIndex="0">
        {{ title }}
      </h2>
      <TextBlock as="h4" :title="`${eyebrow1}`" eyebrow="" :description="`${detail1}`" />
      <TextBlock as="h4" :title="`${eyebrow2}`" eyebrow="" :description="`${detail2}`" />
      <TextBlock as="h4" :title="`${eyebrow3}`" eyebrow="" :description="`${detail3}`" />
      <TextBlock as="h4" :title="`${eyebrow4}`" eyebrow="" :description="`${detail4}`" />
    </GridContainer>
  </div>
</template>

<script>
import GridContainer from "../grid/GridContainer.vue";
import TextBlock from "../TextBlock.vue";

export default {
  name: "TextGrid",
  components: {
    GridContainer,
    TextBlock,
  },
  props: {
    contentful: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: "Detail Card",
    },
    eyebrow1: {
      type: String,
      default: "Eyebrow1",
    },
    eyebrow2: {
      type: String,
      default: "Eyebrow2",
    },
    eyebrow3: {
      type: String,
      default: "Eyebrow3",
    },
    eyebrow4: {
      type: String,
      default: "Eyebrow4",
    },
    detail1: {
      type: String,
      default:
        "Detail 1. Lorem ipsum doler optima sit amet doler optima sit amet doler optima sit amet optima sit amet amet doler optima sit amet optima sit amet.",
    },
    detail2: {
      type: String,
      default:
        "Detail 2. Lorem ipsum doler optima sit amet doler optima sit amet doler optima sit amet optima sit amet amet doler optima sit amet optima sit amet.",
    },
    detail3: {
      type: String,
      default:
        "Detail 3. Lorem ipsum doler optima sit amet doler optima sit amet doler optima sit amet optima sit amet amet doler optima sit amet optima sit amet.",
    },
    detail4: {
      type: String,
      default:
        "Detail 4. Lorem ipsum doler optima sit amet doler optima sit amet doler optima sit amet optima sit amet amet doler optima sit amet optima sit amet.",
    },
  },
};
</script>

<style scoped>
* {
  color: inherit;
}
/* .container {
 padding-block-start: 4rem !important;
  padding-block-end: 9.6rem !important; 
} */
/* #description {
block-size: 100vh;
} */
#section-title {
  grid-column: 1 / 4;
}
#textblock {
  grid-column: 1 / 4;
  padding: 1em 0 0 0;
}
/* #textblock:first-child {
  background: yellow; 
} */
/* h3 {
  margin-block-start: -10px;
} */
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 768px) {
  #section-title {
    grid-column: 1 / 1;
  }
  #textblock {
    grid-column: auto;
    padding: 0 2.8em 2.8em 0;
  }
  h4 {
    margin-block-start: -1rem;
  }

  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    #section-title {
      grid-row: 1 / 3;
    }
  }
}
</style>
