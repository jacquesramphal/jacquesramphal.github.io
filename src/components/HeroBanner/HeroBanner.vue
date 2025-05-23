<template>
  <AnimatedComponent>
    <GridWrapper id="hero-banner" :class="classes">
      <img
        id="hero-image"
        class="animate fade delay-1"
        v-if="filename"
        draggable="false"
        :src="require(`../../assets/images/${filename}`)"
        :alt="`${alt}`"
      />
      <GridContainer id="eyebrow" v-if="eyebrow" style="z-index: 10000">
        <div class="animate fade delay-3">
          <DynamicText
              as="p"
              :text="eyebrow"
              isHtml
              :attrs="{ id: 'eyebrow' }"
              class="subtle"

            />
          <!-- <component
            :is="breadcrumb ? 'TextLink' : 'p'"
            class="subtle"
            v-if="eyebrow"
            v-text="eyebrow"
            :label="breadcrumb ? eyebrow : undefined"
            :route="breadcrumb ? breadcrumb : undefined"
            style="scroll-snap-align: start"
          /> -->
        </div>
      </GridContainer>
      <GridContainer class="banner-container" v-if="title">
        <GridParent id="hero-text" class="animate fade delay-1">
          <span
            >
            <DynamicText
              :as="as"
              :text="title"
              isHtml
              :attrs="{ id: 'title' }"
            />
            <p id="tags" v-if="tag" v-text="tag" class="subtle" />

            <h4 v-if="subtitle" v-text="subtitle" id="subtitle" />

            <div
              id="hero-cta"
              v-if="label"
              :class="{ 'with-gap': label && labeltwo }"
            >
              <MyButton
                v-if="label"
                size="large"
                :label="`${label}`"
                :route="`${route}`"
                :link="`${link}`"
              />
              <MyButton
                v-if="labeltwo"
                type="outline"
                size="large"
                :label="`${labeltwo}`"
                :route="`${routetwo}`"
                :link="`${linktwo}`"
              />
            </div>
            <!-- <ButtonRow v-if="buttonsData" :buttons="`${buttonsData}`" /> -->

            <!-- This works but need to make second button conditional and type=secondary -->
            <!-- <ButtonRow v-if="label"
              :buttons="[
                { label: label, route: route },
                { label: labeltwo, route: routetwo },
              ]"
            /> -->
          </span>
        </GridParent>
      </GridContainer>
      <div class="overlay" />
    </GridWrapper>
  </AnimatedComponent>
</template>

<script>
import GridContainer from "../grid/GridContainer.vue";
import GridWrapper from "../grid/GridWrapper.vue";
// import TextLink from "../text/TextLink.vue";
// import MyButton from "./Button/Button.vue";
import AnimatedComponent from "../AnimatedComponent.vue";
import DynamicText from "../text/DynamicText.vue";

export default {
  name: "HeroBanner",
  components: {
    GridContainer,
    GridWrapper,
    // MyButton,
    AnimatedComponent,
    // TextLink,
    DynamicText
  },
  props: {
    contentful: {
      type: Array,
      required: true,
      // TODO: add validation
    },

    eyebrow: {
      type: String,
      // default: "Breadcrumb / Current Page",
    },
    breadcrumb: {
      type: String, // Change type to String
      required: true, // Make it required or provide a default value
    },
    title: {
      type: String,
      default: "Banner Title",
    },
    as: {
      default: "h1",
      type: String,
      required: false,
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
    link: {
      type: String,
    },
    label: {
      type: String,
    },
    routetwo: {
      type: String,
    },
    linktwo: {
      type: String,
    },
    labeltwo: {
      type: String,
    },
    filename: {
      type: String,
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

    end: {
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
        "herobanner--end": this.end,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  color: inherit;
  mix-blend-mode: normal;
}

img {
  display: none;
}
.overlay {
  display: none;
}
#hero-text {
  margin-block-start: var(--spacing-xl);
  align-items: end !important;
  display: grid;
  justify-content: left;
  text-align: left;
  z-index: 1000;
  @media only screen and (min-width: 1201px) {
    max-width: 75vw;
    margin-block-start: none;
  }
  span {
    grid-column: span 3;
  }

  // #eyebrow
  //   margin-block-end: 4rem;
  #tags {
    margin-block-start: 2rem;
    word-spacing: 2rem;
    @media only screen and (min-width: 768px) {
      margin-block-start: 3.2rem;
    }
  }

  #subtitle {
    margin-block-start: 2rem;
    // max-width: 86.4rem;
    inline-size: 100%;
    @media only screen and (min-width: 768px) {
      margin-block-start: 3.2rem;
    }
    @media only screen and (min-width: 1201px) {
      // TODO: Add media query styling
    }
  }
}

#hero-cta {
  padding-block-start: var(--spacing-md);
  display: grid;
  grid-template-columns: 1fr;
  justify-content: start;
  @media only screen and (min-width: 768px) {
    grid-template-columns: auto auto;
  }
}

#hero-cta.with-gap {
  gap: 2rem; /* Add gap only when both buttons are present */
}

#eyebrow {
  margin-block-end: 4rem;
  position: absolute;
}

.herobanner {
  background-position: 50% 0%;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  overflow: hidden !important;
  position: relative;
  block-size: auto;
  @media only screen and (min-width: 768px) {
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 60vh;
  }
}
.herobanner--background {
  img {
    //   // position: fixed !important;
    //   background: linear-gradient(
    //   135deg,
    //   var(--background-reversed) 0%,
    //   rgba(255, 255, 255, 0) 200%
    // );
  }
  .overlay {
    display: block !important;
    float: left;
    position: absolute;
    z-index: 100;
    inline-size: 100%;
    inline-size: -moz-available;
    inline-size: -webkit-fill-available;
    block-size: 100%;
    background: linear-gradient(
      0deg,
      var(--background) 0%,
      rgba(255, 255, 255, 0) 200%
    );
  }
}

.herobanner--background,
.herobanner--overlap {
  overflow: hidden !important;
  img {
    border-radius: 0px !important;
    display: block;
    block-size: auto;
    min-height: 100%;
    mix-blend-mode: normal;
    object-fit: cover !important;
    object-position: 0% 100%;
    overflow: hidden !important;
    position: absolute;
    inline-size: 100%;
    z-index: 0;
  }
  #hero-image {
    z-index: 0;
  }
  #hero-text {
    h1 {
      /* background-color: var(--background-reversed);
      color: var(--background); 
            padding: var(--spacing-xxs) var(--spacing-sm) var(--spacing-xs)
        var(--spacing-sm);

      */
      color: var(--foreground);
      mix-blend-mode: difference !important;
      border-radius: var(--spacing-xxs);
      // font-weight: var(--font-reversed-medium);
      letter-spacing: var(--letterSpacing-reversed-tight);
    }
  }
}

.herobanner--overlap {
  img {
    background-color: var(--background-darker);
    block-size: 100% !important;
  }
  @media only screen and (min-width: 1201px) {
    margin-block-end: 20vh;
    min-height: 80vh;
    img {
      aspect-ratio: 16 / 9;
      display: block;
      inset-inline-end: var(--spacing-md);
      border-radius: var(--spacing-xxs) !important;

      /*       border-radius: 0 0 0 var(--spacing-xxs) !important;
    
       inset-inline-end: 0;*/
      inline-size: auto;
    }
    #hero-text {
      h1 {
        font-size: var(--font-display);
      }
    }
  }
}

.herobanner--center {
  #hero-text {
    @media only screen and (min-width: 768px) {
      justify-self: center;
      text-align: center !important;
    }
    span {
      grid-column: span 3;
    }
  }
  #hero-text > span {
    justify-content: center;
    text-align: center;
  }
  #hero-cta {
    justify-content: center;
  }

  #subtitle {
    float: none;
    margin-inline-start: auto;
    margin-inline-end: auto;
    // max-width: 86.4rem !important;
    justify-self: center;
  }
}

.herobanner--fullvh {
  @media only screen and (min-width: 768px) {
    min-height: 468px;
    block-size: 100vh !important;
    z-index: 1;
    #hero-text {
      align-items: center !important;
      margin-block-start: 0 !important;
      padding-block-end: var(--spacing-md);
    }
  }
}
.herobanner--end {
  #hero-text {
    align-items: end !important;
  }
}
.display #hero-text {
  align-items: end;
  span {
    grid-column: 1 / 4 !important;
  }
}
</style>
