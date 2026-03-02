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
        <DynamicText as="h1" :text="information.name" :attrs="{ class: 'resume-header-name' }" />
        <DynamicText
          :text="information.label"
          :attrs="{ class: 'subtle resume-header-label' }"
          style="margin-block-end: var(--spacing-xs)"
        />
        <DynamicText
          class="resume-summary"
          text="Full Stack Design Lead with 12+ years of experience designing and shipping enterprise digital products. Specializes in design systems, AI-enabled product experiences, and design-to-development integration. Proven ability to lead cross-functional teams, architect token-based systems, and deliver production-ready front-end solutions."
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
      <resume-skills class="skills" :skills="skills" :settings="settings.skills" v-if="skills" />

      <!-- Social Links -->
      <!-- <resume-footer class="footer" :information="information.footer" /> -->
      <resume-list :list="information.list" class="list" v-if="information.list" />
    </aside>

    <!-- Right Side -->
    <resume-segments class="segments fadeInUp" :segments="segments" :settings="settings.segments" />
  </GridContainer>
</template>

<script>
// import ResumeFooter from "@/components/resume/ResumeFooter.vue";
import ResumeSegments from '@/components/resume/ResumeSegments.vue';
import ResumeSkills from '@/components/resume/ResumeSkills.vue';
import ResumeList from '@/components/resume/ResumeList.vue';
export default {
  name: 'TheResume',
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
  grid-template-areas: 'sidebar' 'segments';
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto auto;
  min-block-size: auto;

  @media only screen and (min-width: 768px) {
    grid-template-areas: 'sidebar segments';
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

    // Reset h1 to match original design (semantic h1 for ATS)
    h1 {
      font-size: var(--font-700); // Use h3 size from design system
      font-weight: var(--fontWeight-bold);
      line-height: var(--lineHeight-base);
      margin: 0;
    }
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
      inset-block-start: 0;
      inset-block-end: 0;
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

// Print styles - ATS-optimized single-column layout
@media print {
  .resume {
    display: block;
    grid-gap: 0.2rem; // Further compressed
    background-color: transparent;
    padding: 0;
  }

  .sidebar {
    position: static;
    width: 100%;
    padding: 0;
    flex: none;
    inline-size: 100%;
    margin: 0;
  }

  .resume-image {
    display: none; // Hide portrait for ATS
  }

  .resume-header {
    order: 1;
    margin-block-end: 0.2rem; // Further compressed
    padding: 0;

    h1 {
      font-size: 0.875rem; // 14pt for name
      font-weight: 700;
      margin: 0;
      line-height: 1.1;
    }

    p {
      margin: 0;
      line-height: 1.2;
    }
  }

  .list {
    order: 2;
    margin-block-end: 0.3rem; // Further compressed
  }

  .segments {
    order: 3;
    flex: none;
    margin: 0;
  }

  .skills {
    order: 4;
    margin-block-end: 0.2rem; // Further compressed
  }
}
</style>
