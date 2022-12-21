<template>
  <PageWrapper id="project" class="">
    <HeroBanner
      center
      eyebrow=""
      class="animate glow"
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

    <!-- Section 1 - END - Make this a mapped component ^ duplicate for # of sections in data-->
  </PageWrapper>
</template>

<script>
import projectData from "@/assets/data/projects.json";

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
};
</script>

<style scoped></style>
