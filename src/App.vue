<template>
  <div id="app" data-aos="fade">
  <ThemeButton
      data-aos="fade"
      data-aos-duration="1000"
      data-aos-delay="1000"
      data-aos-once="true"
      data-aos-anchor-placement="top"
    />
    <StickyNav />
    <router-view />
  </div>
</template>

<script>
import StickyNav from "./components/StickyNav.vue";
import ThemeButton from "./components/ThemeButton.vue";


export default {
  name: "App",
  components: {
    StickyNav,
    ThemeButton,
  },
};

</script>
<style >
  
</style>