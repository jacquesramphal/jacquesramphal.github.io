<template>
  <div id="hero" class="">
    <div class="container">
      <div id="hero-text" class="">
        <h2
          class=""
          data-aos-anchor-placement="top"
          data-aos-duration="100"
          data-aos-easing="ease-in-out"
          data-aos="fade"
          data-aos-mirror="true"
          tabindex="0"
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
      default: "Designer. Developer",
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
h2 {
  transition: all 0.25s ease-in-out !important;
  outline: transparent !important;
}
/* h2:hover {
  font-weight: 400;
  word-spacing: 1em;
}
h2:active {
  font-weight: 900;
  word-spacing: -100%;
} */
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  #hero {
    height: 100vh;
  }
}
</style>
