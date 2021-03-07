<template>
  <div id="details" class="offblack">
      <div class="grid-parent container">
        <h3 id="section-header" class="">{{ header }}</h3>
        <TextDefault
          eyebrow="Subsection"
          header=""
          details="Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet. Lorem ipsum doler optima sit amet."
        />
        <TextDefault
          eyebrow="Skills"
          header="" 
          details="Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet. Lorem ipsum doler optima sit amet."
        />
        <TextDefault
          eyebrow="Interests"
          header=""
          details="Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet. Lorem ipsum doler optima sit amet."
        />
        <TextDefault
          eyebrow="Goals"
          header=""
          details="Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet. Lorem ipsum doler optima sit amet."
        />
      </div>
    </div>
</template>

<script>
import TextDefault from "@/components/text/TextDefault.vue";

export default {
  name: "DetailCard",
  components: {
    TextDefault,
  },
  props: {
    header: {
      type: String,
      default: "Detail Card",
    },
    eyebrow: {
      type: String,
      default: "Eyebrow",
    },
    },
  

};
</script>

<style scoped>

* {
  color: white !important;
}
#section-header {
  grid-column: 1 / 4;
}
  #textdefault {
    grid-column: 1 / 4;
    padding: 1em 0 0 0;
  }
  #textdefault:first-child {
    background: yellow;
  }
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
#section-header {
  grid-column: 1 / 1;
}
 #textdefault {
    grid-column: auto;
    padding: 0 2.8em 2.8em 0;
  }

  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
  #section-header {
  grid-row: 1 / 3;

}
}}

</style>
