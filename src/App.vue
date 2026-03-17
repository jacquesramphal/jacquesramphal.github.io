<template id="app">
  <!-- <router-view v-if="isLoggedIn" v-slot="{ Component }"> -->
  <router-view v-slot="{ Component }">
    <!-- <BreadCrumb v-if="!$route.meta.hideBreadCrumb" /> -->
    <HeaderNav
      :toggle-menu="toggleMenu"
      v-if="!$route.meta.hideNav"
      :menu-open="menuOpen"
    >
      <!-- BREADCRUMB NAV START-->

      <!-- <template v-slot:menu-button>
        <TextLink
          style="text-decoration: none"
          :label="menuOpen ? $route.name : $route.name"
          @click="toggleMenu"
          :unicodeRight="menuOpen ? '⏶' : '⏷'"
          :isSvg="false"
          iconsize="16"
          
        />

      </template> -->
            <!-- BREADCRUMB NAV END-->

      <template v-slot:menu-button-mobile>
        <TextLink
          style="border: 0 !important; line-height: inherit"
          type="textlink"
          :label="menuOpen ? 'Close' : 'Menu'"
          @click="toggleMenu"
          
        />
      </template>
    </HeaderNav>
    <!-- <ThemeButton v-if="!$route.meta.hideThemeButton" /> -->
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>

    <fullscreen-menu
      :is-open="menuOpen"
      @close="menuOpen = false"
    ></fullscreen-menu>
    <!-- <StickyNav v-if="!$route.meta.hideNav" :menu-open="menuOpen">
      <template v-slot:menu-button>
        <MyButton
          type="ghost"
          :label="menuOpen ? 'close' : 'menu'"
          @click="toggleMenu"
        />
      </template>
    </StickyNav> -->
    <!-- <NewsletterSubscription /> -->
    <MainFooter v-if="!$route.meta.hideFooter" />
    <!-- <SimpleFooter v-if="!$route.meta.hideFooter" /> -->
  </router-view>
  <!-- <TheLogin v-else @TheLogin::loginResult="handleLoginResult" /> -->
</template>

<script lang="js">
import MyButton from "./components/Button/Button.vue";

// import NewsletterSubscription from "./components/form/NewsletterSubscription.vue";
import FullscreenMenu from "./components/FullscreenMenu.vue";
// import StickyNav from "./components/StickyNav.vue";
import HeaderNav from "./components/HeaderNav.vue";
import MainFooter from "./components/MainFooter.vue";
// import SimpleFooter from "./components/SimpleFooter.vue";
import TheLogin from "./components/TheLogin.vue";
// import ThemeButton from "./components/ThemeButton.vue";
// import BreadCrumb from "./components/BreadCrumb.vue";
import { useRouter } from 'vue-router'; // Import Vue Router

export default {
  name: "App",
  components: {
    // StickyNav,
    HeaderNav,
    MainFooter,
    // SimpleFooter,
    // ThemeButton,
    TheLogin,
    FullscreenMenu,
    MyButton,
    // NewsletterSubscription,
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
