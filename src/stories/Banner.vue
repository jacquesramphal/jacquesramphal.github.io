<template>
  <div
    id="banner"
    :class="classes"
  >
    <div class="container">
      <nav class="">
        <h1 id="wordmark" class="">
          {{ eyebrow }}
        </h1>
      </nav>
    </div>
    <div id="" class="container">
      <div id="hero-text" class="">
        <h2
          class=""
        >
          — {{ title }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-banner",

  props: {
    eyebrow: {
      type: String,
      default: "Eyebrow",
      required: false,
    },
    title: {
      type: String,
      default: "Title",
      required: false,
    },
        base: {
      type: Boolean,
      default: false,
      
    },
  },

  computed: {
    classes() {
      return {
        "storybook-banner": true,
        "storybook-banner--base": this.base,
        "storybook-banner--background": !this.base,
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
.storybook-banner {
  display: grid;
  min-height: 320px;
  background-color: var(--bg-darker);
  
}
#hero-text {
  display: grid;
  grid-row: 1 / 8;
  justify-content: left;
  text-align: left;
  align-items: end !important;
}
.storybook-banner--base {
  background: red;
  background-image: none;
}
.storybook-banner--background {
  background-image: url("../assets/images/jacques.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 0%;
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  #banner {
  }
  #hero-text {
    max-width: 60vw;
    align-items: end !important;
  }
  .storybook-banner--background {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 100% 50%;
    height: 80vh;
  }
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    .storybook-banner--background {
    }
  }
}
</style>
