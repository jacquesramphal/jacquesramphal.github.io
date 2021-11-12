<template>
  <footer class="fullvh">
    <div id="footer" class="container">
      <div id="bio-text" class="">
        <h2 class="subtle">
          Des/Dev of things @
          <a href="https://myplanet.com/" target="_blank"
            ><span class="strike">Myplanet</span></a
          >
        </h2>
        <!-- <h1 class="subtle"> Designer/Developer at <a href="https://myplanet.com/" target="_blank">Myplanet</a></h1> -->
        <!-- <h1 class="subtle"> Lorem ipsum doler at <a href="https://myplanet.com/" target="_blank">Myplanet</a></h1> -->
      </div>
     
    </div>
  </footer>
</template>

<script>
export default {
  name: "MainFooterOld",
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
