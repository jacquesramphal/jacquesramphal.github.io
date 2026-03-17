<template>
  <!-- Sidebar Container -->
  <div
    id="sidebarnav"
    class="sidebar animate delay-1"
    :class="{ 'hidden-sidebar': false }"
    style="height: 100vh"
  >
    <!-- <div
    id="sidebarnav"
    class="sidebar animate delay-1"
    :class="{ 'hidden-sidebar': false }"
    style="height: 100vh"
    v-show="isDesktopScreen && !menuOpen"
  > -->
    <!-- Grid Container -->
    <GridContainer
      class="bg"
      style="
        display: flex;
        flex-direction: row;
        justify-items: space-between;
        text-decoration: none !important;
        height: 100%;
      "
    >
      <!-- Navigation Container -->
      <nav class="nav-container">
        <!-- Wordmark and Menu Button -->
        <span class="glow animate wordmark">
            <!--<router-link to="/">
            <MyLogo class="logo" />

            <img
              class="justify-end"
              draggable="false"
              src="@/assets/images/favicons/fav-dynamic.svg"
              alt=""
              style="width: 24px" /> 
          </router-link> -->

        <TextLink
            class=""
            
            :label="isMobileScreen ? '👨🏽‍🦲 Jacques Ramphal' : 'JR'"
            route="/"
          /> 
        </span>

        <!-- Navigation Links -->

        <ul
          class="links"
         
        >
          <li class="animate glow delay-1-5" v-if="!breadcrumb">
            <!-- v-show="isDesktopScreen && !menuOpen" -->

            <TextLink label="W" route="/library" />
          </li>

          <li
            v-show="isMobileScreen && !menuOpen"
            class="nav-link"
            tabindex="0"
          >
            <slot name="menu-button-mobile"></slot>
          </li>
          <li class="animate glow delay-2">
            <TextLink
              style="text-decoration: none"
              label="T"
              @click="toggleTheme"
            />
          </li>
          <!-- <div v-show="isDesktopScreen && !menuOpen" class="input-container">
            <input type="checkbox" id="font" name="font" value="Serif" /><label
              >Aa</label
            >
          </div> -->
        </ul>
      </nav>
    </GridContainer>
  </div>
</template>

<script>
import GridContainer from "./grid/GridContainer.vue";

const OFFSET = 60;
export default {
  name: "SidebarNav",
  components: { GridContainer },
  props: {
    breadcrumb: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuOpen: false,
      userTheme: "light-theme",
      backgroundColor: "#ffffff",
      showSidebar: true,
      lastScrollPosition: 0,
      scrollValue: 0,
      isMobileScreen: false,
      isDesktopScreen: false,
    };
  },
  mounted() {
    const initUserTheme = this.getMediaPreference();
    this.setTheme(initUserTheme);

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
    toggleTheme() {
      const activeTheme = localStorage.getItem("user-theme");
      if (activeTheme === "light-theme") {
        this.setTheme("dark-theme");
      } else {
        this.setTheme("light-theme");
      }
    },
    setTheme(theme) {
      localStorage.setItem("user-theme", theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },
    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (hasDarkPreference) {
        return "dark-theme";
      } else {
        return "light-theme";
      }
    },
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
      this.showSidebar = window.pageYOffset < this.lastScrollPosition;
      this.lastScrollPosition = window.pageYOffset;
    },
    onWindowResize() {
      this.showSidebar = true;
      this.isMobileScreen = window.innerWidth < 768;
      this.isDesktopScreen = window.innerWidth >= 768;
    },
    setFont(font) {
      this.selectedFont = font;
      this.$emit("update:font", font);
    },
  },
};
</script>

<style lang="scss">
body {
  /*SidebarNav Adjustment*/
  @media only screen and (min-width: 768px) {
    /* padding-inline-end: var(--spacing-lg); */
  }
}
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
button {
  border: 0 !important;
}
:active {
  outline: transparent;
}

.sidebar {
  display: flex;
  align-items: center;
  mix-blend-mode: normal !important;
  overflow: visible;
  position: fixed !important;
  transform: translate3d(0, 0, 0) !important;
  transition: 0.4s transform cubic-bezier(0.68, -0.55, 0.27, 1.55) !important;
  inline-size: 100vw !important;
  inset-inline-start: 0;
  inset-inline-end: 0;
  block-size: calc(var(--spacing-lg) * 0.75) !important;
  inset-block-end: 0;
  // padding-inline: var(--spacing-sm);
  // background: var(--background-darker);
  inset-inline-end: 0 !important;
  inset-inline-start: auto !important;

  //  border-inline-start: 1px solid var(--foreground);
  z-index: 100000 !important;
  transition: inline-size 0.3s ease-in-out;
  //   &:hover {
  //     inline-size: 96px !important;
  //   }

  @media only screen and (min-width: 768px) {
    inline-size: var(--spacing-lg) !important;
    block-size: 100vh !important;
    inset-inline-end: 0;
  }
}
.sidebar.hidden-sidebar {
  transform: translate3d(0, 0, 0) !important;
}
.bg {
  transition: 0.5s box-shadow ease-in-out !important;
  justify-self: flex-end;
  overflow: visible;
  position: relative;
  padding: 0 !important;
  inline-size: 100%;
  border-block-start: var(--border);
  // background: red;

  @media only screen and (min-width: 768px) {
    padding: 0 !important;
    border-block-start: none;
    // border-inline-start: var(--border);

    justify-self: end;
  }
}
.wordmark {

  // width: calc(var(--spacing-md) * 0.75) !important;

  padding-inline-start: var(--spacing-sm);
  @media only screen and (min-width: 768px) {
    width: var(--spacing-md);
    padding-inline-start: inherit;
    padding-block-start: var(--spacing-md);
  }
}
.logo {
  // display: none;
  // @media only screen and (min-width: 768px) {
  //   display: block;
  // }
}
.nav-container {
  display: flex;
  flex-direction: row;
  background: var(--background);
  inline-size: 100%;
  justify-content: space-between;
  @media only screen and (min-width: 768px) {
    flex-direction: column;
    height: 100%;
    flex-grow: 1;
  }
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  inline-size: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  bottom: 0;
  align-self: center;

  @media only screen and (min-width: 768px) {
    flex-direction: column;
    padding-bottom: var(--spacing-sm);
    justify-self: center;

    gap: var(--spacing-md);
  }
}
li {
  list-style: none;
  font-size: 2em;
  line-height: 1;
  margin: 0;
  text-decoration: none;
  &:first-child {
    padding-inline-end: 0;
  }
}
.links {
  padding-inline-end: var(--spacing-sm);

  @media only screen and (min-width: 768px) {
    padding-inline-end: inherit;

    padding-block-end: calc(var(--spacing-md) + var(--spacing-xs));
  }
}
nav {
  overflow: visible;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  justify-self: stretch;
  position: relative;
}
#richlink {
  text-decoration: none !important;
}
.router-link-exact-active {
  text-decoration: underline dashed !important;
}
p {
  margin: 0;
}
</style>
