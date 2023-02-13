<template>
  <AnimatedComponent>
    <!-- Background url as prop but not working -->
    <!-- <GridWrapper id="hero-banner" :class="classes" style="background: url('require(`@/assets/images/${filename}`)')">-->

    <GridWrapper id="hero-banner" :class="classes">
      <img
        draggable="false"
        :src="require(`@/assets/images/${filename}`)"
        :alt="`${alt}`"
      />
      <GridContainer>
        <div v-if="eyebrow" class="animate fade delay-3">
          <p id="eyebrow" class="subtle" v-if="eyebrow" v-text="eyebrow" />
        </div>
      </GridContainer>
      <GridContainer>
        <div id="hero-text" class="animate glow delay-1">
          <span><h2 id="title">
            {{ title }}
          </h2>
          <p id="tags" v-if="tag" v-text="tag" class="subtle" />

          <p
            v-if="subtitle"
            v-text="subtitle"
            id="subtitle"
            style="font-weight: var(--font-medium)"
          />

          <div id="hero-cta" v-show="label">
            <!-- refactor button and props -->
            <span style="gap: 2rem; display: flex"
              ><MyButton :label="`${label}`" size="large" :route="`${route}`" />
              <MyButton
                secondary
                :label="`${label}`"
                size="large"
                :route="`${route}`"
              />
            </span>
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
    filename: {
      type: String,
      default: "jacques.jpeg",
    },
    // Background url as prop but not working

    // bgimg: {
    //   type: String,
    //   default: "url(../assets/images/jacques.jpeg)",
    // },

    // filename: {
    //   type: String,
    //   default: "jacques.jpeg",
    // },

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
  },
  computed: {
    classes() {
      return {
        herobanner: true,
        "herobanner--background": this.background,
        "herobanner--normal": !this.background,

        "herobanner--center": this.center,
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

#hero-text
  z-index: 1000
  overflow-wrap: break-word
  word-wrap: break-word
  -webkit-hyphens: auto
  -ms-hyphens: auto
  -moz-hyphens: auto
  hyphens: auto


img
  display: none
#eyebrow
  margin-bottom: 4rem
// #title 
  
#tags
  color: var(--link)
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

.herobanner
  position: relative
  overflow: hidden !important
  display: grid
  min-height: 48rem
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
  // background-image: url("../assets/images/jacques.jpeg")
  color: white !important
  text-shadow: var(--shadow-hover)
  overflow: hidden !important
  img
    border-radius: 0px !important
    overflow: hidden !important
    display: block
    mix-blend-mode: normal
    position: absolute
    z-index: 0
    width: 100%
    height: auto
    min-height: 100%
    // max-height: 100%
    // max-width: 100%
    object-fit: cover !important
  #hero-text
      h2
        font-weight: 700 !important
        letter-spacing: calc(0.01rem - 0.12rem)
        // letter-spacing: -0.11rem

.herobanner--center
  #hero-text
    @media only screen and (min-width: 740px)
      justify-self: center
      text-align: center !important
  .subtitle
    max-width: 86.4rem !important
    float: none
    margin-left: auto
    margin-right: auto


#hero-text
  display: grid
  // grid-row: 1 / 8
  justify-content: left
  text-align: left
  align-items: end !important
  @media only screen and (min-width: 740px)
    // gap: var(--spacing-md)
  @media only screen and (min-width: 1201px)
    max-width: 75vw
</style>
