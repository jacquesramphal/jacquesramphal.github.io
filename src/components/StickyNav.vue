<template>
  <div
    class="container"
    data-aos="slide-up"
    data-aos-duration="1000"
    data-aos-delay="0"
    data-aos-once="true"
    data-aos-mirror="true"
    data-aos-anchor-placement="top"
  >
    <nav class="">
      <h1
        class="hidemobile"
        data-aos-anchor-placement="top"
        data-aos-delay="500"
        data-aos-duration="1000"
        data-aos-once="true"
        data-aos="fade-right"
        id="wordmark"
        tabindex="1"
      >
        <a href="#/">Jacques Ramphal</a>
      </h1>

      <h1
        class="showmobile"
        data-aos-anchor-placement="top"
        data-aos-delay="500"
        data-aos-duration="1000"
        data-aos-once="true"
        data-aos="fade-right"
        id="wordmark"
        tabindex="1"
      >
        <a href="#/">Jake Ramphal</a>
      </h1>
      <ul class="justify-end">
        <li
          class=""
          data-aos-anchor-placement="top"
          data-aos-delay="1200"
          data-aos-duration="1000"
          data-aos-once="true"
          data-aos="fade-left"
          tabindex="2"
        >
          <!-- <router-link to="{ path: 'play/'+'#top'}">Work</router-link>
          <router-link to="Work">Work</router-link> -->
          <router-link to="Info">Info</router-link>
        </li>
        <li
          class=""
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="1500"
          data-aos-once="true"
          data-aos-anchor-placement="top"
          tabindex="3"
        >
          <!-- <router-link :to="{ 'info/'+'#info'}">Info</router-link> -->
          <a href="mailto:jacquesramphal@gmail.com">Email</a>
          <!-- <router-link to="Info">Info</router-link> -->
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
* {
  color: inherit !important;
  mix-blend-mode: normal;
}
.container {
  background: inherit;
  mix-blend-mode: normal !important;
  /* border-top: 1px solid var(--color-xxlight); */
  bottom: 0;
  padding: 1.6rem 2.8rem !important;
  position: fixed;
  z-index: 1000 !important;
  max-width: none;
  box-shadow: var(--shadow-z3);
}

nav {
  display: grid;
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
li {
  float: left;
  text-decoration: none;
  padding-left: 2.8rem;
  list-style-type: none;
}
li:first-child {
  padding-left: 0;
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
}

@media (prefers-color-scheme: dark) {
  .container {
    background: #0c0c0d;
  }
}
</style>
