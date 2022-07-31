<template id="app">
  <!-- <router-view v-if="isLoggedIn" v-slot="{ Component }"> -->
  <router-view v-slot="{ Component }">
    <ThemeButton v-if="!$route.meta.hideNav" />
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
    <StickyNav v-if="!$route.meta.hideNav" />
    <MainFooter v-if="!$route.meta.hideFooter" />
  </router-view>
  <!-- <TheLogin v-else @TheLogin::loginResult="handleLoginResult" /> -->
</template>

<script lang="js">

import StickyNav from "./components/StickyNav.vue";
import MainFooter from "@/components/MainFooter.vue";
// import TheLogin from "@/components/TheLogin.vue";
import ThemeButton from "@/components/ThemeButton.vue";

// Register Global Component TBD
// import AnimatedComponent from "@/components/AnimatedComponent.vue";

export default {
  name: "App",
  components: {
    StickyNav,
    MainFooter,
    ThemeButton,
    // TheLogin,
    // AnimatedComponent
  },
  // data() {
  //   return {
  //     userIsLoggedIn: false
  //   }
  // },
  // computed: {
  //   isLoggedIn() {
  //     return this.userIsLoggedIn
  //   }
  // },
  // methods: {
  //   handleLoginResult({loginResult}) {
  //     this.userIsLoggedIn = loginResult
  //   }
  // }
};
</script>

<style lang="sass">
@import "./assets/styles/css/all.css"
</style>
