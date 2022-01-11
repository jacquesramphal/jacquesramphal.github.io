<template>
  <div id="textblock" :class="classes">
    <h6 tabIndex="0" class="subtle">{{ eyebrow }}</h6>
    <h3 tabIndex="0">{{ header }}</h3>
    <p tabIndex="0">{{ details }}</p>
    <router-link :to="`${route}`"><p>{{ cta }}</p></router-link>
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
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      required: false,
    },
    center: {
      type: Boolean,
      default: false,
      required: true,
    },
    cta: {
      type: String,
    },
    route: {
      type: String,
      default: "",
    },
  },

  computed: {
    classes() {
      return {
        "textblock-align": true,
        "textblock-align--center": this.center,
        "textblock-align--left": !this.center,
      };
    },
  },
};
</script>
<style scoped>
@import "./assets/styles/css/all.css"

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
p {
  margin: 0 0 2rem 0;
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
