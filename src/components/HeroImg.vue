<template>
  <div id="hero-img" class="">
<PageNav 
  header='test'
/>
    <div id="" class="bg-fixed bg-template container">

      <div id="hero-text" class="">
        <h2
          class="subtle"
          data-aos="fade"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-anchor-placement="top"
        >
          {{ header }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import PageNav from "@/components/PageNav.vue";

export default {
  name: "HeroImg",
  props: {
    header: {
      type: String,
      default: "Hero Text",
    },
  },
    components: {
      PageNav,
    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#hero-img {
  display: grid;
  min-height: 320px;
}
#hero-text {
  display: grid;
  grid-row: 1 / 8;
  justify-content: left;
  text-align: center;
  align-items: end !important;
}
</style>
