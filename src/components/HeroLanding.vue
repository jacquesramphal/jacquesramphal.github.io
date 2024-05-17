<template>
  <AnimatedComponent
    ><GridWrapper id="hero-landing">
      <GridContainer>
        <div id="hero-text" class="">
          <h1 class="display animate glow">
            {{ heroText }}
            <!-- Hello World 👋🏽 I’m a
          <router-link to="post">Front-End Designer</router-link> deep in a rabbit hole. -->
          </h1>
        </div>
      </GridContainer>
    </GridWrapper></AnimatedComponent
  >
</template>

<script>


import AnimatedComponent from "@/components/AnimatedComponent.vue";

export default {
  name: "HeroLanding",
  components: {
    AnimatedComponent,
    
    
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
  min-block-size: 50vh
  background-repeat: no-repeat
  // background-attachment: fixed
  background-size: cover
  background-position: 100% 0%
  @media only screen and (min-width: 1201px)
    // min-block-size: 100vh
    min-block-size: 60vh
    align-items: end !important
    background-size: cover
    background-position: 100% 50%

h1
  // text-shadow: var(--shadow-z1)
#hero-text
  display: grid
  grid-row: 1 / 8
  text-align: left
  @media only screen and (min-width: 768px)
    max-width: 85vw
    justify-self: center !important
</style>
