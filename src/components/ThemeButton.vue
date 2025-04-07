<template>
  <!-- <div class="animate fade delay-2"> -->
  <!-- <input
      @change="toggleTheme"
      id="checkbox"
      type="checkbox"
      class="switch-checkbox"
    /> -->
  <!-- <label for="checkbox" class="switch-label"> -->
  <!-- <MyLogo
    @click="toggleTheme"

    style="
        position: absolute;
        inset-inline-end:  var(--spacing-sm);
        inset-block-start:  var(--spacing-sm);
        cursor: pointer;
        z-index: 1000;
      " /> -->
  <MyButton
    type="ghost"
    label="Toggle Theme"
    @click="toggleTheme"
    class="animate glow delay-2"
    size="small"
    style="
      position: absolute;
      inset-inline-end:  var(--spacing-xxs);
      inset-block-start:  var(--spacing-xxs);
      z-index: 1000;
    "
  />

  <!--     
      <MyButton
        size="large"
        type="ghost"
        route=""
        class="switch-toggle"
        :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"
        @click="toggleTheme"
      /> -->

  <!-- <TextLink
        cta="test"
        class="switch-toggle"
        :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"
      /> -->
  <!-- <a v-on:click="toggleMenu" style="position: fixed; z-index: 10000; cursor: pointer; margin: var(--spacing-xs) var(--spacing-sm)"><p>Menu</p></a> -->

  <!-- <h6
        class="switch-toggle"
        :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"
      ></h6> -->
  <!-- <img
          class="justify-end"
          draggable="false"
          src="favicon2.svg"
          alt="theme-toggle"
          style="width: var(--spacing-big); border-radius: 0 !important;"
        /> -->
  <!-- </label> -->
  <!-- </div> -->
</template>

<script>
// import MyLogo from "./MyLogo.vue";
import MyButton from "./Button/Button.vue";

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
  components: { MyButton },
};
</script>

<style lang="scss" scoped>
:active {
  outline: transparent;
}

.switch-checkbox {
  display: none;
}

.switch-label {
  border-radius: 0;
  cursor: pointer;
  color: var(--link);
  display: flex;
  position: absolute;
  inset-inline-end: 0;
  inset-block-start: 0;
  padding: var(--spacing-xs) var(--spacing-xs);
  justify-items: center;
  align-items: center;
  z-index: 1000;
  text-align: center;
}

.switch-toggle {
  display: grid;
  justify-items: center;
  align-items: center;
  text-align: center;

  &::before {
    content: "Light";
  }
}

.switch-toggle-checked {
  &::before {
    content: "Dark";
  }
}
</style>
