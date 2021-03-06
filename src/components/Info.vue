<template>
  <div id="info" class="">
    <div id="grid-parent" class="grid-parent container">
         <TextDefault 
         data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="0"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        eyebrow=""
        header="Info"
       />
      <ThumbMedium
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="0"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class=""
        title=""
        filename="about.jpg"
      /></div>
       <div id="dark-section" class="grey">
      <div class="grid-parent container">

       <TextDefault 
        eyebrow=""
        header="Experience"
        details=""
       />
       <TextDefault 
        eyebrow="Subsection"
        header=""
        details="Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet. Lorem ipsum doler optima sit amet."
       />
       <TextDefault 
        eyebrow="Subsection"
        header=""
        details="Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet. Lorem ipsum doler optima sit amet."
       />
       <TextDefault 
        eyebrow="Subsection"
        header=""
        details="Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet. Lorem ipsum doler optima sit amet."
       />
       <TextDefault 
        eyebrow="Subsection"
        header=""
        details="Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet. Lorem ipsum doler optima sit amet."
       />
       <TextDefault 
        eyebrow="Subsection"
        header=""
        details="Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet. Lorem ipsum doler optima sit amet."
       />
    </div></div>
      <div id="dark-section" class="offblack">
      <div class="grid-parent container">

       <TextDefault 
        eyebrow=""
        header="Experience"
        details=""
       />
       <TextDefault 
        eyebrow="Subsection"
        header=""
        details="Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet. Lorem ipsum doler optima sit amet."
       />
       <TextDefault 
        eyebrow="Subsection"
        header=""
        details="Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet. Lorem ipsum doler optima sit amet."
       />
       <TextDefault 
        eyebrow="Subsection"
        header=""
        details="Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet. Lorem ipsum doler optima sit amet."
       />
       <TextDefault 
        eyebrow="Subsection"
        header=""
        details="Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet. Lorem ipsum doler optima sit amet."
       />
       <TextDefault 
        eyebrow="Subsection"
        header=""
        details="Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet. Lorem ipsum doler optima sit amet."
       />
    </div></div>
  </div>
</template>

<script>

import TextDefault from "@/components/text/TextDefault.vue";
import ThumbMedium from "@/components/ThumbMedium.vue";

export default {
  name: "Info",
  components: {
    
    TextDefault,
    ThumbMedium,

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container {
  padding-top: 2.8em !important;
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {

  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
   
  }
}
</style>

<style scoped>
</style>
