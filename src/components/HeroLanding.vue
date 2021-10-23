<template>
  <div
    id="hero-landing"
    class=""
    
  >
    <div id="" class="container">
      <div id="hero-text" class="">
        <!--<h4
          class=""
          data-aos="fade"
          data-aos-duration="1000"
          data-aos-delay="500"
          data-aos-easing="ease-in-out"
          data-aos-anchor-placement="top"
        >
          Jacques (He/Him)
        </h4> -->
        <h2
          class=""
        >
          Maker, designer and developer at <a href="/" target="blank">Myplanet</a>
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
// import PageNav from "@/components/PageNav.vue";

export default {
  name: "HeroLanding",
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
h2 {
}
#hero-landing {
  display: grid;
  min-height: 320px;
  height: 100vh;
}
#hero-text {
  display: grid;
  grid-row: 1 / 8;
  justify-content: left;
  text-align: left;
  align-items: center !important;
}
@media (prefers-color-scheme: dark) {
  #hero-project {
  }
}

/* ------------ BREAKPOINT MD ------------ */

@media only screen and (min-width: 740px) {
  #hero-landing {
  }
  #hero-text {
    max-width: 70vw;
  }
}
@media only screen and (min-width: 1201px) {
  #hero-text {
    margin-left: 8rem;
  }
}
</style>
