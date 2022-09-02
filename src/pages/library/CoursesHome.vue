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
        <!-- <TextBlock
          v-for="course in courses"
          :key="course.id"
          :header5="course.title"
          :details="course.description"
          eyebrow="eyebrow"
        /> -->
        <TextBlock
          v-for="course in courses.entries"
          :key="course.id"
          :header5="course.title"
          :details="course.description"
          eyebrow="eyebrow"
          :cta="course.title"
          :route="{ name: 'coursepage', params: { courseId: course.id } }"
        />
        <!-- <ThumbSmall
          v-for="(entry, i) in info.entries"
          :key="i"
          class="post"
          :eyebrow="entry.tag"
          :title="entry.title"
          :details="entry.description"
          :cta="entry.cta"
          :route="entry.route"
          :btnroute="entry.btnroute"
          :link="entry.link"
          :filename="entry.filename"
          :style="entry.bgcolor"
        /> -->
        <!-- <ThumbSmall
          v-for="(course, i) in courses.entries"
          :key="i"
          class="post"
          :title="entry.title"
          :details="entry.description"
          :cta="entry.cta"
          :route="entry.route"
        />
         -->
      </div>
    </GridContainer>

    <!-- <CardRow /> -->
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
