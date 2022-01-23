<template>
  <AnimatedComponent
    ><Wrapper id="hero-landing">
      <Container>
        <div id="hero-text" class="">
          <h2 class="display animate glow">
            {{ heroText }}
            <!-- Hello World 👋🏽 I’m a
          <router-link to="post">Front-End Designer</router-link> deep in a rabbit hole. -->
          </h2>
        </div>
      </Container>
    </Wrapper></AnimatedComponent
  >
</template>

<script>
import Wrapper from "@/components/grid/Wrapper.vue";
import Container from "@/components/grid/Container.vue";
import AnimatedComponent from "@/components/AnimatedComponent.vue";

export default {
  name: "HeroLanding",
  components: {
    AnimatedComponent,
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

<style lang="sass" scoped>
*
  color: inherit
  mix-blend-mode: normal

#hero-landing
  // background-image: url("../assets/images/splash4.svg")
  // background: -webkit-linear-gradient(top left, var(--link-reversed), var(--link-reversed))  
  // background: var(--color-pink)
  display: grid
  align-items: end !important
  min-height: 50vh
  background-repeat: no-repeat
  // background-attachment: fixed
  background-size: cover
  background-position: 100% 0%
  @media only screen and (min-width: 1201px)
    // min-height: 100vh
    min-height: 60vh
    align-items: end !important
    background-size: cover
    background-position: 100% 50%

h2
  // text-shadow: var(--shadow-z1)
#hero-text
  display: grid
  grid-row: 1 / 8
  text-align: left
  @media only screen and (min-width: 740px)
    max-width: 85vw
    justify-self: center !important
</style>
