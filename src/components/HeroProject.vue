<template>
  <GridWrapper id="hero-project" class="">
    <GridContainer>
      <div id="hero-text" class="">
        <h2 class="">— {{ title }}</h2>
      </div>
    </GridContainer>
  </GridWrapper>
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


<style scoped>
* {
  color: inherit;
  mix-blend-mode: normal;
}
#hero-project {
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
@media (prefers-color-scheme: dark) {
}
/* ------------ BREAKPOINT MD ------------ */

@media only screen and (min-width: 740px) {
  #hero-project {
    background-image: url("../assets/images/templates/template-v2.svg");
    background-repeat: no-repeat;
    background-size: 40%;
    background-position: 101% 50%;
    height: 80vh;
  }
  #hero-text {
    max-width: 60vw;
    align-items: end !important;
  }
}
</style>
