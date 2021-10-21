<template>
  <div id="stats" class="container">
    <div id="grid-parent" class="grid-parent container">
      <TextValue class="grid-card" label="Git Commits" value="200+" details="" />
      <TextValue class="grid-card"  label="Years Experience" value="8+" details="" />
      <TextValue class="grid-card"  label="Mindful Breaks" value="400+" details="" />
      <TextValue class="grid-card"  label="Label" value="0" details="" />
    </div>
  </div>
</template>
<script>
import TextValue from "@/components/text/TextValue.vue";

export default {
  name: "Stats",
  components: {
    TextValue,
  },
  props: {
    value: {
      type: String,
      default: "Detail Card",
    },
    label: {
      type: String,
      default: "label",
    },
  },
};
</script>

<style scoped>
* {
  color: inherit;
}
#stats {
  background-color: var(--bg-darker)
}


/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {

  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    .grid-parent {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
