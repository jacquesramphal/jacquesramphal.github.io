<template>
  <GridWrapper class="">
    <GridContainer>
      <GridParent tight>
        
        <TextBlock
          id="section-title"
          tabIndex="0"
          :as="`${as}`"
          :title="`${title}`"
          eyebrow=""
          :description="`${description}`"
        />
        <TextBlock
          class="subsection"
          as="h4"
          :title="`${eyebrow1}`"
          eyebrow=""
          :description="`${detail1}`"
        />
        <TextBlock
          class="subsection"
          v-if="detail2"
          as="h4"
          :title="`${eyebrow2}`"
          eyebrow=""
          :description="`${detail2}`"
        />
        <TextBlock
          class="subsection"
          v-if="detail3"
          as="h4"
          :title="`${eyebrow3}`"
          eyebrow=""
          :description="`${detail3}`"
        />
        <TextBlock
          class="subsection"
          v-if="detail4"
          as="h4"
          :title="`${eyebrow4}`"
          eyebrow=""
          :description="`${detail4}`"
        />
      </GridParent>
    </GridContainer>
  </GridWrapper>
</template>

<script>
import GridParent from "../grid/GridParent.vue";
import GridContainer from "../grid/GridContainer.vue";
import GridWrapper from "../grid/GridWrapper.vue";
import TextBlock from "../text/TextBlock/TextBlock.vue";

export default {
  name: "TextGrid",
  components: {
    GridParent,
    GridContainer,
    GridWrapper,
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
    as: {
      default: "h2",
      type: String,
      required: false,
    },
    description: {
      type: String,
      default: "This is a description",
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
    },
    detail3: {
      type: String,
    },
    detail4: {
      type: String,
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
    grid-column: span 1;
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
