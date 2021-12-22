<template id="app">
  <router-view v-slot="{ Component }">
      <ThemeButton v-if="!$route.meta.hideNav" />
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
    <StickyNav v-if="!$route.meta.hideNav" />
    <MainFooter v-if="!$route.meta.hideFooter" />
  </router-view>
</template>

<script lang="js">
import StickyNav from "./components/StickyNav.vue";
import MainFooter from "@/components/MainFooter.vue";
import ThemeButton from "@/components/ThemeButton.vue";

// Register Global Component TBD
// import AnimatedComponent from "@/components/AnimatedComponent.vue";

export default {
  name: "App",
  components: {
    StickyNav,
    MainFooter,
    ThemeButton,
    // AnimatedComponent
  },
};
</script>
<style lang="sass">
@import "./assets/styles/css/all.css"

.fade-enter-active,
.fade-leave-active 
  transition: opacity 0.15s ease-in-out

.fade-enter-from,
.fade-leave-to 
  opacity: 0

</style>
