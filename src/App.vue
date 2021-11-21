<template>
  <div id="app">
    <router-view />
    <StickyNav />
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
<style></style>
