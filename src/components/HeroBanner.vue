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
          <h5
            v-if="subtitle"
            v-text="subtitle"
            class=""
            style="font-weight: var(--font-medium)"
          />
          <div id="hero-cta" v-show="label">

          <!-- refactor button and props -->
            <span style="gap: 2rem; display: flex;" ><MyButton :label="`${label}`" size="large" :route="`${route}`" />
            <MyButton secondary :label="`${label}`" size="large" :route="`${route}`" />
            </span>
          </div>
        </div>
      </Container>
    </Wrapper>
  </AnimatedComponent>
</template>

<script>

export default {
  name: "HeroBanner",
  props: {
    contentful: {
      type: Array,
      required: true,
      // TODO: add validation
    },

    eyebrow: {
      type: String,
      default: "Breadcrumb / Current Page",
    },
    title: {
      type: String,
      default: "Banner Title",
    },
    subtitle: {
      type: String,
    },
    route: {
      type: String,
    },
    label: {
      type: String,
    },
    // Override props
    background: {
      type: Boolean,
      default: false,
      required: true,
    },
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
  gap: var(--spacing-md)
  justify-content: left
  text-align: left
  align-items: end !important
  @media only screen and (min-width: 1201px)
    max-width: 75vw
</style>
