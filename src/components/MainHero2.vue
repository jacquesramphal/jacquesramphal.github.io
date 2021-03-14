<template>
  <footer class="fullvh">
    <div id="footer" class="container">
      <div id="bio-text">
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
        <!-- <h1 class="subtle"> Designer/Developer at <a href="https://myplanet.com/" target="_blank">Myplanet</a></h1> -->
        <!-- <h1 class="subtle"> Lorem ipsum doler at <a href="https://myplanet.com/" target="_blank">Myplanet</a></h1> -->
      </div>
      <div id="contact" class="">
        <h6 id="copyright" class="hidemobile">© 2021 Jacques Ramphal</h6>
        <div id="contactlinks" class="">
          <h6
            class=""
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="300"
            data-aos-anchor-placement="top"
          >
            <a
              href="https://www.linkedin.com/in/jacquesramphal/"
              target="_blank"
              >Linkedin</a
            >
          </h6>
          <h6
            class=""
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="100"
            data-aos-anchor-placement="top"
          >
            <a href="mailto:jacquesramphal@gmail.com" target="_blank"
              ><span class="strike">Email</span></a
            >
          </h6>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "MainHero2",
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  display: grid;
  min-height: 320px;
}
#bio-text {
  display: grid;
  grid-row: 1 / 8;
  justify-content: center;
  text-align: center;
  align-items: center !important;
}
#copyright {
  grid-column: 1 / 9;
  color: rgba(0, 0, 0, 0.35);
}
#contactlinks {
  display: grid;
  grid-gap: 3.2em;
  align-items: end !important;
  grid-template-columns: repeat(2, 1fr);
}
</style>
