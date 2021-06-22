<template>
  <div id="hero" class="">
    <div class="container">
      <div
        id="hero-text"
        class=""
        data-aos-anchor-placement="top"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos="fade"
        data-aos-mirror="true"
        data-aos-once="true"
      >
        <h2 class="" tabindex="0">
          <span>{{ header1 }}</span><span>{{ header2 }}</span>
        </h2>
      </div>
    </div>
  </div>
</template>

<!--
<span
          data-aos-anchor-placement="top"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos="flip-down"
          data-aos-mirror="true"
          data-aos-once="true"
        >
          <h2 class="" tabindex="0">
            {{ header1 }}
          </h2>
        </span>
        <span
          data-aos-anchor-placement="top"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos="slide-down"
          data-aos-mirror="true"
          data-aos-once="true"
        >
          <h2 class="" tabindex="0">
            {{ header2 }}
          </h2>
        </span> -->

<script>
export default {
  name: "Hero",
  props: {
    header1: {
      type: String,
      default: "Designer",
    },
    header2: {
      type: String,
      default: " of things",
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
