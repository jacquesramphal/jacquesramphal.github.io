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
          <li
            class="nav-link"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="250"
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
          <a href="#/">Jacques Ramphal</a>
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
          <a href="#/">Jacques R.</a>
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
  mix-blend-mode: normal;
  margin: 0;
}

.container,
.navbar {
  padding: 0 !important;
  overflow: visible;
  mix-blend-mode: normal !important;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 1000 !important;
  transform: translate3d(0, 0, 0) !important;
  transition: 0.4s all ease-in-out !important;
  width: auto;
  max-width: none;
}
.navbar.hidden-navbar {
  transform: translate3d(0, 150%, 0) !important;
}
.bg {
  position: relative;
  overflow: visible;
  margin: 1rem;
  border: 1px solid;
  border-color: var(--color-xxxlight);
  border-radius: 1px;
  background: white;
  align-items: middle;
  justify-self: stretch;
  box-shadow: var(--shadow-z2);
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
nav {
  display: grid;
  grid-template-columns: repeat(2, auto);
  position: relative;
  justify-self: stretch;
  align-items: center;
  height: 5.2rem;
    overflow: visible;

}
.nav-link > a {
  padding: 1.6rem;
  border-radius: 1px;

  /* text-decoration: none !important; */
}
.nav-link > a:hover {
 background: rgba(0, 0, 0, 0.05); 
}
#wordmark {
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
  list-style-type: none;
  margin: 0;
}
li:first-child {
  padding-right: 0;
}
@media (prefers-color-scheme: dark) {
  .bg {
    background: var(--color-offblack);
    border-color: black;
  }
  .nav-link > a:hover {
    background: rgba(0, 0, 0, 0.25);
  }
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  .container,
  .navbar {
    transition: 0.8s all ease-in-out !important;
  }
  .bg {
    margin: 1.6rem;
    justify-self: end;
  }

  .navbar.hidden-navbar {
    transform: translate3d(100%, 0, 0) !important;
  }
}
</style>
