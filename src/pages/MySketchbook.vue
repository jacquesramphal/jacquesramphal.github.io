<template>
  <PageWrapper>
    <HeroBanner
      id="hero"
      title="My Sketchbook"
      subtitle="Visual explorations, UI experiments, and work-in-progress from across projects."
      as="h1"
    />

    <GridContainer style="padding-top: 0 !important">
      <div class="gallery">
        <div
          v-for="project in projects"
          :key="project.name"
          :class="['gallery__item', { 'gallery__item--full': project.fullWidth }]"
          @click="openProject(project)"
          tabindex="0"
          @keydown.enter="openProject(project)"
          @keydown.space.prevent="openProject(project)"
          role="button"
          :aria-label="`View ${project.caption}`"
        >
          <ImageCard
            :filename1="project.mainRelative"
            :alt="project.caption"
            :size="project.size"
          />
          <p class="gallery__caption subtle">{{ project.caption }}</p>
        </div>
      </div>
    </GridContainer>

    <!-- Single-image lightbox (projects with no process images) -->
    <FullscreenImage :isOpen="lightboxOpen" :imageSrc="activeSrc" @close="closeLightbox" />

    <!-- Process gallery modal -->
    <Teleport to="body">
      <transition name="fade">
        <div
          v-if="activeProject"
          class="process-modal"
          role="dialog"
          aria-modal="true"
          @click.self="closeProcess"
        >
          <TextLink @click="closeProcess" label="Close" class="process-modal__close" />
          <div class="process-modal__grid">
            <img
              v-for="(src, i) in activeProject.process"
              :key="i"
              :src="src"
              :alt="`${activeProject.caption} — step ${i + 1}`"
              draggable="false"
            />
          </div>
        </div>
      </transition>
    </Teleport>
  </PageWrapper>
</template>

<script>
import FullscreenImage from '@/components/FullscreenImage.vue';
import ImageCard from '@/components/card/ImageCard/ImageCard.vue';

function buildProjects() {
  // Scans assets/images/work/ recursively.
  // Convention:
  //   work/<project>/config.json     → optional props (caption, fullWidth, size, …)
  //   work/<project>/<image>         → main image for that project
  //   work/<project>/<folder>/<img>  → process images shown in modal
  const imgCtx = require.context('@/assets/images/work', true, /\.(png|jpe?g|svg|gif|webp)$/i);
  const cfgCtx = require.context('@/assets/images/work', true, /config\.json$/);
  const map = {};

  // Load config files first so image keys can merge into them
  cfgCtx.keys().forEach((key) => {
    const folder = key.replace(/^\.\//, '').split('/')[0];
    map[folder] = {
      name: folder,
      caption: folder.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      mainRelative: null,
      process: [],
      ...cfgCtx(key), // spread config.json props (caption, fullWidth, size, etc.)
    };
  });

  imgCtx.keys().forEach((key) => {
    const rel = key.replace(/^\.\//, '');
    const parts = rel.split('/');
    if (parts.length < 2) return; // skip root-level flat files

    const folder = parts[0];
    if (!map[folder]) {
      map[folder] = {
        name: folder,
        caption: folder.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        mainRelative: null,
        process: [],
      };
    }

    if (parts.length === 2) {
      if (!map[folder].mainRelative) {
        map[folder].mainRelative = `work/${rel}`;
      }
    } else {
      map[folder].process.push(imgCtx(key));
    }
  });

  return Object.values(map).filter((p) => p.mainRelative);
}

export default {
  name: 'MySketchbook',
  components: { FullscreenImage, ImageCard },
  data() {
    return {
      projects: buildProjects(),
      // single-image lightbox
      lightboxOpen: false,
      activeSrc: '',
      // process gallery modal
      activeProject: null,
    };
  },
  watch: {
    activeProject(val) {
      if (val) {
        document.addEventListener('keydown', this.onKeydown);
      } else {
        document.removeEventListener('keydown', this.onKeydown);
      }
    },
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.onKeydown);
    document.body.style.overflow = '';
  },
  methods: {
    onKeydown(e) {
      if (e.key === 'Escape') this.closeProcess();
    },
    openProject(project) {
      if (project.process.length > 0) {
        this.activeProject = project;
        document.body.style.overflow = 'hidden';
      } else {
        this.activeSrc = require(`@/assets/images/${project.mainRelative}`);
        this.lightboxOpen = true;
      }
    },
    closeLightbox() {
      this.lightboxOpen = false;
    },
    closeProcess() {
      this.activeProject = null;
      document.body.style.overflow = '';
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
    margin-block-start: var(--spacing-sm);
  }
  margin: 0;
  padding-block-end: var(--spacing-sm);
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

// Process gallery modal
.process-modal {
  position: fixed;
  inset: 0;
  z-index: 200000;
  background: var(--background);
  overflow-y: auto;
  padding: var(--spacing-xl) var(--spacing-md) var(--spacing-md);
}

.process-modal__close {
  position: fixed;
  top: var(--spacing-xs);
  left: var(--spacing-xs);
  z-index: 1;
  cursor: pointer;
}

.process-modal__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-sm);

  img {
    display: block;
    inline-size: 100%;
    block-size: auto;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
