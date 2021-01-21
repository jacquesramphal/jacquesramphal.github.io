<template>
  <div id="app" data-aos="fade">
    <MainFooter /> 
  </div>
</template>

<script>
import MainFooter from "./components/MainFooter.vue";

export default {
  name: "Project",
  components: {
    MainFooter,
  },
};
</script>

<!-- global styles -->
<style>
@import "./assets/styles/all.css";
</style>
