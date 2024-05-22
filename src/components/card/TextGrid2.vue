<template>
  <div class="">
    <GridContainer class="grid-parent">
      <span id="values">
        <ul tabIndex="0">
          <li class="label subtle"><p v-if="label1" v-text="label1" /></li>
          <li class="value"><p v-if="value1" v-text="value1" /></li>
        </ul>
        <ul tabIndex="0">
          <li class="label subtle"><p v-if="label2" v-text="label2" /></li>
          <li class="value"><p v-if="value2" v-text="value2" /></li>
        </ul>
        <ul tabIndex="0">
          <li class="label subtle"><p v-if="label3" v-text="label3" /></li>
          <li class="value"><p v-if="value3" v-text="value3" /></li>
        </ul>
      </span>
      <span id="info">
        <TextBlock
          left
          eyebrow=""
          as="h3"
          :title="`${subtitle}`"
          :description="`${description}`"
        />
        <!-- <p
          style="font-size: var(--font-md)"
          tabIndex="0"
          v-html="description"
      /> -->
      </span>
    </GridContainer>
  </div>
</template>

<script>
import GridContainer from "../grid/GridContainer.vue";
import TextBlock from "../text/TextBlock/TextBlock.vue";

export default {
  name: "TextGrid2",
  components: {
    GridContainer,
    TextBlock,
  },
  props: {
    label1: {
      type: String,
      default: "label1",
      required: "true",
    },
    label2: {
      type: String,
      default: "label2",
      required: "true",
    },
    label3: {
      type: String,
      default: "label2",
      required: "true",
    },
    value1: {
      type: String,
      default: "value1",
      required: "true",
    },
    value2: {
      type: String,
      default: "value2",
      required: "true",
    },
    value3: {
      type: String,
      default: "value3",
      required: "true",
    },
    subtitle: {
      type: String,
      default: "Placeholder Subtitle",
    },
    description: {
      type: String,
      default:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
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
}*/
/* #description {
  block-size: 100vh;
} */
#values {
  grid-column: 1 / 4;
}
#info {
  grid-column: 1 / 4;
  padding: 0;
}

#info > h4 {
  margin-block-end: 0.8em !important;
}
ul {
  margin-block-end: 2rem;
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 768px) {
  #values {
    grid-column: 1 / 1;
  }
  #info {
    grid-column: 1 / 4;
  }
  h4 {
    margin-block-start: -1rem;
  }

  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    #values {
      grid-row: 1 / 3;
    }
    #info {
      grid-column: 2 / 4;
    }
  }
}
</style>
