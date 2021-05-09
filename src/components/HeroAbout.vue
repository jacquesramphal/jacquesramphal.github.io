<template>
  <div id="hero-about" class="">
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
  name: "HeroAbout",
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
  color: white;
  mix-blend-mode: normal;
}
#hero-about {
  display: grid;
  min-height: 320px;
  background-image: url("../assets/images/about.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 0%;
  height: 80vh;
}
#hero-text {
  display: grid;
  grid-row: 1 / 8;
  justify-content: left;
  text-align: left;
  align-items: end !important;
}
@media (prefers-color-scheme: dark) {
  #hero-about {
  }
}
/* ------------ BREAKPOINT MD ------------ */

@media only screen and (min-width: 740px) {

#hero-about {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 100% 50%;
  height: 80vh;
}
  #hero-text {
    max-width: 60vw;
    align-items: end !important;
  }
}
</style>
