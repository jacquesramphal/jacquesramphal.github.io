<template>
  <transition name="" mode="out-in">
    <!-- <transition name="slide" mode="out-in"> -->
    <div
      class="fullscreen-menu"
      v-if="isOpen"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-heading"
    >
      <!-- <nav class="menu-content">
        <ul class="animate delay-2">
          <li v-for="(item, index) in menuItems" :key="index">
            <router-link :to="item.route">
              <h1 tabIndex="0">{{ item.text }}</h1>
            </router-link>
          </li>
        </ul>
      </nav> -->
      
      <MainFooter class='mainfooter' />
    </div>
  </transition>
</template>

<script>
import MainFooter from "./MainFooter.vue";

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
    MainFooter,
  },
};
</script>

<style lang="scss">

.mainfooter {
  // background-color: var(--background-darker);
  margin-top: auto;
}


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
  flex-direction: column;
  justify-content: space-between;
  border-block-end: var(--border);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  
  @media only screen and (min-width: 1201px) {
    inline-size: fullvw;
  }

  .menu-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: var(--spacing-lg);
  }

  :deep(.main-footer) {
    margin-top: auto;
    width: 100%;
  }

  nav {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        margin-bottom: var(--spacing-md);
        a {
          text-decoration: none;
          color: var(--foreground) !important;
          &:hover {
            color: var(--link) !important;
          }
          h1 {
            margin: 0;
            font-size: var(--font-size-xl);
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
    transform: translateX(100%); /* Start off-screen to the left */
  }
  to {
    transform: translateX(0); /* Slide to the original position */
  }
}

.slide-leave-active {
  animation: slide-out 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

@keyframes slide-out {
  from {
    transform: translateX(0); /* Start at the original position */
  }
  to {
    transform: translateX(100%); /* Slide out to the right */
  }
}
</style>
