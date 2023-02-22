<template>
  <PageWrapper id="work" class="">
    <!-- Replace this transition component with lifecycle hooks, see vue 3 tutorial -->
    <HeroBanner
      center
      eyebrow=""
      :key="entry.id"
      :title="`${entry.title}`"
      :subtitle="`${entry.description}`"
      :tag="`${entry.tag}`"
    />

    <GridContainer class="animate glow delay-2">
      <ThumbLarge
        title=""
        :filename="`${entry.images.filename1}`"
        :alt="`${entry.alt}`"
        route=""
      />
    </GridContainer>

    <!-- Section 1 - START -->
    <GridWrapper id="section1">
      <AnimatedComponent>
        <GridContainer class="width">
          <GridWrapper>
            <TextBlock
              left
              eyebrow=""
              header="Section 1"
              :details="`${entry.description}`"
            />

            <TextBlock
              left
              eyebrow=""
              header=""
              :details="`${entry.description}`"
            />
          </GridWrapper>
        </GridContainer>
      </AnimatedComponent>
      <AnimatedComponent>
        <GridContainer id="" style="padding-top: 0 !important" class="">
          <ThumbLarge
            class="width2"
            title=""
            filename="work/glo.svg"
            alt="Jacques working at Myplanet"
            caption="This is caption text."
          />
        </GridContainer>
      </AnimatedComponent>
    </GridWrapper>
    <!-- Section 1 - END - Make this a mapped component ^ duplicate for # of sections in data-->
    <TextImage flipped />
  </PageWrapper>
</template>

<script>
import workData from "@/assets/data/work.json";

// Import GSAP and ScrollTrigger
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
  name: "ProjectPage",
  components: {},
  computed: {
    workId() {
      return parseInt(this.$route.params.id);
    },
    entry() {
      return workData.entries.find((entry) => entry.id == this.workId);
    },
  },
  mounted() {
    const gsapTest = gsap.utils.toArray(".gsapTest");

    gsapTest.forEach((gsapTest) => {
      gsap.from(gsapTest, {
        scrollTrigger: {
          trigger: gsapTest,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 3,
          toggleActions: "restart pause reverse pause",
        },
        y: 100,
        // autoAlpha: 1,
        duration: 3,
        ease: "none",
      });
    });
  },
};
</script>

<style scoped></style>
