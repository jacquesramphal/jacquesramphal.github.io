<template>
  <!-- <div class="animate fade delay-2"> -->
    <!-- <input
      @change="toggleTheme"
      id="checkbox"
      type="checkbox"
      class="switch-checkbox"
    /> -->
    <!-- <label for="checkbox" class="switch-label"> -->
    <!-- <MyLogo /> -->
    <!-- 
      <MyButton
        size="large"
        type="ghost"
        route=""
        class="switch-toggle"
        :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"
        @click="toggleTheme"
      />
-->
    <MyButton
      type="ghost"
      label="Toggle Theme"
      @click="toggleTheme"
      class="animate glow delay-2"
      size="small"
      style="
        position: absolute;
        right: var(--spacing-xxs);
        top: var(--spacing-xxs);
        z-index: 1000;
      "
    />

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
import MyButton from "./Button.vue";

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

<style lang="sass" scoped>
:active
  outline: transparent

.switch-checkbox
  display: none

.switch-label
  border-radius: 0
  cursor: pointer
  color: var(--link) !important
  display: flex
  position: absolute
  right: 0
  top: 0
  padding: var(--spacing-xs) var(--spacing-xs)
  justify-items: center
  align-items: center
  z-index: 1000
  text-align: center
  // box-shadow: var(--shadow-deep)
  // height: var(--font-sm)
  // border: calc(var(--element-size) * 0.025) solid var(--accent-color)
  // border-radius: var(--spacing-xxs)
  // padding: var(--spacing-sm) var(--spacing-xs)
  // transition: all 0.5s ease
  // @media only screen and (min-width: 740px)
  //   padding: var(--spacing-lg)
  // @media only screen and (min-width: 1201px)
  //   padding: var(--spacing-lg)

.switch-toggle
  display: grid
  justify-items: center
  align-items: center
  text-align: center
  // font-size: var(--font-xs)
  // font-weight: var(--font-normal)

// .switch-label:hover
//   box-shadow: var(--shadow-hover)
//   background: var(--background-darker)


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

// .switch-toggle::before
//   content: "⊚"

// .switch-toggle:hover::before
//   content: "⊚"

// .switch-toggle:active::before
//   content: "⊖"

// .switch-toggle-checked::before
//   content: "⊚"



// TEXT SWITCH
.switch-toggle::before
  content: "Light"
  // padding-left: 1rem

.switch-toggle-checked::before
  content: "Dark"


  // Moving toggle

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
