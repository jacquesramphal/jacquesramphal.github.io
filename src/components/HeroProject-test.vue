<template>
  <div id="hero-project" class="">
    <div class="container">
      <nav class="">
        <h1 id="wordmark" class="">
          {{ eyebrow }}
        </h1>
      </nav>
    </div>
<div id="grid-parent" class="grid-parent container">
      <TextDefault
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="200"
        data-aos-once="true"
        eyebrow= ""
        header="Project Template"
      
      />
      <ThumbMedium
          data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="400"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class=""
        title=""
        filename="template-preview.svg"
        alt="Jacques working at Myplanet"
      />
    </div>
    
  </div>
</template>

<script>
// import PageNav from "@/components/PageNav.vue";
import TextDefault from "@/components/text/TextDefault.vue";
import ThumbMedium from "@/components/ThumbMedium.vue";

export default {
  name: "HeroProject",
  props: {
    eyebrow: {
      type: String,
      default: "Eyebrow",
    },
    title: {
      type: String,
      default: "Project Title",
    },
  },
  components: {
    // PageNav,
    TextDefault,
    ThumbMedium,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: inherit;
  mix-blend-mode: normal;
}
#hero-project {
  display: grid;
  min-height: 320px;
  background-color: rgba(0, 0, 0, 0.1);

}
#hero-text {
  display: grid;
  grid-row: 1 / 8;
  justify-content: left;
  text-align: left;
  align-items: end !important;
}
@media (prefers-color-scheme: dark) {
  #hero-project {
    background-color: rgba(0, 0, 0, 0.25);
  }
}
/* ------------ BREAKPOINT MD ------------ */

@media only screen and (min-width: 740px) {

#hero-project {
  background-repeat: no-repeat;
  background-size: 100vh;
  background-position: 101% 60%;
  background-color: rgba(0, 0, 0, 0.1);
}
  #hero-text {
    max-width: 60vw;
    align-items: end !important;
  }
}
</style>
