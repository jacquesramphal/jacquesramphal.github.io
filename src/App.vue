<template id="app">
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
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

.fade-enter-active,
.fade-leave-active 
  transition: opacity 0.15s ease-in-out

.fade-enter-from,
.fade-leave-to 
  opacity: 0

</style>
