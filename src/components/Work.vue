<template>
  <div>
    <FormCentered />
  </div>
</template>

<script>
import FormCentered from "@/components/card/FormCentered.vue";

export default {
  name: "Work",
  components: {
    FormCentered,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-size: 10px;
}
.container {
  /*  background-color: var(--color-white);
 padding-top: 2.8em !important; */
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
  }
}
</style>

<style scoped>
@import "../assets/styles/all.css";
</style>
