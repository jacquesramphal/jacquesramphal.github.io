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
      <div class="menu-scroll-wrapper">
        <div class="menu-content">
          <GridContainer>
            <GridParent>
              <nav class="">
                <ul class="animate delay-2">
                  <li v-for="(item, index) in menuItems" :key="index">
                    <router-link class="display" :to="item.route">
                      <DynamicText as="h1" tabIndex="0" :attrs="{ class: '' }" :text="item.text" />
                    </router-link>
                  </li>
                </ul>
              </nav>
            </GridParent>
          </GridContainer>
        </div>
      </div>
      <div v-if="isMenuActive" class="menu-overlay"></div>
    </div>
  </transition>
</template>

<script>
import GridContainer from './grid/GridContainer.vue';
// import MainFooter from "./MainFooter.vue";

export default {
  props: {
    isOpen: Boolean,
  },
  data() {
    return {
      isMenuActive: false, // Initially hidden
      scrollPosition: 0,
      menuItems: [
        { text: 'Home', route: '/' },
        { text: 'Library', route: '/library' },
        { text: 'Resume', route: '/resume' },
        { text: 'Design System', route: '/designsystem' },
      ],
    };
  },
  methods: {
    closeMenu() {
      this.$emit('close');
    },
    handleEscapeKey(event) {
      if (event.key === 'Escape') {
        this.closeMenu();
      }
    },
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
  },
  // Register the event listener when the component is mounted
  mounted() {
    window.addEventListener('keydown', this.handleEscapeKey);
  },
  // Remove the event listener when the component is destroyed
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleEscapeKey);

    // Clean up body scroll lock if menu is still open
    if (this.isOpen) {
      const scrollY = this.scrollPosition;
      document.documentElement.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      window.scrollTo(0, scrollY);
    }
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          // Save current scroll position
          this.scrollPosition = window.scrollY;

          // Lock body scroll
          document.documentElement.classList.add('menu-open');
          document.body.classList.add('menu-open');
          document.body.style.position = 'fixed';
          document.body.style.top = `-${this.scrollPosition}px`;
          document.body.style.width = '100%';
          document.body.style.overflowY = 'scroll'; // Keep scrollbar space
        } else {
          // Unlock body scroll
          const scrollY = this.scrollPosition;
          document.documentElement.classList.remove('menu-open');
          document.body.classList.remove('menu-open');
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.width = '';
          document.body.style.overflowY = '';

          // Restore scroll position
          window.scrollTo(0, scrollY);
        }
      },
    },
  },
  components: {
    // MainFooter,
    GridContainer,
  },
};
</script>

<style lang="scss">
// Prevent scrolling on the page when menu is open
html.menu-open,
body.menu-open {
  overflow: hidden !important;
  touch-action: none !important;
  -webkit-overflow-scrolling: auto !important;
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.fullscreen-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--background);
  border-left: var(--border);
  box-shadow: var(--shadow-heavy);
  z-index: 1000;
  border-block-end: var(--border);
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;

  @media only screen and (min-width: 1201px) {
    inline-size: 100vw;
  }

  .close-button {
    position: absolute;
    inset-inline-end: var(--spacing-xs);
    inset-block-start: var(--spacing-xs);
  }

  &::after {
    content: '';
    position: absolute;
    inset-block-start: 0;
    inset-block-end: 0;
    inset-inline-start: 100%;
    inline-size: 100%;
    background-color: inherit;
    z-index: -1;
    transition: inset-inline-start 0.3s ease;
  }
}

// Wrapper that enables proper scrolling
.menu-scroll-wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

// Content container that aligns to bottom when short, scrolls when tall
.menu-content {
  margin-top: auto;
  width: 100%;

  nav {
    padding-block-end: var(--spacing-lg);
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
