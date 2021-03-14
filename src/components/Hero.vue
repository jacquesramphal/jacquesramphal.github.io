<template>
  <div id="hero" class="fullvh">
    <div id="footer" class="container">
      <div id="hero-text" class="">
        <h2
          class="subtle"
          data-aos="fade"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
        >
          {{ header }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
  props: {
    header: {
      type: String,
      default: "Hero Text",
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#hero {
  display: grid;
  min-height: 320px;
}
#hero-text {
  display: grid;
  grid-row: 1 / 8;
  justify-content: center;
  text-align: center;
  align-items: center !important;
}
</style>
