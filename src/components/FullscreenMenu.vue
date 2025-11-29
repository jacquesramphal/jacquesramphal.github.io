<template>
  <div
    v-if="isOpen"
    class="fullscreen-menu"
    role="dialog"
    aria-modal="true"
    aria-labelledby="menu-heading"
    >
    <!-- <MainFooter /> -->
     
      <GridContainer>
        <GridParent>
          <nav class="">
            <ul class="animate delay-2">
              <li v-for="(item, index) in menuItems" :key="index">
                <router-link class="display" :to="item.route">
                  <DynamicText
                    as="h2"
                    tabIndex="0"
                    :attrs="{ class: '' }"
                    :text="item.text"
                  />
                </router-link>
                
              </li>

            </ul>
          </nav>
        </GridParent>
      </GridContainer>
      <div v-if="isMenuActive" class="menu-overlay"></div>
    </div>
</template>

<script>
import GridContainer from "./grid/GridContainer.vue";
// import MainFooter from "./MainFooter.vue";

export default {
  props: {
    isOpen: Boolean,
  },
  data() {
    return {
      isMenuActive: false, // Initially hidden

      menuItems: [
        { text: "Home", route: "/" },
        { text: "Library", route: "/library" },
        { text: "Resume", route: "/resume" },
        { text: "Design System", route: "/designsystem" },
      ],
    };
  },
  methods: {
    closeMenu() {
      this.$emit("close");
    },
    handleEscapeKey(event) {
      if (event.key === "Escape") {
        this.closeMenu();
      }
    },
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
  },
  // Register the event listener when the component is mounted
  mounted() {
    window.addEventListener("keydown", this.handleEscapeKey);
  },
  // Remove the event listener when the component is destroyed
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleEscapeKey);
  },
  watch: {
    isOpen(newVal) {
      // Toggle a CSS class on the <html> and <body> elements to control overflow
      if (newVal) {
        document.documentElement.classList.add("menu-open");
        document.body.classList.add("menu-open");
      } else {
        document.documentElement.classList.remove("menu-open");
        document.body.classList.remove("menu-open");
      }
    },
  },
  components: { 
    // MainFooter,
    GridContainer
   },
};
</script>

<style lang="scss">
.menu-open {
  overflow: hidden;
}
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  z-index: 999; /* Ensure it's above other content but below the menu */
}
.fullscreen-menu {
  position: fixed;
  inset-block-end: 0;
  inset-inline-end: 0;
  inline-size: 100vw;
  block-size: 100vh;
  background-color: var(--background);
  border-left: var(--border);
  box-shadow: var(--shadow-heavy);
  z-index: 1000;
  display: flex;
  justify-content: left;
  align-items: end;
  border-block-end: var(--border);
  @media only screen and (min-width: 1201px) {
    inline-size: fullvw;
    // inline-size: auto;

    // align-items: end;
  }
  .close-button {
    position: absolute;
    inset-inline-end: var(--spacing-xs);
    inset-block-start: var(--spacing-xs);
  }
  &::after {
  content: "";
  position: absolute;
  inset-block-start: 0; /* Start from the top */
  inset-block-end: 0; /* Extend to the bottom */
  inset-inline-start: 100%; /* Start from the right edge, making it initially invisible */
  inline-size: 100%; /* Ensure it spans the full width of the parent when it slides in */
  background-color: inherit; /* Maintain the background color */
  z-index: -1; /* Keep it behind the main content */
  transition: inset-inline-start 0.3s ease; /* Smooth transition for the slide-in effect */
}
  nav {
    padding-block-end: var(--spacing-lg);
    // background: red;
  
    grid-column: span 3;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        a {
          text-decoration: none;
          color: var(--foreground) !important;
          &:hover {
            color: var(--link) !important;
          }
        }
      }
    }
  }
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-active {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55),
              opacity 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-active {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55),
              opacity 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
