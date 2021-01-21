<template>
  <div id="app" data-aos="fade">
    <MainNav 
    title="Jacques Ramphal"
    />
    <router-view />
    <MainFooter /> 
  </div>
</template>

<script>
import MainNav from "./components/MainNav.vue";
import MainFooter from "./components/MainFooter.vue";

export default {
  name: "App",
  components: {
    MainNav,
    MainFooter,
  },
};
</script>

<!-- global styles -->
<style>
@import "./assets/styles/all.css";

</style>
