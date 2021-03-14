<template>
  <div id="app" data-aos="fade">
    <StickyNav />
    <router-view />
    <DetailCard 
      header="I'm a designer with a passion for documentation and development"
      class="fullvh reversed offblack"
      />
  </div>
</template>

<script>
import StickyNav from "./components/StickyNav.vue";
import DetailCard from "./components/card/DetailCard.vue";

export default {
  name: "App",
  components: {
    StickyNav,
    DetailCard
  },
};
</script>

<!-- global styles -->
<style>
@import "./assets/styles/all.css";

#app {
}
</style>
