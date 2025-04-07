<template>
  <GridContainer class="resume">
    <!-- Left Side -->
    <aside class="sidebar">
      <!-- Image -->

      <div class="resume-image">
        <img
          class="justify-end"
          draggable="false"
          src="@/assets/images/portrait.jpg"
          alt="Resume picture"
        />
      </div>

      <!-- Header -->

      <div class="resume-header">
        <DynamicText
          as="h4"
          :text="information.name"
          :attrs="{ class: 'resume-header-name' }"
        />
        <DynamicText
          :text="information.label"
          :attrs="{ class: 'subtle resume-header-label' }"
          style="margin-block-end: var(--spacing-xs)"
        />
        <DynamicText
          text="My work explores the intersection between design and development and seeks to embrace emerging technologies for a more efficient and inclusive future.
"
        />
      </div>

      <!-- Remove? -->

      <div v-if="information.slogan" class="resume-slogan">
        <DynamicText :text="information.slogan" />
      </div>

      <!-- Email Contact links - not used -->

      <!-- <resume-list
        :list="information.list"
        class="list"
        v-if="information.list"
      /> -->

      <!-- Skills & Tools -->
      <resume-skills
        class="skills"
        :skills="skills"
        :settings="settings.skills"
        v-if="skills"
      />

      <!-- Social Links -->
      <!-- <resume-footer class="footer" :information="information.footer" /> -->
      <resume-list
        :list="information.list"
        class="list"
        v-if="information.list"
      />
    </aside>

    <!-- Right Side -->
    <resume-segments
      class="segments fadeInUp"
      :segments="segments"
      :settings="settings.segments"
    />
  </GridContainer>
</template>

<script>
// import ResumeFooter from "@/components/resume/ResumeFooter.vue";
import ResumeSegments from "@/components/resume/ResumeSegments.vue";
import ResumeSkills from "@/components/resume/ResumeSkills.vue";
import ResumeList from "@/components/resume/ResumeList.vue";
export default {
  name: "TheResume",
  components: {
    ResumeList,
    // ResumeFooter,
    ResumeSegments,
    ResumeSkills,
  },
  props: {
    settings: {
      type: Object,
      required: true,
      // TODO add validator for mandatory fields
    },
    information: {
      type: Object,
      required: true,
      // TODO add validator for mandatory fields
    },
    segments: {
      type: Array,
      required: true,
      // TODO add validator for mandatory fields
    },
    skills: {
      type: Array,
      required: true,
      // TODO add validator for mandatory fields
    },
  },
};
</script>

<style scoped lang="scss">
.resume {
  display: grid;
  grid-gap: var(--spacing-lg);
  color: var(--foreground);
  font-size: var(--font-2xs);
  grid-template-areas: "sidebar" "segments";
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto auto;
  min-block-size: auto;

  @media only screen and (min-width: 768px) {
    grid-template-areas: "sidebar segments";
    grid-template-columns: 30% 1fr;
    grid-template-rows: auto 1fr auto;
  }

  // ALIGNMENT
  .resume-image {
    margin-block-end: var(--spacing-md);
    img {
      inline-size: 100%;
      max-width: 100%;
      border-radius: 0.8rem;
      aspect-ratio: 16 / 9 !important;

      @media print {
        aspect-ratio: 1 / 1 !important;
        inline-size: 6.4rem;
      }

      @media only screen and (min-width: 768px) {
        aspect-ratio: 1 / 1 !important;
        inline-size: 12rem;
      }
    }
  }
  .header {
    grid-area: header;
  }
  .resume-header {
    margin-block-end: var(--spacing-md);
  }
  .segments {
    grid-area: segments;
    // background-color: pink;
  }
  .sidebar {
    grid-area: sidebar;
    z-index: 1;
    overflow-x: hidden;
    position: relative;
    inline-size: auto;
    justify-content: start;
    flex-direction: column;
    display: flex;
    // background-color: pink;
    flex: 1;

    @media only screen and (min-width: 768px) {
      inline-size: 25vw;
      padding-block-start: var(--spacing-lg);
      inset-block-start:  0;
      inset-block-end:  0;
      position: fixed;
      // background-color: red;
      padding-block-end: var(--spacing-md) !important;
    }

    /* override styles when printing */
  }
  .footer {
    grid-area: footer;
  }
}

// Print styles
@media print {
  .resume {
    display: flex;
    background-color: red !important;
  }

  .sidebar {
    flex: 0 0 25vw;
    max-width: 25vw;
  }

  .segments {
    flex: 1;
  }
}
</style>
