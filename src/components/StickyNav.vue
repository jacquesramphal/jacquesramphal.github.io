<template>
  <div
    class="container"

  >
    <nav class="">
      <h1 id="wordmark" class="subtle hidemobile">
        <a href="#/">Jacques Ramphal</a>
      </h1>
      <h1 class="subtle showmobile">
        Jake Ramphal
      </h1>
      <ul class="justify-end">
        <li class="">
          <router-link to="work">Work</router-link>
        </li>
        <li class="">
          <router-link to="info">Info</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
/**
 * @component
 */
export default {
  name: "StickyNav",
  props: {
    title: {
      type: String,
      default: "Jacques Ramphal",
    },
  },
};
</script>
<style scoped>
.container {
  background: var(--color-white);
  /* border-top: 1px solid var(--color-xxlight); */
  bottom: 0;
  padding-top: 1em !important;
  padding-bottom: 1em !important;
  position: fixed;
  z-index: 1000 !important;
  max-width: none;
  box-shadow: var(--shadow-z3);
  
}
nav {
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(2, 1fr);
  position: relative;

}
nav h1,
li {
  font-size: 2em;
  line-height: 1.5;
  font-weight: 400;
  margin: 0;
}
#wordmark a {
  color: var(--color-light) !important;
  text-decoration: none !important;
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {

}
</style>
