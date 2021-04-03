<template>
  <div id="hero" class="">
    <div class="container">
      <div id="hero-text" class="">
<z-text>
        <h2
          data-z 
          data-z-layers="3" 
          data-z-depth="0.5em"
          class=""
          data-aos="fade"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-anchor-placement="top"
        >
          {{ header }}
        </h2>
        </z-text>
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
  height: 100vh;
  /* color: var(--color-action2) */
  /*  background-image: url("../assets/images/splash.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 100% 100%; */
}
/* h2 {
  font-weight: 900;
  color: white;

} */
#hero-text {
  display: grid;
  margin-top: -2.8em;
  grid-row: 1 / 8;
  justify-content: center;
  text-align: center;
  align-items: center !important;
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  #hero {
    height: 100vh;
  }
}
</style>
