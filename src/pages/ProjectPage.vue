<template>
  <PageWrapper id="project" class="">
    <!-- Replace this transition component with lifecycle hooks, see vue 3 tutorial -->
    <transition appear @before-enter="beforeEnter" @enter="enter">
      <HeroBanner
        center
        eyebrow=""
        class="animate glow"
        :key="entry.id"
        :title="`${entry.title}`"
        :subtitle="`${entry.description}`"
        :tag="`${entry.tag}`"
    /></transition>

    <GridContainer class="animate glow delay-2">
      <ThumbLarge
        title=""
        :filename="`${entry.images.filename1}`"
        :alt="`${entry.alt}`"
        route=""
      />
    </GridContainer>

    <!-- Section 1 - START -->
    <!-- Replace this transition component with lifecycle hooks, see vue 3 tutorial -->
    <transition appear @before-enter="beforeEnter" @enter="enter">
      <GridWrapper id="section1">
        <AnimatedComponent>
          <GridContainer class="width">
            <GridWrapper>
              <TextBlock
                left
                eyebrow=""
                header="Section 1"
                :details="`${entry.description}`"
                :blockquote="`${entry.description}`"
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
          <GridContainer id="" style="padding-top: 0 !important">
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
    </transition>
    <!-- Section 1 - END - Make this a mapped component ^ duplicate for # of sections in data-->
  </PageWrapper>
</template>

<script>
import projectData from "@/assets/data/projects.json";

// Import GSAP and ScrollTrigger
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
  name: "ProjectPage",
  components: {},
  computed: {
    projectId() {
      return parseInt(this.$route.params.id);
    },
    entry() {
      return projectData.entries.find((entry) => entry.id == this.projectId);
    },
  },
  methods: {
    // where the animation will start from
    beforeEnter(el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(-100px)";
    },
    // where the animation will end up
    // NOTE: Find gsap set approach for animating components on load instead of all at oncuechange, see cv3 code and common problems thread
    enter(el) {
      gsap.to(el, {
        duration: 1,
        y: 0,
        rotate: 360,
        opacity: 1,
      });
    },
  },
};
</script>

<style scoped></style>
