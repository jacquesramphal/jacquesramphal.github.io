<template>
  <div id="textdefault">
  <!-- add "label for" references? -->
    <h6 tabIndex="0" class="subtle" v-if="eyebrow" v-text="eyebrow" />
    <h3 tabIndex="0" v-if="header" v-text="header" />
    <p tabIndex="0" v-if="details" v-text="details" />

    <!-- <MyButton 
      text="This is Button Text" 
      class="btn-primary"
      /> -->
  </div>
</template>

<script>

export default {
  name: "TextDefault",
  components: {
    /* MyButton, */
  },
  props: {
    eyebrow: {
      type: String,
      required: false,
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
    route: {
      type: String,
      default: "google.com",
    }
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
  margin: 0 0 0.5em 0;
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
