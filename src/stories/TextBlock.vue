<template>
    <div id="textblock" :class="classes">
      <h6 tabIndex="0" class="subtle" v-if="eyebrow" v-text="eyebrow" />
      <h3 tabIndex="0" v-if="header" v-text="header" />
      <h4 tabIndex="0" v-if="header4" v-text="header4" />
      <h5 tabIndex="0" v-if="header5" v-text="header5" />
      <p id="details" tabIndex="0" v-if="details" v-text="details" />
  
      <TextLink v-if="route" :label="`${cta}`" :route="`${route}`" />
      <TextLink v-if="link" :label="`${cta}`" :link="`${link}`" />
      <MyButton
        id="btn"
        v-if="btnroute"
        :label="`${cta}`"
        :route="btnroute"
        secondary
        size="large"
      />
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
      clamped: {
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
      btnroute: {
        type: String,
        default: "",
      },
      link: {
        default: "",
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
  
          "textblock--clamped": this.clamped,
          "textblock--normal": !this.clamped,
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
  .textblock--clamped p {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .line-clamp {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  #btn {
    display: inline-block;
    margin-top: var(--spacing-sm);
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
  