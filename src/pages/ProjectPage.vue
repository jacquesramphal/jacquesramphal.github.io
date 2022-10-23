<template>
  <PageWrapper id="project" class="">
    <!-- <h2>{{ $route.params.id }}</h2> -->
    <HeroBanner
      class="animate glow"
      :key="entry.id"
      :title="`${entry.title}`"
      :tag="`${entry.tag}`"
      :subtitle="`${entry.description}`"
    />
    <GridContainer class="animate glow delay-2" tight>
      <ThumbLarge
        title=""
        :filename="`${entry.images.filename1}`"
        :alt="`${entry.alt}`"
        route=""
      />
    </GridContainer>
    <DetailCard2
      id="detail1"
      class=""
      label1="Role"
      :value1="`${entry.role}`"
      label2="Type"
      :value2="`${entry.type}`"
      label3="Year"
      :value3="`${entry.year}`"
      :description="`${entry.description}`"
    />
    <!-- <DetailCard/> -->

    <!-- <StatsBar /> -->
    <!-- <StatsBar
      label1="Role"
      :value1="`${entry.role}`"
      label2="Type"
      :value2="`${entry.type}`"
      label3="Year"
      :value3="`${entry.year}`"
    /> -->
    <AnimatedComponent>
      <GridContainer>
        <ThumbLarge
          title=""
          :filename="`${entry.images.filename2}`"
          :alt="`${entry.images.alt1}`"
          route=""
          :caption="`${entry.images.caption1}`"
        />
      </GridContainer>
    </AnimatedComponent>
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
        <GridContainer id="" tight class="width">
          <ThumbLarge
            class=""
            title=""
            filename="work/glo.svg"
            alt="Jacques working at Myplanet"
            caption="This is caption text."
          />
        </GridContainer>
      </AnimatedComponent>
    </GridWrapper>

    <!-- Section 1 - END - Make this a mapped component ^ duplicate for # of sections in data-->

    <AnimatedComponent>
      <GridContainer>
        <ThumbLarge
          title=""
          :filename="`${entry.images.filename2}`"
          :alt="`${entry.images.alt1}`"
          route=""
          :caption="`${entry.images.caption1}`"
        />
      </GridContainer>
    </AnimatedComponent>
    <TextImage
      filename="work/glo.svg"
      flipped
      class=""
      style="background: var(--bg-darker)"
    />
    <TextImage filename="work/glo.svg" class="" />

    <CardRow header="Related Work" />
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
