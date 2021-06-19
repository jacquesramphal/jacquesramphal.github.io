<template>
  <div
    class="container navbar"
    :class="{ 'hidden-navbar': !showNavbar }"
  >
  <div class="bg"
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
        <a href="#/">Jacques R.</a>
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
           <router-link to="Work">Work</router-link>
          <!--<router-link class="isDisabled" to="/">Work</router-link> -->

          <!-- <router-link :to="{ 'info/'+'#info'}">Info</router-link> -->
          <!-- <a href="mailto:jacques@ramphal.design">Email</a>
           <router-link to="Info">Info</router-link> -->
        </li>
      </ul>
    </nav>
  </div>
</div>
</template>

<script>
/**
 * @component
 */
const OFFSET = 60
export default {
  name: "StickyNav",
  props: {
    title: {
      type: String,
      default: "Jacques Ramphal",
    },
  },
  data () {
    return {
      showNavbar: true,
      lastScrollPosition: 0,
      scrollValue: 0
    }
  },

  mounted () {
    this.lastScrollPosition = window.pageYOffset
    window.addEventListener('scroll', this.onScroll)
    const viewportMeta = document.createElement('meta')
    viewportMeta.name = 'viewport'
    viewportMeta.content = 'width=device-width, initial-scale=1'
    document.head.appendChild(viewportMeta)
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll () {
      if (window.pageYOffset < 0) {
        return
      }
      if (Math.abs(window.pageYOffset - this.lastScrollPosition) < OFFSET) {
        return
      }
      this.showNavbar = window.pageYOffset < this.lastScrollPosition
      this.lastScrollPosition = window.pageYOffset
    }
  }
};
</script>
<style scoped>
* {
  color: inherit !important;
  mix-blend-mode: normal;
}
.bg {
  background: white;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  padding: 2.4em 2.8em 2em 2.8em !important;
 /*  border-top: 1px solid;
  border-color: var(--color-xxlight);*/
  box-shadow: var(--shadow-z3); 
}
.container, .navbar {
  overflow: visible;
  mix-blend-mode: normal !important;
  bottom: 0;
  position: fixed;
  z-index: 1000 !important;
  transform: translate3d(0, 0, 0) !important;
  transition: 0.4s all ease-in-out !important;
  max-width: none;
}
.navbar.hidden-navbar {
  transform: translate3d(0, 150%, 0) !important;
}

nav {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  position: relative;
}
h1 {
  font-size: 2em;
  line-height: 1;
  margin: 0;
}
li {
  font-size: 2em;
  line-height: 1;
  float: left;
  text-decoration: none;
  padding-left: 2.8rem;
  list-style-type: none;
}
li:first-child {
  padding-left: 0;
}
@media (prefers-color-scheme: dark) {
  .bg {
    background: var(--color-offblack);
    border-top: 1px solid; 
    border-color: black;
    box-shadow: none; 

  }
}

</style>
