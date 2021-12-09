<template id="app">
  <router-view v-slot="{ Component }">
    <transition name="fadeIn" mode="out-in">
      <component :is="Component" />
    </transition>
    <StickyNav v-if="!$route.meta.hideNavbar" />
  </router-view>
</template>

<script>
import StickyNav from "./components/StickyNav.vue";

export default {
  name: "App",
  components: {
    StickyNav,
  },
};
</script>
<style lang="sass">
@import "../dist/transitions/vue-animate-transitions.min.css"

// .test-enter-active,
// .test-leave-active 
//   transition: opacity 0.25s ease-in-out
// }

// .test-enter-from,
// .test-leave-to 
//   opacity: 0
// 
</style>
