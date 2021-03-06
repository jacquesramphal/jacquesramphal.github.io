<template>
  <div id="app" data-aos="fade">
    <MainNav />
    <router-view />
    <MainFooterOld /> 
  </div>
</template>

<script>
import MainNav from "./components/MainNav.vue";
import MainFooterOld from "./components/MainFooterOld.vue";

export default {
  name: "App",
  components: {
    MainNav,
    MainFooterOld,
  },
};
</script>

<!-- global styles -->
<style>
@import "./assets/styles/all.css";

</style>
