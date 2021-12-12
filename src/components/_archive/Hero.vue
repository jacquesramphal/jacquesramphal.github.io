<template>
  <Wrapper id="hero" class="">
    <Container>
      <div id="hero-text" class="">
        <h2 class="" tabindex="0">
          <span>{{ header1 }}</span
          ><span>{{ header2 }}</span>
        </h2>
      </div>
    </Container>
  </Wrapper>
</template>

<script>
import Wrapper from "@/components/grid/Wrapper.vue";
import Container from "@/components/grid/Container.vue";

export default {
  name: "Hero",
  components: {
    Wrapper,
    Container,
  },
  props: {
    header1: {
      type: String,
      default: "Designer",
    },
    header2: {
      type: String,
      default: " of things",
    },
  },
};
</script>


<style scoped>
* {
  color: inherit;
  mix-blend-mode: normal;
}

#hero {
  display: grid;
  min-height: 320px;
  height: 100vh;
  /* color: var(--color-action2) */
  /*  background-image: url("../assets/images/splash.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 100% 100%; */
}
/* h2 {
  font-weight: 900;
  color: white;

} */
#hero-text {
  display: grid;
  margin-top: -2.8em;
  grid-row: 1 / 8;
  justify-content: center;
  text-align: center;
  align-items: center !important;
}
h2 {
  transition: all 0.25s ease-in-out !important;
  outline: transparent !important;
}
/* h2:hover {
  font-weight: 400;
  word-spacing: 1em;
}
h2:active {
  font-weight: 900;
  word-spacing: -100%;
} */
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  #hero {
    height: 100vh;
  }
}
</style>
