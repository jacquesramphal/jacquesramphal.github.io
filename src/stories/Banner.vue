<template>
  <div :class="classes">
    <Container>
      <nav class="">
        <h1 id="wordmark" class="">
          {{ eyebrow }}
        </h1>
      </nav>
    </Container>
    <Container id="">
      <div id="hero-text" class="">
        <h2 class="">— {{ title }}</h2>
      </div>
    </Container>
  </div>
</template>

<script>
import Container from "@/components/grid/Container.vue";

export default {
  name: "Banner",
  components: {
    Container,
  },
  props: {
    background: {
      default: false,
      required: true,
    },
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
  },
  computed: {
    classes() {
      return {
        "banner-style": true,
        "banner-style--background": this.background,
        "banner-style--base": !this.background,
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
.banner-style {
  display: grid;
  min-height: 320px;
}
#hero-text {
  display: grid;
  grid-row: 1 / 8;
  justify-content: left;
  text-align: left;
  align-items: end !important;
}
.banner-style--base {
  background: blue;
}
.banner-style--background {
  background-image: url("../assets/images/jacques.jpeg") !important;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 0%;
}

/*
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  
  #hero-text {
    max-width: 60vw;
    align-items: end !important;
  }
  .banner-style--background {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 100% 50%;
    height: 80vh;
  }
}
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    .banner-style--background {
    }
  }
</style>
