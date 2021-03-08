<template>
  <div id="details" class="offblack">
      <div class="grid-parent container">
        <h3 
          id="section-header" 
          class=""
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="0"
          data-aos-once="true"
          >{{ header }}
        </h3>
        <TextDefault
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
          data-aos-once="true"
          eyebrow="🖖 Subsection"
          header=""
          details="Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet. Lorem ipsum doler optima sit amet."
        />
        <TextDefault
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
          data-aos-once="true"
          eyebrow="👍 Skills"
          header="" 
          details="Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet. Lorem ipsum doler optima sit amet."
        />
        <TextDefault
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="400"
          data-aos-once="true"
          eyebrow="👏 Interests"
          header=""
          details="Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet. Lorem ipsum doler optima sit amet."
        />
        <TextDefault
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="500"
          data-aos-once="true"
          eyebrow="🙏 Mindfulness"
          header=""
          details="Lorem ipsum doler optima sit amet Lorem ipsum doler optima sit amet. Lorem ipsum doler optima sit amet."
        />
      </div>
    </div>
</template>

<script>
import TextDefault from "@/components/text/TextDefault.vue";

export default {
  name: "DetailCard",
  components: {
    TextDefault,
  },
  props: {
    header: {
      type: String,
      default: "Detail Card",
    },
    eyebrow: {
      type: String,
      default: "Eyebrow",
    },
    },
  

};
</script>

<style scoped>

* {
  color: white !important;
}
#details {
 /* height: 100vh; */
}
#section-header {
  grid-column: 1 / 4;
}
  #textdefault {
    grid-column: 1 / 4;
    padding: 1em 0 0 0;
  }
  #textdefault:first-child {
    background: yellow;
  }
  h3 {
   /* margin-top: -10px; */
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
#section-header {
  grid-column: 1 / 1;
}
 #textdefault {
    grid-column: auto;
    padding: 0 2.8em 2.8em 0;
  }

  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
  #section-header {
  grid-row: 1 / 3;

}
}}

</style>
