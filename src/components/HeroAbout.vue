<template>
  <Wrapper id="hero-about" class="">
    <Container>
      <nav class="">
        <h1 id="wordmark" class="">
          {{ eyebrow }}
        </h1>
      </nav>
    </Container>
    <Container>
      <div id="hero-text" class="">
        <h2>
          {{ title }}
        </h2>
      </div>
    </Container>
  </Wrapper>
</template>

<script>
// import PageNav from "@/components/PageNav.vue";
import Wrapper from "@/components/grid/Wrapper.vue";
import Container from "@/components/grid/Container.vue";

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
    Wrapper,
    Container,
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
  background-image: url("../assets/images/jacques.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 0%;
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
  }
  #hero-text {
    max-width: 60vw;
    align-items: end !important;
  }
}
</style>
