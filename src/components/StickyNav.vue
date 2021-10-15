<template>
  <div class="container navbar" :class="{ 'hidden-navbar': !showNavbar }">
    <div
      class="bg"
      data-aos="slide-left"
      data-aos-duration="1000"
      data-aos-delay="0"
      data-aos-once="true"
      data-aos-mirror="true"
      data-aos-anchor-placement="top"
    >
      <nav class="">
        <ul class="justify-start">
          <li
            class=" nav-link"
            data-aos-anchor-placement="top"
            data-aos-delay="0"
            data-aos-duration="1000"
            data-aos-once="true"
            data-aos="fade-left"
            tabindex="2"
          >
            <router-link to="Info">Info</router-link>
          </li>
          <!-- <li
            class="nav-link"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="250"
            data-aos-once="true"
            data-aos-anchor-placement="top"
            tabindex="3"
          >
            <router-link to="Work">Work</router-link>
            <router-link class="isDisabled" to="/">Work</router-link> 

            <router-link :to="{ 'info/'+'#info'}">Info</router-link> 
            <a href="mailto:jacques@ramphal.design">Email</a>
           <router-link to="Info">Info</router-link> 
          </li> -->
        </ul>
        <h1
          class="hidemobile nav-link justify-end"
          data-aos-anchor-placement="top"
          data-aos-delay="500"
          data-aos-duration="750"
          data-aos-once="true"
          data-aos="fade-left"
          id="wordmark"
          tabindex="1"
        >
            <router-link :to="{ name: 'Home' }">Jacques Ramphal</router-link>

<!--          <a href="#/">Jacques Ramphal</a> -->
        </h1>

        <h1
          class="showmobile nav-link justify-end"
          data-aos-anchor-placement="top"
          data-aos-delay="500"
          data-aos-duration="750"
          data-aos-once="true"
          data-aos="fade-left"
          id="wordmark"
          tabindex="1"
        >
            <router-link :to="{ name: 'Home' }">Jacques R.</router-link>
        </h1>
      </nav>
    </div>
  </div>
</template>

<script>
/**
 * @component
 */
const OFFSET = 60;
export default {
  name: "StickyNav",
  props: {
    title: {
      type: String,
      default: "Jacques Ramphal",
    },
  },
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0,
      scrollValue: 0,
    };
  },

  mounted() {
    this.lastScrollPosition = window.pageYOffset;
    window.addEventListener("scroll", this.onScroll);
    const viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    viewportMeta.content = "width=device-width, initial-scale=1";
    document.head.appendChild(viewportMeta);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },

  methods: {
    onScroll() {
      if (window.pageYOffset < 0) {
        return;
      }
      if (Math.abs(window.pageYOffset - this.lastScrollPosition) < OFFSET) {
        return;
      }
      this.showNavbar = window.pageYOffset < this.lastScrollPosition;
      this.lastScrollPosition = window.pageYOffset;
    },
  },
};
</script>
<style scoped>
* {
  color: inherit !important;
  margin: 0;
  mix-blend-mode: normal;
}
.container,
.navbar {
  bottom: 0;
  left: 0;
  max-width: none;
  mix-blend-mode: normal !important;
  overflow: visible;
  padding: 0 !important;
  position: fixed;
  right: 0;
  transform: translate3d(0, 0, 0) !important;
  transition: 0.4s all ease-in-out !important;
  width: auto;
  z-index: 1000 !important;
}
.navbar.hidden-navbar {
  transform: translate3d(0, 150%, 0) !important;
}
.bg:hover {
  /* box-shadow: var(--shadow-z5); */
}
.bg {
  align-items: middle;
  background: var(--background);

  border-radius: 16px;
  /*   border: var(--border); 
  box-shadow: var(--shadow-z1); */
  justify-self: stretch;
  margin: 0.8rem;
  overflow: visible;
  position: relative;
  padding: 0.8rem;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
nav {
  overflow: visible;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, auto);
  height: 5.2rem;
  justify-self: stretch;
  position: relative;
}
.nav-link > a {
  border-radius: 8px;
  padding: 1.6rem;
  /* text-decoration: none !important; */
}
.nav-link > a:hover {
  background: var(--bg-darker);
  transition: all 0.25s ease;

  /*  box-shadow: var(--shadow-z1); */
}
h1 {
  font-size: 2em;
  line-height: 1;
  margin: 0;
}
li {
  float: left;
  font-size: 2em;
  line-height: 1;
  list-style-type: none;
  margin: 0;
  text-decoration: none;
}
li:first-child {
  padding-right: 0;
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  .container,
  .navbar {
    transition: 0.8s all ease-in-out !important;
  }
  .bg {
    justify-self: end;
  }

  .navbar.hidden-navbar {
    transform: translate3d(100%, 0, 0) !important;
  }
}
</style>
