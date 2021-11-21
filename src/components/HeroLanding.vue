<template>
  <div id="hero-landing" class="">
    <div id="" class="container">
      <div id="hero-text" class="">
         <!--<h2 class="">
          Product Designer at Myplanet, <a href="/" target="blank">Also a Developer</a>
        </h2> -->
         <h2 class="">
          <span class="subtle"></span>Lorem ipsum dolor sit amet do <a href="/" target="blank">eiusmod tempor</a> incididunt ut labore et dolore magna aliqua. Designer of <a href="/" target="blank">things.</a>
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
/*  background: var(--bg-darker); */
  display: grid;
  min-height: 100vh;

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
    max-width: 80vw; 
    justify-self: center;

  }
}
@media only screen and (min-width: 1201px) {
  #hero-text {
    /* margin-left: 8rem; */
  }
}
</style>
