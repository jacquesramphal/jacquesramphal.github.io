<template>
  <div id="textdefault">
    <h6 tabIndex="0" class="subtle" v-if="eyebrow" v-text="eyebrow" />
    <h2 tabIndex="0" v-if="header" v-text="header" />
    <p tabIndex="0" v-if="details" v-text="details" />
  </div>
</template>

<script>
export default {
  name: "TextDefault",
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
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  color: inherit;
}
#textdefault {
  grid-column: 1 / 4;
  @media only screen and (min-width: 740px) {
    grid-column: auto;
  }
}
h6 {
  margin-bottom: 1em;
}
h3 {
  margin: 0 0 0.5em 0;
}
</style>
