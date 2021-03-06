<template>
  <div class="container">
    <!-- <h5 class="subtle showmobile" data-aos="fade">Jake Ramphal</h5>
      <h5 class="subtle hidemobile" data-aos="fade">{{ title }}</h5>
      <h5 class="justify-end" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="0"><a href="#/info">Info</a></h5> -->
    <nav class="">
      <h1 class="subtle">
        {{ title }}
      </h1>
      <ul class="justify-end">
        <li
          class=""
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
        >
          <a href="#/">Work</a>
        </li>
        <li
          class=""
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="300"
        >
          <a href="#/info">Info</a>
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
  name: "MainNav",
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
  padding-bottom: 1.6em !important;
}
nav {
  /* margin: 0 0 2.8em 0; */
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(2, 1fr);
}
nav h1,
li {
  font-size: 2em;
  line-height: 1.5;
  font-weight: 400;
  margin: 0;
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  nav {
    /* margin: 0 0 3.6em 0; */
  }
}
</style>
