<template>
  <aside class="sidebar">
    <nav class="nav-container">
      <!-- Logo/Home Link -->
      <TextLink
        class="home-link"
        :label="isMobileScreen ? '👨🏽‍🦲 Jacques Ramphal' : 'JR'"
        route="/"
      />

      <!-- Navigation Items -->
      <div class="nav-items">
        <!-- Work Link -->
        <TextLink 
          v-if="!breadcrumb"
          class="nav-link animate glow delay-1-5" 
          label="W" 
          route="/library" 
        />

       
        <!-- Theme Toggle -->
        <TextLink
          class="nav-link animate glow delay-2"
          label="T"
          @click="toggleTheme"
        />

        <!-- Font Toggle (Desktop Only) -->
        <div 
          v-show="isDesktopScreen && !menuOpen" 
          class="font-toggle"
        >
          <input type="checkbox" id="font" name="font" value="Serif" />
          <label for="font">Aa</label>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script>
// import GridContainer from "./grid/GridContainer.vue";

export default {
  name: "SidebarNav",
  // components: { GridContainer },
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
      isMobileScreen: false,
      isDesktopScreen: false,
    };
  },
  mounted() {
    // Theme initialization
    const initUserTheme = this.getMediaPreference();
    this.setTheme(initUserTheme);

    // Screen size listener
    this.onWindowResize();
    window.addEventListener("resize", this.onWindowResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onWindowResize);
  },
  methods: {
    toggleTheme() {
      const activeTheme = localStorage.getItem("user-theme");
      this.setTheme(activeTheme === "light-theme" ? "dark-theme" : "light-theme");
    },
    setTheme(theme) {
      localStorage.setItem("user-theme", theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },
    getMediaPreference() {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark-theme"
        : "light-theme";
    },
    onWindowResize() {
      this.isMobileScreen = window.innerWidth < 768;
      this.isDesktopScreen = window.innerWidth >= 768;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  z-index: 1000;
  background: var(--background);
  border: var(--border);

  // Mobile styles (bottom bar)
  inset-block-end: 0;
  inline-size: 100%;
  block-size: var(--spacing-lg);
  border-block-start: var(--border);
  border-inline: none;

  // Desktop styles (side bar)
  @media (min-width: 768px) {
    inset-block: 0;
    inset-inline-end: 0;
    inline-size: var(--spacing-lg);
    block-size: 100vh;
    border-block: none;
    border-inline-start: var(--border);
  }
}

.nav-container {
  height: 100%;
  padding: var(--spacing-xs);
  display: flex;

  // Mobile layout (horizontal)
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  // Desktop layout (vertical)
  @media (min-width: 768px) {
    flex-direction: column;
    justify-content: space-between;
    padding: var(--spacing-sm);
  }
}

.nav-items {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;

  // Mobile layout (horizontal)
  flex-direction: row;

  // Desktop layout (vertical)
  @media (min-width: 768px) {
    flex-direction: column;
    gap: var(--spacing-md);
  }
}

.nav-link {
  font-size: var(--font-md);
  text-decoration: none;
  
  &:hover {
    color: var(--accent-color);
  }
}

.home-link {
  font-size: var(--font-md);
  text-decoration: none;
}

.font-toggle {
  display: flex;
  align-items: center;
  gap: var(--spacing-xxs);
}

@media print {
  .sidebar {
    display: none;
  }
}
</style>

