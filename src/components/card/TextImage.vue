<template>
  <div id="textimage" class="">
    <div id="grid-parent" class="grid-parent container">
      <TextDefault />
      <ThumbMedium
        data-aos="fade"
        data-aos-duration="4000"
        data-aos-delay="0"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class="blue"
        title=""
      />
    </div>
  </div>
</template>
<script>
import TextDefault from "@/components/text/TextDefault.vue";
import ThumbMedium from "@/components/ThumbMedium.vue";

export default {
  name: "TextImage",
  components: {
    TextDefault,
    ThumbMedium,
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
  color: inherit;
}
.grid-parent {
      grid-gap: var(--spacing-lg) !important;
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
  }
}
</style>
