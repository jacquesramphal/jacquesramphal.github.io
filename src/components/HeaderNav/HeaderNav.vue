<template>
  <div id="headernav" class="navbar" :class="{ 'hidden-navbar': !showNavbar }">
    <GridContainer class="bg">
      <!-- <li class="glow animate delay-2" v-if="!breadcrumb">
            <TextLink label="Jake Ramphal" route="/" />
          </li> -->
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
            <BreadCrumb
              :isDesktopScreen="isDesktopScreen"
              @toggle-menu="toggleFullscreenMenu"
            />
          </span>
          <div 
            v-if="isMarkdownPage && hasHeadings && headings && headings.length > 0 && showTOC && !menuOpen"
            class="toc-container"
          >
            <MarkdownTOC
              :headings="headings"
              :active-heading="activeHeading"
            />
          </div>
        </div>

        <ul class="links justify-end glow">
          <li class="glow animate delay-2" v-if="!breadcrumb">
            <TextLink label="Work" route="/library" />
          </li>
          <li
            class="glow animate delay-1-5"
            v-show="isDesktopScreen && !menuOpen"
          >
            <TextLink label="CV" route="/resume" />
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
import BreadCrumb from "../BreadCrumb.vue";
import TextLink from "../text/TextLink.vue";
import MarkdownTOC from "../MarkdownTOC.vue";
// import ThemeButton from "../ThemeButton.vue";

const OFFSET = 60;
export default {
  name: "HeaderNav",
  components: { GridContainer, TextLink, BreadCrumb, MarkdownTOC },
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
      showTOC: true,
      contentEndObserver: null,
      contentEndScrollHandler: null,
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
    if (this.isMarkdownPage) {
      this.observeContentEnd();
    }
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onWindowResize);
    if (this.contentEndObserver) {
      this.contentEndObserver.disconnect();
    }
    if (this.contentEndScrollHandler) {
      window.removeEventListener('scroll', this.contentEndScrollHandler);
    }
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
      // Disable hide/show transition on markdown pages
      if (this.isMarkdownPage) {
        return;
      }
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
    observeContentEnd() {
      if (!this.isMarkdownPage) {
        return;
      }

      // Clean up existing observers
      if (this.contentEndObserver) {
        this.contentEndObserver.disconnect();
        this.contentEndObserver = null;
      }
      if (this.contentEndScrollHandler) {
        window.removeEventListener('scroll', this.contentEndScrollHandler);
        this.contentEndScrollHandler = null;
      }

      // Wait for the markdown content to be rendered
      this.$nextTick(() => {
        const findContentEnd = () => {
          // Watch the related-writing-section - hide TOC when it enters viewport
          let relatedSection = document.getElementById('related-writing-section');
          
          if (!relatedSection) {
            // Retry after a short delay if element not found
            setTimeout(() => findContentEnd(), 300);
            return;
          }

          // Function to check if the related section has entered the viewport
          let ticking = false;
          const checkContentEnd = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
              const rect = relatedSection.getBoundingClientRect();
              // Hide TOC when the related section enters the viewport
              // rect.top <= window.innerHeight means the section has entered or is entering viewport
              const shouldShow = rect.top > window.innerHeight;
              
              if (this.showTOC !== shouldShow) {
                this.showTOC = shouldShow;
              }
              ticking = false;
            });
          };

          // Initial check
          checkContentEnd();

          // Use IntersectionObserver for efficiency
          const options = {
            root: null,
            rootMargin: '0px',
            threshold: [0, 0.1, 0.5, 1],
          };

          const callback = () => {
            checkContentEnd();
          };

          this.contentEndObserver = new IntersectionObserver(callback, options);
          this.contentEndObserver.observe(relatedSection);

          // Also listen to scroll events as a fallback
          const scrollHandler = () => {
            checkContentEnd();
          };
          window.addEventListener('scroll', scrollHandler, { passive: true });
          
          // Store scroll handler for cleanup
          this.contentEndScrollHandler = scrollHandler;
        };

        findContentEnd();
      });
    },
  },
  watch: {
    isMarkdownPage(newValue) {
      if (newValue) {
        this.showTOC = true;
        this.$nextTick(() => {
          this.observeContentEnd();
        });
      } else {
        this.showTOC = true;
        if (this.contentEndObserver) {
          this.contentEndObserver.disconnect();
          this.contentEndObserver = null;
        }
        if (this.contentEndScrollHandler) {
          window.removeEventListener('scroll', this.contentEndScrollHandler);
          this.contentEndScrollHandler = null;
        }
      }
    },
    '$route'() {
      // Ensure navbar is visible when route changes
      this.showNavbar = true;
      this.onWindowResize(); // Re-check screen size
      
      // Re-initialize when route changes to a markdown page
      if (this.isMarkdownPage) {
        this.showTOC = true;
        // Wait a bit longer for content to render
        this.$nextTick(() => {
          setTimeout(() => {
            this.observeContentEnd();
          }, 100);
        });
      } else {
        this.showTOC = true;
        // Clean up observers when leaving markdown page
        if (this.contentEndObserver) {
          this.contentEndObserver.disconnect();
          this.contentEndObserver = null;
        }
        if (this.contentEndScrollHandler) {
          window.removeEventListener('scroll', this.contentEndScrollHandler);
          this.contentEndScrollHandler = null;
        }
      }
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
  inset-block-end: 0;
  align-items: center;
  mix-blend-mode: normal !important;
  overflow: visible;
  position: fixed !important;
  transform: translate3d(0, 0, 0) !important;
  transition: 0.4s transform cubic-bezier(0.68, -0.55, 0.27, 1.55) !important;
  inline-size: 100vw !important;
  z-index: 100000 !important;
  @media only screen and (min-width: 768px) {
    inset-block-end: auto;
    inset-block-start: 0;
  }
}
/* Adds extra background colour to account for bouncing effect */
.navbar::after {
  content: "";
  position: absolute;
  inset-block-start: 0;
  inset-block-end: -100%; /* Adjust the value to control the width of the additional background */
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
  transform: translate3d(0, 150%, 0) !important;
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
  border-block-start: var(--border);
  @media only screen and (min-width: 768px) {
    background: transparent;

    // padding-block: var(--size-12) var(--spacing-sm) !important;
    // padding-inline: var(--spacing-lg) !important;
    // padding-inline-end: var(--spacing-md) !important;
    // border-block-end: var(--border);
    border-block-start: none;
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

.toc-container {
  inline-size: fit-content;
  max-inline-size: 33.333%;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  
  // Hide on mobile
  display: none;
  
  @media only screen and (min-width: 768px) {
    display: block;
    padding-block-start: var(--spacing-lg);
    margin-block-start: var(--spacing-sm);
  }
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
