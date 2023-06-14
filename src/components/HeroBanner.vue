<template>
  <AnimatedComponent>
    <!-- Background url as prop but not working -->
    <!-- <GridWrapper id="hero-banner" :class="classes" style="background: url('require(`@/assets/images/${filename}`)')">-->

    <GridWrapper id="hero-banner" :class="classes">
      <img
        class="animate glow delay-2"
        draggable="false"
        :src="require(`@/assets/images/${filename}`)"
        :alt="`${alt}`"
      />
      <GridContainer v-if="eyebrow">
        <div v-if="eyebrow" class="animate fade delay-3">
          <p id="eyebrow" class="subtle" v-if="eyebrow" v-text="eyebrow" />
        </div>
      </GridContainer>
      <GridContainer>
        <div id="hero-text" class="animate glow delay-1">
          <span
            ><h2 id="title" v-html="title" />
            <h6 id="tags" v-if="tag" v-text="tag" class="subtle" />

            <p
              v-if="subtitle"
              v-text="subtitle"
              id="subtitle"
              style="font-weight: var(--font-medium)"
            />

            <div id="hero-cta" v-show="label">
              <!-- refactor button and props -->
                <MyButton v-if="label" size="large" :label="`${label}`" :route="`${route}`"
              />
                <MyButton
                v-if="labeltwo"
                  secondary
                  size="large"
                  :label="`${labeltwo}`"
                  :route="`${routetwo}`"
              />
            </div>
          </span>
        </div>
      </GridContainer>
    </GridWrapper>
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
    tag: {
      type: String,
      required: false,
      default: "",
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
    routetwo: {
      type: String,
    },
    labeltwo: {
      type: String,
    },
    filename: {
      type: String,
      default: "jacques.jpeg",
    },

    // Override props
    background: {
      type: Boolean,
      default: false,
      required: true,
    },
    center: {
      type: Boolean,
      default: false,
      required: true,
    },
    overlap: {
      type: Boolean,
      default: false,
    },
    fullvh: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        herobanner: true,
        "herobanner--normal": !this.background,
        "herobanner--background": this.background,
        "herobanner--center": this.center,
        "herobanner--overlap": this.overlap,
        "herobanner--fullvh": this.fullvh,
        "herobanner--red": this.red,

        // "herobanner--left": !this.center,
      };
    },
  },
};
</script>

<style lang="sass" scoped>
*
  color: inherit
  mix-blend-mode: normal

img
  display: none

#hero-text
  margin-top: var(--spacing-lg)
  align-items: end !important
  display: grid
  justify-content: left
  text-align: left
  z-index: 1000
  @media only screen and (min-width: 1201px)
    max-width: 75vw
  #eyebrow
    margin-bottom: 4rem
  #tags
    margin-top: 2rem
    word-spacing: 2rem
    @media only screen and (min-width: 740px)
      margin-top: 3.2rem
  #subtitle
    margin-top: 2rem
    max-width: 86.4rem
    width: 100%
    @media only screen and (min-width: 740px)
      margin-top: 3.2rem
    @media only screen and (min-width: 1201px)
#hero-cta
  padding-top: var(--spacing-md)
  display: grid
  gap: 2rem
  grid-template-columns: 1fr
  justify-content: start
  @media only screen and (min-width: 740px)
    grid-template-columns: auto auto

.herobanner
  background-position: 50% 0%
  background-repeat: no-repeat
  background-size: cover
  display: grid
  overflow: hidden !important
  position: relative
  height: auto
  min-height: 500px
  @media only screen and (min-width: 740px)
    background-position: 100% 100%
    background-repeat: no-repeat
    background-size: cover
    min-height: 560px



.herobanner--background, .herobanner--overlap
  overflow: hidden !important
  img
    border-radius: 0px !important
    display: block
    height: auto
    min-height: 100%
    mix-blend-mode: normal
    object-fit: cover !important
    object-position: 0% 100%
    overflow: hidden !important
    position: absolute
    width: 100%
    z-index: 0
  #hero-text
    h2
      background-color: var(--background-reversed)
      border-radius: var(--spacing-xxs)
      color: var(--background)
      font-weight: var(--font-reversed-bold)
      letter-spacing: var(--spacing-reversed-tight)
      padding: var(--spacing-xxs) var(--spacing-sm) var(--spacing-xs) var(--spacing-sm)
.herobanner--overlap
  img
    background-color: var(--bg-darker)
    height: 100% !important
  @media only screen and (min-width: 1201px)
    margin-bottom: 20vh
    min-height: 80vh
    img
      aspect-ratio: 16 / 9
      border-radius: 0 0 0 var(--spacing-xxs) !important
      display: block
      right: 0
      width: auto
    #hero-text
      h2
        font-size: var(--font-display)
.herobanner--center
  #hero-text
    @media only screen and (min-width: 740px)
      justify-self: center
      text-align: center !important
  #hero-text > span
    justify-content: center
    text-align: center
    // display: flex
    // flex-direction: column
  #hero-cta
    justify-content: center

  .subtitle
    float: none
    margin-left: auto
    margin-right: auto
    max-width: 86.4rem !important
    justify-self: center

.herobanner--fullvh
  height: 100vh !important
  #hero-text
    align-items: center !important
</style>
