<template>
  <div class="container">
    <header class="">
      <h3 class="subtle showmobile" data-aos="fade">Jake Ramphal</h3>
      <h3 class="subtle hidemobile" data-aos="fade">{{ title }}</h3>
      <h3 class="justify-end" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="0"><a href="#footer">Info</a></h3>
    </header>
  </div>
</template>

<script>
 /**
 * @component
 */
export default {
  name: "MainNav",
  props: {
    title: {
      type: String,
      default: "Jacques Ramphal"
    }
  },
};
</script>
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
