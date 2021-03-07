<template>
  <div id="textdefault">
    <h6 class="">{{ eyebrow }}</h6>
    <h3>{{ header }}</h3>
    <p>{{ details }}</p>
    <!-- <MyButton title="test" /> -->
  </div>
</template>

<script>
// import MyButton from "@/components/MyButton.vue";

export default {
  name: "TextDefault",
  components: {
    // MyButton,
  },
  props: {
    eyebrow: {
      type: String,
      default: "Eyebrow",
    },
    header: {
      type: String,
      default: "Header",
    },
    details: {
      type: String,
      default:
        "Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet.",
    },
  },
};
</script>

<style scoped>
* {
  color: inherit;
}
#textdefault {
/*  background: var(--color-xlight); */
  grid-column: 1 / 4;
}
h6 {
  margin-bottom: 1em;
}
h3 {
  margin: 0 0 .5em 0;
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  #textdefault {
    grid-column: auto;
  }
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    #textdefault {
      grid-column: auto;
    }
  }
}
</style>
