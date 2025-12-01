<template>
  <GridWrapper id="stats" class="">
    <GridContainer fullvw>
      <GridParent tight>
        <!--      <h2>Stats</h2> -->
        <TextValue
          class="grid-card animate glow delay-1"
          :label="`${label1}`"
          :value="`${value1}`"
          details=""
        />
        <TextValue

          class="grid-card animate glow delay-1-5"
          :label="`${label2}`"
          :value="`${value2}`"
          details=""
        />
        <TextValue

          class="grid-card animate glow delay-2"
          :label="`${label3}`"
          :value="`${value3}`"
          details=""
        />
      </GridParent>
    </GridContainer>
  </GridWrapper>
</template>
<script>
import TextValue from "../text/TextValue.vue";
import GridWrapper from "../grid/GridWrapper.vue";
import GridParent from "../grid/GridParent.vue";

export default {
  name: "TextStats",
  components: {
    TextValue,
    GridWrapper,
    GridParent,
  },
  props: {
    contentful: {
      type: Array,
      required: false,
      default: () => [],
    },
    value1: {
      type: String,
      default: "Value1",
    },
    label1: {
      type: String,
      default: "Label1",
    },
    value2: {
      type: String,
      default: "Value2",
    },
    label2: {
      type: String,
      default: "Label2",
    },
    value3: {
      type: String,
      default: "Value3",
    },
    label3: {
      type: String,
      default: "Label3",
    },
  },
};
</script>

<style scoped>
* {
  color: inherit;
}
#stats {
  /* background: var(--background-darker); */
  /* border-block-start: var(--border);
  border-block-end: var(--border); */
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 768px) {
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
  }
}
</style>
