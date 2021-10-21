<template>
  <div>
    <input
      @change="toggleTheme"
      id="checkbox"
      type="checkbox"
      class="switch-checkbox"
    />
    <label for="checkbox" class="switch-label">
      <!-- <span><a>Toggle Theme</a></span> -->
     <span><p>🌗</p></span>
      <div
        class="switch-toggle"
        :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"
      ></div>
    </label>
  </div>
</template>

<script>
export default {
  mounted() {
    const initUserTheme = this.getMediaPreference();
    this.setTheme(initUserTheme);
  },

  data() {
    return {
      userTheme: "light-theme",
    };
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.switch-checkbox {
  display: none;
}
/*
a {
    text-decoration: none !important;
} */
.switch-label {
  align-items: center;
  border: calc(var(--element-size) * 0.025) solid var(--accent-color);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  color: inherit !important;
  /* font-size: 2.4rem; */
  height: 2rem;
  position: absolute;
  right: 0;
  padding: 1.6rem;
  transition: all 0.5s ease;
  justify-content: space-between;
  width: auto;
  z-index: 1;
  margin: 1.6rem;
}
.switch-label:hover {
    background: var(--bg-darker);
}
/*
.switch-toggle {
  position: absolute;
  background-color: transparent;
  border: var(--border);
  border-width: 2px !important;
  margin-top: -2px;
  opacity: 0.5;
  border-radius: 8px;
  top: 0;
  left: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.3s ease, background-color 0.5s ease;
}

.switch-toggle-checked {
  transform: translateX(100%) !important;
} */
</style>
