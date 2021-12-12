<template>
  <Wrapper id="hero-simple">
    <Container>
      <nav class="">
        <h1 id="wordmark" class="">
          {{ eyebrow }}
        </h1>
      </nav>
    </Container>
    <Container id="">
      <div id="hero-text" class="">
        <h2>
          {{ title }}
        </h2>
        <h6 class="">
          {{ subtitle }}
        </h6>
      </div>
    </Container>
  </Wrapper>
</template>

<script>
// import PageNav from "@/components/PageNav.vue";
import Wrapper from "@/components/grid/Wrapper.vue";
import Container from "@/components/grid/Container.vue";

export default {
  name: "HeroSimple",
  props: {
    eyebrow: {
      type: String,
      default: "Eyebrow",
    },
    title: {
      type: String,
      default: "Title",
    },
    subtitle: {
      type: String,
      default: "Front-end Design, Wellness, what else?",
    },
  },
  components: {
    // PageNav,
    Wrapper,
    Container,
  },
};
</script>


<style scoped>
* {
  color: inherit;
  mix-blend-mode: normal;
}
#hero-simple {
  display: grid;
  background-color: var(--bg-darker);
}
#hero-text {
  display: grid;
  justify-content: left;
  text-align: left;
  align-items: end !important;
}
@media (prefers-color-scheme: dark) {
}
/* ------------ BREAKPOINT MD ------------ */

@media only screen and (min-width: 740px) {
  #hero-simple {
  }
  #hero-text {
    align-items: end !important;
  }
}
</style>
