<template>
  <GridContainer
    id="stickynav"
    class="navbar"
    :class="{ 'hidden-navbar': !showNavbar }"
  >
    <div class="bg" style="background-color: var(--background);">
      <nav class="">
        <li class="wordmark">
          <MyButton
            label="Jacques Ramphal"
            route="/"
            type="ghost"
            v-show="isDesktopScreen && !menuOpen"
          />
          <MyButton
            label="Jacques Ramphal"
            route="/"
            type="ghost"
            v-show="isMobileScreen && !menuOpen"
          />
        </li>

        <div class="justify-end">
        
          <li>
            <MyButton
              v-show="isDesktopScreen && !menuOpen"
              type="ghost"
              route="docs"
              label="docs"
            />
          </li>
        
          <!-- Slot for the menu button -->
          <li class="nav-link" tabindex="0" style="width: 98px;">
            <slot name="menu-button"></slot>
          </li>
        </div>
      </nav>
    </div>
  </GridContainer>
</template>

<script>
import GridContainer from "./grid/GridContainer.vue";
import MyButton from "./Button/Button.vue";

const OFFSET = 60;
export default {
  name: "StickyNav",
  components: {
    GridContainer,
    MyButton,
  },
  props: {
    title: {
      type: String,
      default: "Jacques Ramphal",
    },
  },
  data() {
    return {
      menuOpen: false,

      showNavbar: true,
      lastScrollPosition: 0,
      scrollValue: 0,
      isMobileScreen: false, // Change to regular data property
      isDesktopScreen: false, // Change to regular data property
    };
  },

  mounted() {
    this.lastScrollPosition = window.pageYOffset;
    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("resize", this.onWindowResize);
    const viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    viewportMeta.content = "width=device-width, initial-scale=1";
    document.head.appendChild(viewportMeta);

    // Call the resize method on initial mount to set the initial visibility
    this.onWindowResize();
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onWindowResize);
  },

  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
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
      this.isMobileScreen = window.innerWidth < 740;
      this.isDesktopScreen = window.innerWidth >= 740;
    },
  },
};
</script>
<style lang="scss">
.nav-link > a {
  border-radius: 4px;
  color: var(--foreground) !important;

  &:hover {
    background: var(--background-darker);
    transition: all 0.25s ease;
  }
}
</style>

<style lang="scss" scoped>
* {
  color: var(--foreground) !important;
  margin: 0;
  mix-blend-mode: normal;
}

.custom-btn {
  padding: 0 !important;
}
:active {
  outline: transparent;
}

.navbar {
  inset-inline-end:  0;
  inset-block-end:  0;
  max-width: none;
  mix-blend-mode: normal !important;
  overflow: visible;
  padding: 0 !important;
  position: fixed;
  transform: translate3d(0, 0, 0) !important;
  transition: 0.4s all cubic-bezier(0.68, -0.55, 0.27, 1.55) !important;
  inline-size: 100%;
  z-index: 1000 !important;

  @media only screen and (min-width: 768px) {
    inline-size: fit-content;
  }
}
/* Adds extra background colour to account for bouncing effect */
.navbar::after {
  content: "";
  position: absolute;
  inset-block-start:  0;
  inset-block-end:  -100%; /* Adjust the value to control the width of the additional background */
  inset-inline-end:  0;
  inline-size: 100%; /* Adjust the value to control the width of the additional background */
  background-color: var(
    --background
  ); /* Specify the color of the additional background */
  z-index: -1; /* Set the z-index to be behind the navbar */
  @media only screen and (min-width: 768px) {
    inset-inline-end:  -100%; /* Adjust the value to control the width of the additional background */
    inset-block-end:  0;
  }
}

.navbar.hidden-navbar {
  transform: translate3d(0, 150%, 0) !important;

  @media only screen and (min-width: 768px) {
    transform: translate3d(100%, 0, 0) !important;
  }
}

.bg {
  box-shadow: var(--shadow-z4) !important;
  transition: 0.5s box-shadow ease-in-out !important;
  align-items: middle;
  justify-self: stretch;
  overflow: visible;
  position: relative;
  padding: var(--spacing-xxs);

  @media only screen and (min-width: 768px) {
    border-radius: 8px 0 0 0;
    justify-self: end;
  }
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
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
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, auto);
  // block-size: 5.2rem;
  justify-self: stretch;
  position: relative;
}

.router-link-exact-active {
  background: var(--background-darker);
  text-decoration: underline dashed !important;
}

p {
  margin: 0;
}

.wordmark::after {
  @media only screen and (min-width: 768px) {
    content: "/";
    padding: var(--spacing-xxs);
    opacity: 0.5;
    font-weight: var(--fontWeight-normal);
  }
}
</style>
