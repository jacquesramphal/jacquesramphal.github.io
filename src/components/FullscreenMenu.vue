<template>
  <transition name="slide" mode="out-in">
    <div
      class="fullscreen-menu"
      v-if="isOpen"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-heading"
    >
    <p @click="closeMenu" class="close-button">Close Menu</p>
      <!-- <TextLink
        label="Handling Ligatures"
        link="https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures"
      /> -->
      <!-- <MyButton
        size="small"
        type="secondary"
        route=""
        label="Close Menu"
        @click="closeMenu"
        class="reversed close-button"
      >
        <span class="sr-only">Close Menu</span>
      </MyButton> -->
      <GridContainer>
        <nav>
          <ul class="">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/info">Info</router-link></li>
            <li><router-link to="/docs">Docs</router-link></li>
            <li><router-link to="/resume">CV</router-link></li>
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
          font-weight: var(--font-weight-bold);
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
  animation: slide 0.25s;
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
  animation: slide-out 0.25s;
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
