<template>
  <AnimatedComponent>
    <Wrapper id="hero-banner" :class="classes">
      <Container>
        <nav class="animate delay-1">
          <p id="wordmark" class="subtle" v-if="eyebrow" v-text="eyebrow" />
        </nav>
      </Container>
      <Container>
        <div id="hero-text" class="animate glow">
          <h2>
            {{ title }}
          </h2>
          <!-- <h6 class="">
            {{ subtitle }}
          </h6> -->
        </div>
      </Container>
    </Wrapper>
  </AnimatedComponent>
</template>

<script>
import Wrapper from "@/components/grid/Wrapper.vue";
import Container from "@/components/grid/Container.vue";
import AnimatedComponent from "@/components/AnimatedComponent.vue";

export default {
  name: "HeroBanner",
  props: {
    contentful: {
      type: Array,
      required: true,
      // TODO: add validation
    },
    background: {
      type: Boolean,
      default: false,
      required: true,
    },
    eyebrow: {
      type: String,
      default: "Eyebrow",
    },
    title: {
      type: String,
      default: "Banner Title",
    },
    subtitle: {
      type: String,
    },
  },
  components: {
    Wrapper,
    Container,
    AnimatedComponent,
  },
  computed: {
    classes() {
      return {
        herobanner: true,
        "herobanner--background": this.background,
        "herobanner--normal": !this.background,
      };
    },
  },
};
</script>

<style lang="sass" scoped>
*
  color: inherit
  mix-blend-mode: normal

.herobanner
  display: grid
  min-height: 320px
  background-repeat: no-repeat
  background-size: cover
  background-position: 50% 0%
  @media only screen and (min-width: 740px)
    background-repeat: no-repeat
    background-size: cover
    background-position: 100% 50%

.herobanner--normal
  // background: var(--bg-darker)
  // border-bottom: var(--border)

.herobanner--background
  background-image: url("../assets/images/jacques.jpeg")
  color: white !important
  text-shadow: var(--shadow-hover)

#hero-text
  display: grid
  grid-row: 1 / 8
  justify-content: left
  text-align: left
  align-items: end !important
  @media only screen and (min-width: 1201px)
    max-width: 60vw
</style>
