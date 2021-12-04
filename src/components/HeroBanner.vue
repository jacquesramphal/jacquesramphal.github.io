<template>
  <Wrapper :class="classes">
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
        <h6 class="">
          {{ subtitle }}
        </h6>
      </div>
    </Container>
  </Wrapper>
</template>

<script>
import Wrapper from "@/components/grid/Wrapper.vue";
import Container from "@/components/grid/Container.vue";

export default {
  name: "HeroBanner",
  props: {
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
    },
  computed: {
    classes() {
      return {
        "herobanner": true,
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
  background: var(--bg-darker)


.herobanner--background
  background-image: url("../assets/images/jacques.jpeg")
  color: white !important
  text-shadow: var(--shadow-text)

#hero-text
  display: grid
  grid-row: 1 / 8
  justify-content: left
  text-align: left
  align-items: end !important
  @media only screen and (min-width: 740px)
    max-width: 60vw
    align-items: end !important
    
</style>
