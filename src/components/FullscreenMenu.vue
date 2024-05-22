<template>
  <transition name="slide" mode="out-in">
    <div
      class="fullscreen-menu"
      v-if="isOpen"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-heading"
    >
      <GridContainer>
        <nav class="">
          <ul class="animate delay-2">
            <li v-for="(item, index) in menuItems" :key="index">
              <router-link class="display" :to="item.route">
                <DynamicText
                  as="h1"
                  tabIndex="0"
                  :attrs="{ class: ''}"
                  :text="item.text"
                />
              </router-link>
            </li>
          </ul>
        </nav>
      </GridContainer>
    </div>
  </transition>
</template>

<script>
import GridContainer from "./grid/GridContainer.vue";
export default {
  props: {
    isOpen: Boolean,
  },
  data() {
    return {
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
  components: { GridContainer },
};
</script>

<style lang="scss">
.menu-open {
  overflow: hidden;
}
.fullscreen-menu {
  position: fixed;
  inset-block-start: 0;
  inset-inline-start: 0;
  inline-size: 100%;
  block-size: 100%;
  background-color: var(--background);
  z-index: 1000;
  display: flex;
  justify-content: left;
  align-items: center;
  border-block-end: var(--border);
  @media only screen and (min-width: 1201px) {
    align-items: end;
  }
  .close-button {
    position: absolute;
    inset-inline-end: var(--spacing-xs);
    inset-block-start: var(--spacing-xs);
  }
  &::after {
    content: "";
    position: absolute;
    inset-block-start: -100%;
    inset-block-end: 0; /* Adjust the value to control the width of the additional background */
    inset-inline-end: 0;
    inline-size: 100%; /* Adjust the value to control the width of the additional background */
    background-color: var(
      --background
    ); /* Specify the color of the additional background */
    z-index: -1; /* Set the z-index to be behind the navbar */
  }
  nav {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        a {
          text-decoration: none;
          color: var(--text) !important;
          &:hover {
            color: var(--link) !important;
          }
        }
      }
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  animation: slide 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

@keyframes slide {
  from {
    transform: translateY(-100%); /* Start off-screen to the left */
  }
  to {
    transform: translateY(0); /* Slide to the original position */
  }
}

.slide-leave-active {
  animation: slide-out 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

@keyframes slide-out {
  from {
    transform: translateY(0); /* Start at the original position */
  }
  to {
    transform: translateY(-100%); /* Slide out to the right */
  }
}
</style>
