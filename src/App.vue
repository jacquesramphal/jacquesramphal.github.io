<template>
  <div id="app" data-aos="fade">
    <MainNav />
    <WorkPlay />
    <MainFooter /> 
  </div>
</template>

<script>
import MainNav from "./components/MainNav.vue";
import WorkPlay from "./components/WorkPlay.vue";
import MainFooter from "./components/MainFooter.vue";

export default {
  name: "App",
  components: {
    MainNav,
    WorkPlay,
    MainFooter,
  },
};
</script>

<!-- global styles -->
<style>
@import "./assets/styles/all.css";
</style>
