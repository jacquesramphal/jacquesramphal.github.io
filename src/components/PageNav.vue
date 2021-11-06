<template>
  <div class="container">
    <nav class="">
      <h1 id="tag" class="">
        <!-- <img id="logo" draggable="false" :src="require(`@/assets/images/j-monogram.svg`)" /> -->
        {{ tag }}
      </h1>
      <ul class="">
        <li>
          <a href="#detail1">Context Link</a>
        </li>
        <li>
          <a href="#detail2">Context Link</a>
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
  name: "PageNav",
  props: {
    tag: {
      type: String,
      default: "Topic or Tag",
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
  padding-bottom: 2.8em !important;
}
nav {
  /* margin: 0 0 2.8em 0; */
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 1fr;
}

nav h1,
li {
  font-size: 2em;
  line-height: 1.5;
  font-weight: 400;
  margin: 0;
}
#tag {
  color: var(--color-light) !important;
}
#tag a {
  color: var(--pink) !important;
  text-decoration: none !important;
}
/* #logo {
  height: 1.6em;
} *
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  .container {
    padding-bottom: 4em !important;
  }

  nav {
    grid-template-columns: repeat(2, 1fr);
    /* margin: 0 0 3.6em 0; */
  }
  ul {
    position: relative;
    justify-self: end;
  }
}
</style>
