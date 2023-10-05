<template id="app">
  <!-- <router-view v-if="isLoggedIn" v-slot="{ Component }"> -->
  <router-view v-slot="{ Component }">
    <!-- <BreadCrumb v-if="!$route.meta.hideBreadCrumb" /> -->
    <ThemeButton v-if="!$route.meta.hideThemeButton" />
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>

    <fullscreen-menu
      :is-open="menuOpen"
      @close="menuOpen = false"
    ></fullscreen-menu>
    <StickyNav v-if="!$route.meta.hideNav" :menu-open="menuOpen">
      <template v-slot:menu-button>
        <!-- <a v-on:click="toggleMenu"> more </a> -->
        <MyButton
          type="ghost"
          :label="menuOpen ? 'close' : 'menu'"
          @click="toggleMenu"
        />
      </template>
    </StickyNav>
    <MainFooter v-if="!$route.meta.hideFooter" />
  </router-view>
  <!-- <TheLogin v-else @TheLogin::loginResult="handleLoginResult" /> -->
</template>

<script lang="js">
import MyButton from "./components/Button.vue";

import FullscreenMenu from "./components/FullscreenMenu.vue";
import StickyNav from "./components/StickyNav.vue";
import MainFooter from "./components/MainFooter.vue";
import TheLogin from "./components/TheLogin.vue";
import ThemeButton from "./components/ThemeButton.vue";
// import BreadCrumb from "./components/BreadCrumb.vue";
import { useRouter } from 'vue-router'; // Import Vue Router

export default {
  name: "App",
  components: {
    StickyNav,
    MainFooter,
    ThemeButton,
    TheLogin,
    FullscreenMenu,
    MyButton,
    // BreadCrumb,
},
data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
  },
  mounted() {
    const router = useRouter();

    // Use Vue Router's afterEach hook to close the menu on route change
    router.afterEach(() => {
      this.closeMenu();
    });
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
