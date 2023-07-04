<template>
  <GridContainer
    id="stickynav"
    class="navbar"
    :class="{ 'hidden-navbar': !showNavbar }"
  >
    <div class="bg">
      <nav class="">
        <h1
          class="hidemobile nav-link"
          id="wordmark"
          style="font-weight: var(--font-reversed-bold) !important"
          tabindex="0"
        >
          <router-link :to="{ name: 'Home' }">Jacques Ramphal</router-link>
        </h1>

        <h1
          class="showmobile nav-link"
          id="wordmark"
          style="font-weight: var(--font-reversed-bold)"
          tabindex="0"
        >
          <router-link :to="{ name: 'Home' }">Jake Ramphal</router-link>
        </h1>
        <ul class="justify-end">
          <li class="nav-link" tabindex="0">
            <router-link :to="{ name: 'Blog' }">docs</router-link>
          </li>
          <li class="nav-link" tabindex="0">
            <router-link :to="{ name: 'Resume' }">info</router-link>
          </li>

          <li class="nav-link" tabindex="0">
            <router-link class="isDisabled" to="blog">writing</router-link>
          </li>

          <!-- <li
            class="nav-link"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="250"
            data-aos-once="true"
            data-aos-anchor-placement="top"
          >
            <router-link to="Work">Work</router-link>
            <router-link class="isDisabled" to="/">Work</router-link> 

            <router-link :to="{ 'info/'+'#info'}">Info</router-link> 
            <a href="mailto:jacques@ramphal.design">Email</a>
           <router-link to="Info">Info</router-link> 
          </li> -->
        </ul>
      </nav>
    </div>
  </GridContainer>
</template>

<script>
import GridContainer from "./grid/GridContainer.vue";

/**
 * @component
 */
const OFFSET = 60;
export default {
  name: "StickyNav",
  components: {
    GridContainer,
  },
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

  beforeUnmount() {
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
  /* Reversed Version */
  color: var(--text-reversed) !important;
  /* Default Version */
  /* color: var(--text) !important; */
  margin: 0;
  mix-blend-mode: normal;
}
:active {
  outline: transparent;
}
.navbar {
  right: 0;
  left: 0;
  bottom: 0;
  max-width: none;
  mix-blend-mode: normal !important;
  overflow: visible;
  padding: 0 !important;
  position: fixed;
  transform: translate3d(0, 0, 0) !important;
  transition: 0.4s all ease-in-out !important;
  width: auto;
  z-index: 1000 !important;
}
.navbar.hidden-navbar {
  transform: translate3d(0, 150%, 0) !important;
}
.bg {
  transition: 0.5s box-shadow ease-in-out !important;
  align-items: middle;
  /* Reversed Version */
  background: var(--background-reversed);
  /* Default Version
  background: var(--background); */
  justify-self: stretch;
  overflow: visible;
  position: relative;
  padding: var(--spacing-xxs);
  /* box-shadow: var(--shadow-deep); */
  /* margin: 0.8rem; */
  /* border: var(--border); */
}
/* .bg:hover {
  box-shadow: var(--shadow-deep);
} */
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
  border-radius: 4px;
  padding: var(--spacing-xs);
  /* text-decoration: none !important; */
}
.nav-link > a:hover {
  /* Reversed Version */
  color: var(--link-reversed) !important;
  background: var(--bg-darker-reversed);
  /* Default Version */
  /* color: var(--link) !important;
  background: var(--bg-darker); */
  transition: all 0.25s ease;

  /*  box-shadow: var(--shadow-z1); */
}
.router-link-exact-active {
  /* Reversed Version */
  background: var(--bg-darker-reversed);
  /* Default Version */
  /* background: var(--bg-darker); */

  text-decoration: none !important;
  /* border-bottom: 2px solid var(--link);*/
}

h1 {
  margin: 0;
}
li {
  float: left;
  font-size: 2em;
  line-height: 1;
  margin: 0;
  text-decoration: none;
  /* Reversed Version */
  font-weight: var(--font-reversed-medium);
}
li:first-child {
  padding-right: 0;
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  .navbar {
    transition: 0.8s all ease-in-out !important;
  }
  #wordmark::after {
    content: "/";
    padding: var(--spacing-xxs);
    opacity: 0.5;
    font-weight: var(--font-bold);
  }
  .bg {
    border-radius: 8px 0 0 0;
    justify-self: end;
  }

  .navbar.hidden-navbar {
    transform: translate3d(100%, 0, 0) !important;
  }
}
</style>
