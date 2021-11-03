<template>
  <div id="textblock" :class="classes">
    <h6 tabIndex="0" class="subtle">{{ eyebrow }}</h6>
    <h3 tabIndex="0">{{ header }}</h3>
    <p tabIndex="0">{{ details }}</p>
  </div>
</template>

<script>
export default {
  name: "TextBlock",

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
      default:
        "Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet.",
      required: false,
    },
    left: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  computed: {
    classes() {
      return {
        "textblock-align": true,
        "textblock-align--left": this.left,
        "textblock-align--center": !this.left,
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
.textblock-align {
  grid-column: 1 / 4;
}

h6 {
  margin-bottom: 1em;
}
h3 {
  margin: 0 0 0.5em 0;
}
.textblock-align--left {
  text-align: left;
}
.textblock-align--center {
  text-align: center;
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  .textblock-align {
    grid-column: auto;
  }
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    .textblock-align {
      grid-column: auto;
    }
  }
}
</style>
