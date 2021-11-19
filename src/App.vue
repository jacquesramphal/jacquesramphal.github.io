<template>
  <div id="app">
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
<style></style>
