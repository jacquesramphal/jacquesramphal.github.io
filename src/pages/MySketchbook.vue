<template>
  <PageWrapper>
    <HeroBanner
      id="hero"
      title="My Sketchbook"
      subtitle="Visual explorations, UI experiments, and work-in-progress from across projects."
    />

    <GridContainer>
      <div class="gallery">
        <div
          v-for="(item, index) in images"
          :key="index"
          :class="['gallery__item', { 'gallery__item--full': item.fullWidth }]"
          @click="openLightbox(item)"
          tabindex="0"
          @keydown.enter="openLightbox(item)"
          @keydown.space.prevent="openLightbox(item)"
          role="button"
          :aria-label="`View ${item.caption}`"
        >
          <ImageCard :filename1="item.src" :alt="item.caption" />
          <p class="gallery__caption subtle">{{ item.caption }}</p>
        </div>
      </div>
    </GridContainer>

    <FullscreenImage :isOpen="lightboxOpen" :imageSrc="activeSrc" @close="closeLightbox" />
  </PageWrapper>
</template>

<script>
import FullscreenImage from '@/components/FullscreenImage.vue';
import ImageCard from '@/components/card/ImageCard/ImageCard.vue';

export default {
  name: 'MySketchbook',
  components: { FullscreenImage, ImageCard },
  data() {
    return {
      lightboxOpen: false,
      activeSrc: '',
      images: [
        { src: 'work/gob.svg', caption: 'GiftBook Concept Identity' },
        { src: 'work/j.svg', caption: 'Personal Logo Concepts' },
        { src: 'avatar/avatar.svg', caption: 'Avatar' },

        { src: 'work/dod.svg', fullWidth: true, caption: 'DevopsDays Toronto Identity' },
        { src: 'work/gob-sketches2.jpg', caption: 'GiftBook Sketches Identity' },
        { src: 'work/gob-sketches4.jpg', caption: 'GiftBook Sketches Identity' },
        { src: 'work/gob-sketches.jpg', caption: 'GiftBook Sketches Identity' },

        // {
        //   src: 'work/dod-program.png',
        //   fullWidth: true,
        //   caption: 'DevopsDays Toronto Program 2014',
        // },
        { src: 'work/mailback.svg', fullWidth: true, caption: 'Mailback Concept Identity' },

        { src: 'work/send-mail.svg', caption: 'Send Mail' },
        { src: 'work/find-me.svg', caption: 'Find Me' },
        { src: 'work/r-face.svg', caption: 'R Face' },
        { src: 'work/r-eye.svg', fullWidth: true, caption: 'R Eye' },
        { src: 'work/scope.svg', caption: 'Scope' },
        { src: 'work/a-logo.svg', caption: 'A Logo Concepts' },
        { src: 'work/wireframe-lib.png', fullWidth: true, caption: 'Wireframe Library' },
      ],
    };
  },
  methods: {
    resolveImage(filename) {
      return require(`@/assets/images/${filename}`);
    },
    openLightbox(item) {
      this.activeSrc = this.resolveImage(item.src);
      this.lightboxOpen = true;
    },
    closeLightbox() {
      this.lightboxOpen = false;
    },
  },
};
</script>

<style scoped lang="scss">
.gallery {
  grid-column: 1 / -1;
  columns: 3 280px;
  column-gap: var(--spacing-sm);
  padding-block: var(--spacing-md);
}

.gallery__item {
  display: block;
  break-inside: avoid;

  &--full {
    column-span: all;
  }
  margin: 0;
  margin-block-end: var(--spacing-sm);
  cursor: zoom-in;

  :deep(.grid-card) {
    display: block;
    inline-size: 100%;
  }

  :deep(figure) {
    margin: 0;
    inline-size: 100%;
  }

  :deep(.bg),
  :deep(img) {
    display: block;
    inline-size: 100%;
    block-size: auto !important;
    aspect-ratio: unset;
  }

  &:hover :deep(.bg) {
    opacity: 0.85;
  }

  &:focus-visible {
    outline: 2px solid var(--foreground);
    outline-offset: 2px;
    border-radius: 2px;
  }
}

.gallery__caption {
  display: block;
  padding-block-start: var(--spacing-xxs);
}

@media (max-width: 768px) {
  .gallery {
    columns: 1 180px;
  }
}

@media (max-width: 480px) {
  .gallery {
    columns: 1;
  }
}
</style>
