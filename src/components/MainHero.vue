<template>
  <div>
    <section class="">
      <div id="bio-text" class="Full container">
        <h2
          class="subtle"
          data-aos="fade"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
        >
          Des/Dev of things @
          <a href="https://myplanet.com/" target="_blank"
            ><span class="strike">Myplanet</span></a
          >
        </h2>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "MainHero",
  props: {
    title: {
      type: String,
      default: "Jacques Ramphal",
    },
  },
};
</script>
<style scoped>
section {
  /* background: var(--color-dark); */
}
#footer {
  display: grid;
}
.container {
  /* margin: 2.8em 0 0  0; */
  display: grid;
}

section h6,
li {
  font-size: 2em;
  line-height: 1.5;
  font-weight: 400;
  margin: 0;
}
#bio-text {
  grid-column: 1 / 4;
  grid-row: 1 / 8;
  justify-self: center;
  text-align: center;
  align-items: center !important;
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  nav {
    /* padding: 2.8em !important; */
  }
}
</style>
