<template>
  <transition name="slide" mode="out-in">
    <div
      class="fullscreen-menu"
      v-if="isOpen"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-heading"
    >
      <!-- <ThemeButton /> -->
      <!-- <p @click="closeMenu" class="close-button">Close Menu</p> -->
      <!-- <TextLink
        label="Handling Ligatures"
        link="https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures"
      /> -->
      <!-- <MyButton
        size="small"
        type="ghost"
        route=""
        label="Close Menu / ESC"
        @click="closeMenu"
        class="reversed close-button"
      >
        <span class="sr-only">Close Menu / ESC</span>
      </MyButton> -->
      <GridContainer>
        <nav class="reversed">
          <ul class="animate">
            <h1 class="animate fade"><router-link to="/">Home</router-link></h1>
            <h1 class="animate fade delay-1">
              <router-link to="/info">Info</router-link>
            </h1>
            <h1 class="animate fade delay-2">
              <router-link to="/docs">Docs</router-link>
            </h1>
            <h1 class="animate fade delay-2-5">
              <router-link to="/cv">CV</router-link>
            </h1>
          </ul>
        </nav>
      </GridContainer>
    </div>
  </transition>
</template>

<script>
import GridContainer from "./grid/GridContainer.vue";
// import ThemeButton from "./ThemeButton.vue";

// import MyButton from "./Button.vue";

export default {
  props: {
    isOpen: Boolean,
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--background-reversed);
  z-index: 1000;
  display: flex;
  justify-content: left;
  align-items: center;
  .close-button {
    position: absolute;
    right: var(--spacing-xs);
    top: var(--spacing-xs);
  }
  &::after {
    content: "";
    position: absolute;
    top: -100%;
    bottom: 0; /* Adjust the value to control the width of the additional background */
    right: 0;
    width: 100%; /* Adjust the value to control the width of the additional background */
    background-color: var(
      --background-reversed
    ); /* Specify the color of the additional background */
    z-index: -1; /* Set the z-index to be behind the navbar */
  }
  nav {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        // margin-bottom: var(--spacing-lg);
        a {
          color: var(--text-reversed) !important;
          text-decoration: none;
          font-size: var(--font-xxl);
          // font-weight: var(--font-bold);
          &:hover {
            color: var(--color-white);
            text-decoration: underline;
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
