<template>
  <div id="hero" class="fullvh">
    <div id="footer" class="container">

      <div id="hero-text" class="">
        <h2
          class=""
          data-aos="fade"
          data-aos-delay="500"          
          data-aos-duration="2000"
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

export default {
  name: "Hero",
  props: {
    header: {
      type: String,
      default: "Designer of web things",
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: inherit;
  mix-blend-mode: normal;
}
#hero {
  display: grid;
  min-height: 320px;
  /* color: var(--color-action2) */
  background-image: url("../assets/images/splash.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 100% 100%;
}
#hero-text {
  display: grid;
  margin-top: -2.8em;
  grid-row: 1 / 8;
  justify-content: center;
  text-align: center;
  align-items: center !important;
}
h2 {
  font-weight: 900;
  color: white;

}
</style>
