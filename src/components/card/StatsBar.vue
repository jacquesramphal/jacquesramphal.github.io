<template>
  <GridWrapper id="stats" class="">
    <GridContainer class="grid-parent">
      <!--      <h3>Stats</h3> -->
      <TextValue
        class="grid-card"
        :label="`${label1}`"
        :value="`${value1}`"
        details=""
      />
      <TextValue
        class="grid-card"
        :label="`${label2}`"
        :value="`${value2}`"
        details=""
      />
      <TextValue
        class="grid-card"
        :label="`${label3}`"
        :value="`${value3}`"
        details=""
      />
    </GridContainer>
  </GridWrapper>
</template>
<script>
import TextValue from "@/components/text/TextValue.vue";



export default {
  name: "StatsBar",
  components: {
    TextValue,
    
    
  },
  props: {
    contentful: {
      type: Array,
      required: true,
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
  background: var(--bg-darker);
  /* border-top: var(--border);
  border-bottom: var(--border); */
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    .grid-parent {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
