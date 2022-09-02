<script setup>
import courses from "@/assets/data/courses.json";
import { useRoute } from "vue-router";
const route = useRoute();
const courseId = route.params.courseId;
const course = courses.find((course) => course.id === parseInt(courseId));
const { title, lessons } = course;
</script>


<template>
  <div class="Course page">
    <header>
      <p>
        <router-link :to="{ name: 'home' }">Back to courses</router-link>
      </p>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <router-link
        :to="`/courses/${courseId}/lessons/${course.lessons[0].id}`"
      >
        Start course
      </router-link>
    </header>
    <div>
      <LessonSummary
        v-for="(lesson, index) in lessons"
        :key="index"
        :course-id="courseId"
        :lesson="lesson"
        :num="index + 1"
      />
      <TextBlock
        v-for="(lesson, index) in lessons"
        :key="index"
        :course-id="courseId"

          :header5="course.title"
          :details="course.description"
          eyebrow="eyebrow"
          :cta="course.title"
          :route="{ name: 'coursepage', params: { courseId: course.id } }"
        />
    </div>
  </div>
</template>

<script>

export default {
  name: "CoursePage",
  components: {

  },

  
};
</script>