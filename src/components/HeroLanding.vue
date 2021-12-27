<template>
  <Wrapper id="hero-landing">
    <Container>
      <div id="hero-text" class="">
        <h2 class="">
          {{ heroText }}
          <!-- Hello World 👋🏽 I’m a
          <router-link to="post">Front-End Designer</router-link> deep in a rabbit hole. -->
        </h2>
      </div>
    </Container>
  </Wrapper>
</template>

<script>
import Wrapper from "@/components/grid/Wrapper.vue";
import Container from "@/components/grid/Container.vue";

export default {
  name: "HeroLanding",
  components: {
    Container,
    Wrapper,
  },
  props: {
    contentful: {
      type: Array,
      required: true,
    },
    eyebrow: {
      type: String,
      default: "Eyebrow",
    },
    heroText: {
      type: String,
      default: "Hero Text",
    },
  },
};
</script>

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
