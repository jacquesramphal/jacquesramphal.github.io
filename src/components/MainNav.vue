<template>
  <div class="container">
    <header class="">
      <h3 class="subtle showmobile">Jake Ramphal</h3>
      <h3 class="subtle hidemobile">Jacques Ramphal</h3>
      <h3 class="justify-end"><a href="#footer">Info</a></h3>
    </header>
  </div>
</template>

<script>
export default {
  name: "MainNav",
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding-bottom: 0 !important;
}
header {
  margin: 0 0 2.8em 0;
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(2, 1fr);
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  header {
    margin: 0 0 3.6em 0;
  }
}
</style>
