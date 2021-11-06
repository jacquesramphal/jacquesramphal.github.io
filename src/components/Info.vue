<template>
  <div>
    <div class="container">
      <TextBlock
        left
        eyebrow="About Me"
        header="Multidisciplinary designer of things"
        details=""
      />
    </div>
    <div class="">
      <ThumbLarge
        title=""
        filename="about.jpg"
        alt="Jacques working at Myplanet"
      />
    </div>
    <Stats />
    <DetailCard />

    <HeroAbout
      title="Multidisciplinary designer of things"
      eyebrow="About Me"
    />
    <HeroBg />
    <HeroProject />

    <div id="" class="">
      <div id="grid-parent" class="container">
        <ThumbLarge
          title=""
          filename="about.jpg"
          alt="Jacques working at Myplanet"
        />
        <TextDefault
          eyebrow=" "
          header=" "
          details="Designer/Developer working and playing at Myplanet."
        />
      </div>
    </div>

    <FormCentered />
  </div>
</template>

<script>
import HeroAbout from "@/components/HeroAbout.vue";
import HeroBg from "@/components/HeroBg.vue";
import HeroProject from "@/components/HeroProject.vue";

import TextBlock from "@/stories/TextBlock.vue";

import ThumbLarge from "@/components/ThumbLarge.vue";
import DetailCard from "@/components/card/DetailCard.vue";
import Stats from "@/components/card/Stats.vue";
// import Form from "@/components/card/Form.vue";
import FormCentered from "@/components/card/FormCentered.vue";

export default {
  name: "Info",
  components: {
    HeroAbout,
    HeroBg,
    HeroProject,
    ThumbLarge,
    TextBlock,
    DetailCard,
    Stats,
    // Form,
    FormCentered,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#info > .container {
  /* padding-top: 0 !important; */
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  #image-highlight {
    height: 60vh;
  }
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    #info {
      margin: var(--spacing-lg);
    }
  }
}
</style>

<style scoped></style>
