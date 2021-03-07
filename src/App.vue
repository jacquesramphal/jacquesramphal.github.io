<template>
  <div id="app" data-aos="fade">
    <StickyNav />
    <MainNav />
    <router-view />
    <MainFooterOld /> 
  </div>
</template>

<script>
import StickyNav from "./components/StickyNav.vue";
import MainNav from "./components/MainNav.vue";
import MainFooterOld from "./components/MainFooterOld.vue";

export default {
  name: "App",
  components: {
    StickyNav,
    MainNav,
    MainFooterOld,
  },
};
</script>

<!-- global styles -->
<style>
@import "./assets/styles/all.css";

#app {

}
</style>
