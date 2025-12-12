<template>
  <div id="headernav" class="navbar" :class="{ 'hidden-navbar': !showNavbar }">
    <GridContainer class="bg">

      <nav class="">
        <div class="nav-left">
          <span
            class="glow animate delay-1 wordmark"
            style="
              display: flex;
              flex-direction: row;
              gap: var(--spacing-xs);
              align-items: center;
              text-decoration: none !important;
            "
          >
          <TextLink label="Jake Ramphal" route="/" />

            <!-- <BreadCrumb
              :isDesktopScreen="isDesktopScreen"
              @toggle-menu="toggleFullscreenMenu"
            /> -->
          </span>
        </div>

        <ul class="links justify-end glow">
          <li class="glow animate delay-2" v-if="!breadcrumb"             v-show="isDesktopScreen"
          >
            <TextLink label="Library" route="/library" />
          </li>
          <li
            class="glow animate delay-1-5"
            v-show="isDesktopScreen"
          >
            <TextLink label="CV" link="https://linkedin.com/in/ramphal-design" />
          </li>
          <!-- <li  v-show="isMobileScreen && !menuOpen" class="nav-link" tabindex="0">
            <slot name="menu-button-mobile"></slot>
          </li> -->
          <span class="glow animate delay-1"> <slot name="menu-button"></slot></span>
        </ul>
      </nav>
    </GridContainer>
  </div>
</template>

<script>
import GridContainer from "../grid/GridContainer.vue";
// import BreadCrumb from "../BreadCrumb.vue";
import TextLink from "../text/TextLink.vue";
// import ThemeButton from "../ThemeButton.vue";

const OFFSET = 60;
export default {
  name: "HeaderNav",
  components: { GridContainer, TextLink },
  props: {
    breadcrumb: {
      type: Boolean,
      default: false,
    },
    hasHeadings: {
      type: Boolean,
      default: false,
    },
    headings: {
      type: Array,
      default: () => [],
    },
    activeHeading: {
      type: String,
      default: null,
    },
    menuOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      backgroundColor: "#ffffff", // Not in use - Replace with your hex color
      showNavbar: true,
      lastScrollPosition: 0,
      scrollValue: 0,
      isMobileScreen: false,
      isDesktopScreen: false,
    };
  },
  computed: {
    isMarkdownPage() {
      return this.$route?.path?.startsWith('/doc/');
    },
    // not in use - start
    backgroundStyle() {
      const rgb = this.hexToRgb(this.backgroundColor);
      return {
        background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.95)`,
      };
    },
  },
  // not in use - end
  mounted() {
    this.lastScrollPosition = window.pageYOffset;
    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("resize", this.onWindowResize);
    const viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    viewportMeta.content = "width=device-width, initial-scale=1";
    document.head.appendChild(viewportMeta);

    this.onWindowResize();
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onWindowResize);
  },

  methods: {
    // not in use - start

    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    },
    // not in use - end

    onScroll() {
      if (window.pageYOffset < 0) {
        return;
      }
      if (Math.abs(window.pageYOffset - this.lastScrollPosition) < OFFSET) {
        return;
      }
      this.showNavbar = window.pageYOffset < this.lastScrollPosition;
      this.lastScrollPosition = window.pageYOffset;
    },
    onWindowResize() {
      this.showNavbar = true; // Ensure the navbar is always visible when resizing
      this.isMobileScreen = window.innerWidth < 768;
      this.isDesktopScreen = window.innerWidth >= 768;
    },
    setFont(font) {
      this.selectedFont = font;
      this.$emit("update:font", font);
    },
  },
  watch: {
    '$route'() {
      // Ensure navbar is visible when route changes
      this.showNavbar = true;
      this.onWindowResize(); // Re-check screen size
    },
  },
};
</script>
<style lang="scss">
.selected {
  font-weight: bold;
  text-decoration: underline;
}
.nav-link > a {
  &:hover {
    background: var(--background-darker-reversed);
    transition: all 0.25s ease;
  }
}
</style>

<style lang="scss" scoped>
* {
  margin: 0;
  mix-blend-mode: normal;
}
@media print {
  * {
    display: none;
  }
}
// .blur {
//   block-size: 100% ;
//   inline-size: 100vw;
//   position: absolute;
//   z-index: -1;
//   filter: blur(20px); /* Blur amount on hover, can be adjusted */
// }

// TESTING MIX BLEND MODE!!!!

// html {
//   background: #fff;
// }

// .blend {
//   mix-blend-mode: exclusion;
//   color: white;
//   display: block;
//   height: 100%;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   font-size: 6vw;
// }
button {
  border: 0 !important;
}
:active {
  outline: transparent;
}

.navbar {
  display: flex;
  inset-block-start: 0;
  align-items: center;
  mix-blend-mode: normal !important;
  overflow: visible;
  position: fixed !important;
  transform: translate3d(0, 0, 0) !important;
  transition: 0.4s transform cubic-bezier(0.68, -0.55, 0.27, 1.55) !important;
  inline-size: 100vw !important;
  z-index: 100000 !important;
  @media only screen and (min-width: 768px) {
    inset-block-start: 0;
  }
}
/* Adds extra background colour to account for bouncing effect */
.navbar::after {
  content: "";
  position: absolute;
  inset-block-start: -100%;
  inset-block-end: 0; /* Adjust the value to control the width of the additional background */
  inset-inline-end: 0;
  inline-size: 100%; /* Adjust the value to control the width of the additional background */
  background: var(--background);
  /* Specify the color of the additional background */
  opacity: 0.95;
  z-index: -1; /* Set the z-index to be behind the navbar */
  @media only screen and (min-width: 768px) {
    background: transparent;
    inset-block-end: 0;
    inset-block-start: -100%;
  }
}
.navbar.hidden-navbar {
  transform: translate3d(0, -150%, 0) !important;
  @media only screen and (min-width: 768px) {
    transform: translate3d(0, -150%, 0) !important;
  }
}
.bg {
  background: var(--background);
  transition: 0.5s box-shadow ease-in-out !important;
  justify-self: flex-end;
  overflow: visible;
  position: relative;
  padding-block: var(--spacing-xs) var(--spacing-sm) !important;
  padding-inline-end: var(--spacing-sm) !important;
  inline-size: 100%;
  // border-block-end: var(--border);
  @media only screen and (min-width: 768px) {
    background: transparent;

    // padding-block: var(--size-12) var(--spacing-sm) !important;
    // padding-inline: var(--spacing-lg) !important;
    // padding-inline-end: var(--spacing-md) !important;
    // border-block-end: var(--border);
    border-block-end: none;
    justify-self: end;
  }
  @media only screen and (min-width: 1024px) {
    // padding-inline: var(--spacing-xl) !important;
  }
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-self: flex-end;
  gap: var(--spacing-sm);
  @media only screen and (min-width: 768px) {
    gap: var(--spacing-md);
  }
}
li {
  list-style: none;
  float: left;
  font-size: 2em;
  line-height: 1;
  margin: 0;
  text-decoration: none;
  &:first-child {
    padding-inline-end: 0;
  }
}
nav {
  overflow: visible;
  align-items: flex-start;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--spacing-md);
  // block-size: 5.2rem;
  justify-self: stretch;
  position: relative;
}

.nav-left {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  align-items: flex-start;
}

#richlink {
  text-decoration: none !important;
}
.router-link-exact-active {
  // background: var(--background);
  text-decoration: underline dashed !important;
}
p {
  margin: 0;
}
// .wordmark::after {
//   @media only screen and (min-width: 768px) {
//     content: "/";
//     padding: var(--spacing-xxs);
//     opacity: 0.5;
//     font-weight: var(--fontWeight-normal);
//   }
// }
</style>
