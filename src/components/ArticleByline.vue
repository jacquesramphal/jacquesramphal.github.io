<template>
  <div class="article-byline">
    <img
      src="@/assets/images/portrait.jpg"
      alt="Jacques Ramphal"
      class="article-byline__avatar"
      draggable="false"
      style="
        object-fit: cover !important;
        border-radius: 50%;
        margin: 0;
        cursor: default;
        inline-size: auto;
      "
    />
    <p class="article-byline__meta">
      <span class="article-byline__author">Jacques Ramphal</span>
      <span v-if="readTime" class="article-byline__separator article-byline__separator--author" aria-hidden="true">&middot;</span>
      <span v-if="readTime" class="article-byline__detail">{{ readTime }}</span>
      <span v-if="date" class="article-byline__separator" aria-hidden="true">&middot;</span>
      <span v-if="date" class="article-byline__detail">{{ date }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ArticleByline',
  props: {
    readTime: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.article-byline {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-block: var(--spacing-md);
  // padding-block-end: var(--spacing-md);

  // border-bottom: var(--border);
}

.article-byline__avatar-link {
  display: flex;
  text-decoration: none;
}

.article-byline__avatar {
  // Override .markdown img { width:100%; height:auto; object-fit:contain!important }
  width: var(--spacing-md) !important;
  height: var(--spacing-md) !important;
  object-fit: cover !important;
  object-position: center top;
  border-radius: 50%;
  margin: 0 !important;
  cursor: default !important;
  pointer-events: none;
}

.article-byline__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em;
  color: var(--color-text-subtle);
  margin: 0;
}

.article-byline__author {
  font-weight: 500;
  color: var(--color-text);
  white-space: nowrap;
  display: none;

  @media only screen and (min-width: 768px) {
    display: inline;
  }
}

.article-byline__separator {
  opacity: 0.6;
  user-select: none;

  &--author {
    display: none;

    @media only screen and (min-width: 768px) {
      display: inline;
    }
  }
}

.article-byline__detail {
  white-space: nowrap;
}
</style>
