<template>
  <GridWrapper :class="classes">
    <GridContainer tight style="padding: 0 !important">
      <div id="grid-parent" class="grid-parent">
        <!-- <GridContainer class="textcontainer parallaxFront fadeInUp"> -->

        <!-- <GridContainer class="imgcontainer parallaxBack fadeInUp"> -->

        <GridContainer class="imgcontainer ">
          <img
            class="splitimg"
            draggable="false"
            :src="require(`../../assets/images/${filename}`)"
            :alt="`${alt}`"
          />
        </GridContainer>

        <GridContainer class="textcontainer ">
          <TextBlock
            :eyebrow="`${eyebrow}`"
            is="h2"
            :title="`${title}`"
            :label="`${label}`"
            :route="route ? `${route}` : undefined"
            :btnroute="btnroute ? `${btnroute}` : undefined"
            :description="`${description}`"
          />
        </GridContainer>
      </div> </GridContainer
  ></GridWrapper>
</template>
<script>
import GridContainer from "../grid/GridContainer.vue";
import GridWrapper from "../grid/GridWrapper.vue";
import TextBlock from "../TextBlock.vue";

export default {
  name: "SplitImage",
  components: {
    GridContainer,
    GridWrapper,
    TextBlock,
  },
  props: {
    title: {
      type: String,
      default: "Detail Card",
    },
    description: {
      type: String,
      default:
        "    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    eyebrow: {
      type: String,
      default: "Eyebrow",
    },
    filename: {
      type: String,
      default: "jacques.jpg",
    },
    label: {
      type: String,
      default: "Read More",
    },
    btnroute: {
      type: String,
      default: "",
      required: false,
    },
    route: {
      type: String,
      default: "",
      required: false,
    },
    flipped: {
      type: Boolean,
      default: false,
      required: true,
    },
    red: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  // Multiple classes
  computed: {
    classes() {
      return {
        "splitimage-align": true,
        "splitimage-align--flipped": this.flipped,
        "splitimage-align--default": !this.flipped,
        "splitimage-color": true,
        "splitimage-color--red": this.red,
        "splitimage-color--default": !this.red,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
Copy code * {
  color: inherit;
}

.grid-parent {
  grid-gap: 0;

  @media only screen and (min-width: 1201px) {
    grid-template-columns: repeat(2, 1fr) !important;
    grid-template-rows: 1fr !important;
  }
}

// COLOR

.splitimage-color--red {
  background-color: red !important;
}

// ALIGNMENT

.splitimage-align {
  position: relative;
  overflow: hidden;
  grid-template-rows: repeat(2, 1fr);

  #textblock {
    // align-self: center !important;
    padding-block-start: 0;
    @media only screen and (min-width: 768px) {
      padding-block-start: 0;
    }
  }

  img {
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover !important;
    position: relative;
    display: block;
    overflow: hidden;
    aspect-ratio: 16 / 9 !important;
    grid-column: 1;
    // Swap img postiton on mobile
    grid-row: 2;
    // grid-row: 1 / 1;

    // @media only screen and (min-width: 1201px) {
    //   aspect-ratio: 16 / 9 !important;
    // @media screen and (-webkit-min-device-pixel-ratio:0) {
    //   block-size: auto;
    //   background: yellow;
    // }
    // }
  }

  .imgcontainer {
    padding-block-end: 0 !important;

    @media only screen and (min-width: 768px) {
      padding-block-start: var(--spacing-lg) !important;
      padding-block-end: var(--spacing-lg) !important;
    }
  }

  .textcontainer {
    align-self: center;
    display: block;
    grid-column: auto;
    // grid-row: 2 / 2;
    grid-template-columns: 1fr !important;
  }
}

.splitimage-align--default {
  .textcontainer {
    @media only screen and (min-width: 768px) {
      grid-column: 2;
      grid-row: 1;
    }
  }

  img {
    @media only screen and (min-width: 768px) {
      grid-column: 1;
      grid-row: 1;
    }
  }

  .imgcontainer {
    @media only screen and (min-width: 768px) {
      padding-inline-end: 0 !important;
    }
  }
}

.splitimage-align--flipped {
  .textcontainer {
    @media only screen and (min-width: 768px) {
      grid-column: 1;
      grid-row: 1;
    }
  }

  img {
    @media only screen and (min-width: 768px) {
      grid-column: 2;
      grid-row: 1;
    }
  }

  .imgcontainer {
    @media only screen and (min-width: 768px) {
      padding-inline-start: 0 !important;
    }
  }
}
</style>
