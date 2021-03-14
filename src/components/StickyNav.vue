<template>
  <div 
    class="container" 
    data-aos="slide-up"
    data-aos-duration="1000"
    data-aos-delay="0"
    data-aos-once="true"
    data-aos-anchor-placement="top" 
      >
    <nav 
      class=""
      >
      <h1 
        id="wordmark" 
        class="subtle hidemobile"
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-anchor-placement="top" 
      >
        <a href="#/">Jacques Ramphal</a>
      </h1>
      <h1 class="subtle showmobile">
        Jake Ramphal
      </h1>
      <ul class="justify-end">
        <li 
          class=""
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="1200"
          data-aos-once="true"
          data-aos-anchor-placement="top" 

        >
          <!-- <router-link to="{ path: 'play/'+'#top'}">Work</router-link> -->
          <router-link to="/">Work</router-link>
        </li>
        <li 
          class=""
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="1500"
          data-aos-once="true"    
          data-aos-anchor-placement="top" 
        >
          <!-- <router-link :to="{ 'info/'+'#info'}">Info</router-link> -->
          <router-link to="Info">Info</router-link>
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
  /* mix-blend-mode: multiply !important;
  border-top: 1px solid var(--color-xxlight); */
  bottom: 0;
  padding-top: 1.6em !important;
  padding-bottom: 1.6em !important;
  position: fixed;
  z-index: 1000 !important;
  max-width: none;
  box-shadow: var(--shadow-z3);
  
}
.container:hover {
  mix-blend-mode: normal !important;
}
nav {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  position: relative;
}
nav h1, li {
  font-size: 2em;
  line-height: 1.5;
  font-weight: 400;
  margin: 0;
}
#wordmark a {
  color: var(--color-light) !important;
  text-decoration: none !important;
}
#wordmark a:hover {
  color: var(--color-dark) !important;
  text-decoration: underline !important;
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
}
</style>
