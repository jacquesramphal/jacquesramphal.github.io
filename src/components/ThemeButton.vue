<template>
  <div>
    <input
      @change="toggleTheme"
      id="checkbox"
      type="checkbox"
      class="switch-checkbox"
    />
    <label for="checkbox" class="switch-label">
      <!--<span><a><p>Theme</p></a></span>-->

      <div
        class="switch-toggle"
        :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"
      ></div>
      <!-- <img
          class="justify-end"
          draggable="false"
          src="@/assets/images/j-logo.svg"
          alt="logo.svg"
          style="width: 32px"
        /> -->
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

<style lang="sass" scoped>
:active
  outline: transparent

.switch-checkbox
  display: none

.switch-label
  border: calc(var(--element-size) * 0.025) solid var(--accent-color)
  border-radius: var(--spacing-xxs)
  cursor: pointer
  color: var(--link) !important
  font-size: var(--font-sm)
  height: var(--font-xs)
  display: flex
  position: absolute
  right: 0
  // background: red
  // box-shadow: var(--shadow-deep)
  padding: var(--spacing-xs)
  // padding: var(--spacing-sm) var(--spacing-xs)
  transition: all 0.5s ease
  justify-items: center
  align-items: center
  z-index: 1
  margin: var(--spacing-xxs)
  text-align: center

.switch-label:hover
  // box-shadow: var(--shadow-hover)
  // background: var(--bg-darker)


// EMOJI SWITCH
// .switch-toggle::before
//   content: "🌒"

// .switch-toggle:hover::before
//   content: "🌓"

// .switch-toggle:active::before
//   content: "🌓"

// .switch-toggle-checked::before
//   content: "🌔"

// UNICODE SWITCH

.switch-toggle
  // display: grid
  // justify-items: center
  // align-items: center
  // text-align: center

.switch-toggle::before
  content: "⊚"

.switch-toggle:hover::before
  content: "⊚"

.switch-toggle:active::before
  content: "⊖"

.switch-toggle-checked::before
  content: "⊚"



// TEXT SWITCH
// .switch-toggle::before
//   content: "Light"
//   padding-left: 1rem

// .switch-toggle-checked::before
//   content: "Dark"


// .switch-toggle
//   position: absolute
//   background-color: transparent
//   border: var(--border)
//   border-width: 2px !important
//   margin-top: -2px
//   opacity: 0.5
//   border-radius: 8px
//   top: 0
//   left: 0
//   height: 100%
//   width: 50%
//   transform: translateX(0)
//   transition: transform 0.3s ease, background-color 0.5s ease

// .switch-toggle-checked
//   transform: translateX(100%) !important
</style>
