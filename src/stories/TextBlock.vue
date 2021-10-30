<template>
  <div id="textblock" :class="classes">
    <h6 tabIndex="0" class="subtle">{{ eyebrow }}</h6>
    <h3 tabIndex="0">{{ header }}</h3>
    <p tabIndex="0">{{ details }}</p>
  </div>
</template>

<script>
export default {
  name: "text-block",

  props: {
    eyebrow: {
      type: String,
      default: "Eyebrow",
      required: false,

    },
    header: {
      type: String,
      default: "Header",
      required: false,

    },
    details: {
      type: String,
      default: "Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet.",
          required: false,

    },
    left: {
      type: Boolean,
      default: false,
    },
    align: {
      type: String,
      default: "left",
      validator: function (value) {
        return ["center", "left"].indexOf(value) !== -1;
      },
    },
  },

  computed: {
    classes() {
      return {
        "storybook-textblock": true,
        "storybook-textblock--left": this.left,
        "storybook-textblock--center": !this.left,

      };
    },
  },
};
</script>
<style scoped>
@import "../assets/styles/all.css";

* {
  color: inherit;
}
.storybook-textblock {
  grid-column: 1 / 4;
}

h6 {
  margin-bottom: 1em;
}
h3 {
  margin: 0 0 0.5em 0;
}
.storybook-textblock--left {
text-align: left;
}
.storybook-textblock--center {
text-align: center;

}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
.storybook-textblock {
    grid-column: auto;
  }
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
.storybook-textblock {
      grid-column: auto;
    }
  }
}
</style>


