<template>
  <div id="app" data-aos="fade">
    <StickyNav />
    <router-view />
  </div>
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

<!-- global styles -->
<style>
@import "./assets/styles/all.css";

#app {

}
</style>
