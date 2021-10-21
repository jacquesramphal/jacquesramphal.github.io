<template>
    <div class="">
    <HeroBg header="404 Page not found"/>
<!-- <div class="grid-parent container">
      <div><TextDefault eyebrow=" " header="404 Page not found" details="The page you're looking for does not exist."/>
                           <router-link :to="{ name: 'Home' }"><p>Back to Home</p></router-link>
</div>
<ThumbMedium title="" filename="luna.jpg"/>
    </div>-->

        </div>
</template>

<script>
import HeroBg from "@/components/HeroBg.vue";
// import TextDefault from "@/components/text/TextDefault.vue";
// import ThumbMedium from "@/components/ThumbMedium.vue";

export default {
  name: "NotFound",
  components: {
      HeroBg,
    //   TextDefault,
    //   ThumbMedium,
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: inherit;
  mix-blend-mode: normal;
}
    .grid-parent {
      grid-gap: var(--spacing-lg) !important;
      }
      </style>