<template>
  <PageWrapper>
    <HeroBanner
      id="hero"
      title="Title"
      subtitle="A collection of recent work and play lorem ipsum doler."
      eyebrow="Portfolio"
    />
    <GridContainer>
      <div id="courses" class="posts grid-parent">
   
        <TextBlock
          v-for="course in courses.entries"
          :key="course.id"
          :header5="course.title"
          :details="course.description"
          eyebrow="eyebrow"
          :cta="course.title"
          :route="{ name: 'coursepage', params: { courseId: course.id } }"
        />
        
      </div>
    </GridContainer>

  </PageWrapper>
</template>

<script>
import courses from "@/assets/data/courses.json";

export default {
  name: "CoursesHome",
  components: {},
  props: {
    course: {
    type: Object,
    required: true
  }
  },
  data() {
    return {
      courses,
    };
  },
};
</script>

<style lang="sass" scoped></style>
