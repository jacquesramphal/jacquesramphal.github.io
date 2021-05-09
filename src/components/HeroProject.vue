<template>
  <div id="hero-project" class="">
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
          data-aos="fade"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-anchor-placement="top"
        >
          {{ title }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
// import PageNav from "@/components/PageNav.vue";

export default {
  name: "HeroProject",
  props: {
    eyebrow: {
      type: String,
      default: "Eyebrow",
    },
    title: {
      type: String,
      default: "Project Title",
    },
  },
  components: {
    // PageNav,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: inherit;
  mix-blend-mode: normal;
}
#hero-project {
  display: grid;
  min-height: 320px;
  background-color: rgba(0, 0, 0, 0.1);

}
#hero-text {
  display: grid;
  grid-row: 1 / 8;
  justify-content: left;
  text-align: left;
  align-items: end !important;
}
@media (prefers-color-scheme: dark) {
  #hero-project {
    background-color: rgba(0, 0, 0, 0.25);
  }
}
/* ------------ BREAKPOINT MD ------------ */

@media only screen and (min-width: 740px) {

#hero-project {
  background-image: url("../assets/images/template-preview.svg");
  background-repeat: no-repeat;
  background-size: 100vh;
  background-position: 101% 50%;
  background-color: rgba(0, 0, 0, 0.1);
  height: 80vh;
}
  #hero-text {
    max-width: 60vw;
    align-items: end !important;
  }
}
</style>
