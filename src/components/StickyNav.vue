<template>
  <GridContainer
    id="stickynav"
    class="navbar"
    :class="{ 'hidden-navbar': !showNavbar }"
  >
    <div class="bg reversed">
      <nav class="">
        <h1
          class="hidemobile nav-link wordmark"
          id="wordmark-jacques"
          style="font-weight: var(--font-reversed-bold)"
          tabindex="0"
          v-show="isJacquesVisible"
        >
          <router-link :to="{ name: 'Home' }">Jacques Ramphal</router-link>
        </h1>

        <h1
          class="showmobile nav-link"
          id="wordmark-jake"
          style="font-weight: var(--font-reversed-bold)"
          tabindex="0"
          v-show="isJakeVisible"
        >
          <router-link :to="{ name: 'Home' }">Jake Ramphal</router-link>
        </h1>

        <ul class="justify-end">
          <li class="nav-link" tabindex="0">
            <router-link :to="{ name: 'Blog' }">docs</router-link>
          </li>
          <li class="nav-link" tabindex="0">
            <router-link :to="{ name: 'Resume' }">info</router-link>
          </li>

          <!-- <li class="nav-link" tabindex="0">
            <router-link class="isDisabled" to="blog">writing</router-link>
          </li> -->
        </ul>
      </nav>
    </div>
  </GridContainer>
</template>

<script>
import GridContainer from "./grid/GridContainer.vue";

/**
 * @component
 */
const OFFSET = 60;
export default {
  name: "StickyNav",
  components: {
    GridContainer,
  },
  props: {
    title: {
      type: String,
      default: "Jacques Ramphal",
    },
  },
  computed: {
    isJacquesVisible() {
      // Determine whether Jacques version should be visible
      return window.innerWidth >= 740;
    },
    isJakeVisible() {
      // Determine whether Jake version should be visible
      return window.innerWidth < 740;
    },
  },
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0,
      scrollValue: 0,
    };
  },

  mounted() {
    this.lastScrollPosition = window.pageYOffset;
    window.addEventListener("scroll", this.onScroll);
    const viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    viewportMeta.content = "width=device-width, initial-scale=1";
    document.head.appendChild(viewportMeta);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },

  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
* {
  color: var(--text-reversed) !important;
  margin: 0;
  mix-blend-mode: normal;
}

:active {
  outline: transparent;
}

.navbar {
  right: 0;
  bottom: 0;
  max-width: none;
  mix-blend-mode: normal !important;
  overflow: visible;
  padding: 0 !important;
  position: fixed;
  transform: translate3d(0, 0, 0) !important;
  transition: 0.4s all cubic-bezier(0.68, -0.55, 0.27, 1.55) !important;
  width: 100%;
  z-index: 1000 !important;

  @media only screen and (min-width: 740px) {
    width: fit-content;
  }
}
/* Adds extra background colour to account for bouncing effect */
.navbar::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: -100%; /* Adjust the value to control the width of the additional background */
  right: 0;
  width: 100%; /* Adjust the value to control the width of the additional background */
  background-color: var(
    --background-reversed
  ); /* Specify the color of the additional background */
  z-index: -1; /* Set the z-index to be behind the navbar */
  @media only screen and (min-width: 740px) {
    right: -100%; /* Adjust the value to control the width of the additional background */
    bottom: 0;
  }
}

.navbar.hidden-navbar {
  transform: translate3d(0, 150%, 0) !important;

  @media only screen and (min-width: 740px) {
    transform: translate3d(100%, 0, 0) !important;
  }
}

.bg {
  transition: 0.5s box-shadow ease-in-out !important;
  align-items: middle;
  justify-self: stretch;
  overflow: visible;
  position: relative;
  padding: var(--spacing-xxs);

  @media only screen and (min-width: 740px) {
    border-radius: 8px 0 0 0;
    justify-self: end;
  }
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

nav {
  overflow: visible;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, auto);
  height: 5.2rem;
  justify-self: stretch;
  position: relative;
}

.nav-link > a {
  border-radius: 4px;
  padding: var(--spacing-xs);
  color: var(--text-reversed) !important;

  &:hover {
    background: var(--bg-darker-reversed);
    transition: all 0.25s ease;
  }
}

.router-link-exact-active {
  background: var(--bg-darker-reversed);
  text-decoration: none !important;
}

h1 {
  margin: 0;
}

li {
  float: left;
  font-size: 2em;
  line-height: 1;
  margin: 0;
  text-decoration: none;
  font-weight: var(--font-reversed-medium);

  &:first-child {
    padding-right: 0;
  }
}

.wordmark::after {
  @media only screen and (min-width: 740px) {
    content: "/";
    padding: var(--spacing-xxs);
    opacity: 0.5;
    font-weight: var(--font-bold);
  }
}
</style>
