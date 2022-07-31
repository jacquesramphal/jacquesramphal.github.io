<template>
  <div id="textblock" :class="classes">
    <h6 tabIndex="0" class="subtle" v-if="eyebrow" v-text="eyebrow" />
    <h3 tabIndex="0" v-if="header" v-text="header" />
    <h4 tabIndex="0" v-if="header4" v-text="header4" />
    <h5 tabIndex="0" v-if="header5" v-text="header5" />
    <p tabIndex="0" v-if="details" v-text="details" />

    <TextLink v-show="route" :label="`${cta}`" :route="`${route}`" />
    <TextLink v-show="link" :label="`${cta}`" :link="`${link}`" />
    <!-- <MyButton
      v-show="btnroute"
      :label="label"
      :route="info"
      secondary
      size="large"
    /> -->
  </div>
</template>

<script>
export default {
  name: "TextBlock",

  props: {
    eyebrow: {
      type: String,
      required: false,
    },
    header: {
      type: String,
      default: "",
      required: false,
    },
    header4: {
      type: String,
      default: "",
      required: false,
    },
    header5: {
      type: String,
      default: "",
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
      default: "",
    },
    route: {
      type: String,
      default: "",
    },
    btnroute: {
      type: String,
    },
    link: {
      type: String,
    },
    label: {
      type: String,
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
* {
  color: inherit;
}
.textblock-align {
  grid-column: 1 / 4;
}
h6 {
  margin-bottom: 1em;
}
p {
  margin: 1rem 0 0 0;
}
#richlink {
  margin-top: var(--spacing-sm) !important;
}
.route {
  margin: var(--spacing-sm) 0 0 0;
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
