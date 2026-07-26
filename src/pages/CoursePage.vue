<template>
  <PageWrapper>
    <HeroBanner v-if="course" :title="course.title" :subtitle="course.subtitle" eyebrow="Course" />

    <GridContainer v-if="course">
      <div v-if="totalCount" class="course-progress" role="group" aria-label="Course progress">
        <div class="course-progress__track">
          <span class="course-progress__fill" :style="{ inlineSize: progressPct + '%' }" />
        </div>
        <p class="subtle course-progress__label">{{ readCount }} of {{ totalCount }} complete</p>
      </div>

      <GridParent tight rows class="chapters">
        <template v-for="chapter in course.entries">
          <ArticleCard
            v-if="chapter.published"
            :key="`chapter-${chapter.id}`"
            list
            mobileList
            borderless
            type="chapter"
            :eyebrow="chapter.tag"
            :title="chapter.title"
            :description="chapter.description"
            :route="chapter.route"
            :contentFile="chapter.contentFile"
            :read="isRead(chapter.slug)"
          />
          <div v-else :key="`soon-${chapter.id}`" class="chapter-row chapter-row--soon">
            <span class="chapter-row__tag subtle">{{ chapter.tag }}</span>
            <span class="chapter-row__title">{{ chapter.title }}</span>
            <span class="chapter-row__soon subtle">Coming soon</span>
          </div>
        </template>
      </GridParent>
    </GridContainer>
  </PageWrapper>
</template>

<script>
import { getCourseBySlug, getDefaultCourse, getPublishedChapters } from '@/utils/courseRegistry';
import { getCourseProgress, countRead } from '@/utils/courseProgress';

export default {
  name: 'MyCourse',
  props: {
    // Optional route param: /course/:slug. Falls back to the default course.
    slug: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      progress: {},
    };
  },
  computed: {
    course() {
      return (this.slug && getCourseBySlug(this.slug)) || getDefaultCourse() || null;
    },
    publishedChapters() {
      return this.course ? getPublishedChapters(this.course) : [];
    },
    totalCount() {
      return this.publishedChapters.length;
    },
    readCount() {
      if (!this.course) return 0;
      return countRead(
        this.course.slug,
        this.publishedChapters.map((c) => c.slug)
      );
    },
    progressPct() {
      if (!this.totalCount) return 0;
      return Math.round((this.readCount / this.totalCount) * 100);
    },
  },
  mounted() {
    this.refreshProgress();
    // Re-read when returning to the hub after reading a chapter.
    window.addEventListener('focus', this.refreshProgress);
    document.addEventListener('visibilitychange', this.refreshProgress);
  },
  beforeUnmount() {
    window.removeEventListener('focus', this.refreshProgress);
    document.removeEventListener('visibilitychange', this.refreshProgress);
  },
  methods: {
    refreshProgress() {
      if (!this.course) return;
      this.progress = getCourseProgress(this.course.slug);
    },
    isRead(chapterSlug) {
      return !!this.progress[chapterSlug];
    },
  },
};
</script>

<style scoped lang="scss">
.course-progress {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-block-end: var(--spacing-md);
}

.course-progress__track {
  flex: 1;
  block-size: var(--spacing-xxs);
  background: var(--background-darker);
  border-radius: 999px;
  overflow: hidden;
}

.course-progress__fill {
  display: block;
  block-size: 100%;
  inline-size: 0;
  background: var(--color-success);
  border-radius: 999px;
  transition: inline-size 0.3s ease;
}

.course-progress__label {
  margin: 0;
  white-space: nowrap;
  flex-shrink: 0;
}

// The list-row styling and the completion check live in ArticleCard (the
// single source — `list` + `mobileList` + the conditional `read` field), so
// the hub needs no card CSS of its own. It renders identically to the Library
// list cards.

.chapter-row--soon {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-sm);
  padding-block: var(--spacing-xs);
  border-block-start: var(--border);
  opacity: 0.55;
  cursor: default;
}

.chapter-row__tag {
  font-size: var(--font-2xs);
}

.chapter-row__title {
  flex: 1;
}

.chapter-row__soon {
  font-size: var(--font-2xs);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
</style>
