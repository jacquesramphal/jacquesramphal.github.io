<template>
  <div class="session-reader">
    <header class="session-reader__bar">
      <router-link v-if="courseRoute" :to="courseRoute" class="session-reader__exit">
        ← {{ courseTitle }}
      </router-link>
      <span class="session-reader__label subtle">{{ sessionLabel }}</span>
    </header>

    <main class="session-reader__stage">
      <div class="session-reader__beat" :key="index">
        <div
          v-if="currentBeat && currentBeat.text"
          class="session-reader__text"
          v-html="beatHtml"
        />

        <div v-if="currentBeat && currentBeat.line" class="session-reader__line">
          <label class="session-reader__line-label subtle" :for="`line-${index}`">
            {{ currentBeat.line.label }}
          </label>
          <textarea
            :id="`line-${index}`"
            v-model="lineText"
            class="session-reader__line-input"
            rows="2"
            placeholder="One line, in your own words…"
            @input="saveLine"
          />
          <p class="session-reader__line-hint subtle">
            This stays on your device. It becomes line {{ chapterNumber }} of your page.
          </p>
        </div>
      </div>

      <div class="session-reader__controls">
        <!-- During a silence the control is simply unavailable. No timer. -->
        <span v-if="!ready" class="session-reader__rest" aria-hidden="true">·</span>

        <button v-else-if="!isLast" class="session-reader__continue" @click="next">Continue</button>

        <template v-else>
          <button v-if="nextChapter" class="session-reader__continue" @click="goNext">
            Next · {{ nextChapter.title }}
          </button>
          <button class="session-reader__continue session-reader__continue--ghost" @click="finish">
            {{ courseTitle ? `Back to ${courseTitle}` : 'Done' }}
          </button>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import router from '@/router';
import { getDocRecordBySlug } from '@/utils/docRegistry';
import { getChapterContext } from '@/utils/courseRegistry';
import { setChapterRead } from '@/utils/courseProgress';
import { getLine, setLine } from '@/utils/coursePage';

// Raw markdown (bypasses the markdown-loader) so the silence/line markers and
// headings survive for parsing. Same approach as utils/readTime.
const rawContext = require.context('!!raw-loader!@/assets/content', false, /\.md$/);

// Minimal, predictable renderer for the limited formatting sessions use:
// paragraphs, **bold**, _italic_, and simple bullet lists. Avoids the
// article MarkdownRenderer, which expects loader-processed input.
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function renderInline(s) {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/_(.+?)_/g, '<em>$1</em>');
}
function renderBeat(text) {
  const blocks = (text || '').split(/\n{2,}/);
  let html = '';
  for (const block of blocks) {
    const lines = block
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    if (!lines.length) continue;
    if (lines.every((l) => l.startsWith('- '))) {
      html += '<ul>' + lines.map((l) => `<li>${renderInline(l.slice(2))}</li>`).join('') + '</ul>';
    } else {
      html += `<p>${renderInline(lines.join(' '))}</p>`;
    }
  }
  return html;
}

// Parse a session's raw markdown into paced beats.
// - `# Title` becomes the session title.
// - `<!-- silence: N -->` closes the current beat with an N-second pause.
// - `<!-- line: Label -->` marks the current beat as the write beat.
// Everything else accumulates as beat text until the next silence.
function parseSession(raw) {
  const lines = (raw || '').split('\n');
  let title = '';
  const beats = [];
  let buf = [];
  let pendingLine = null;

  const flush = (pause) => {
    const text = buf.join('\n').trim();
    if (text || pendingLine || pause) {
      beats.push({ text, pause: pause || 0, line: pendingLine });
    }
    buf = [];
    pendingLine = null;
  };

  for (const line of lines) {
    if (!title) {
      const h1 = line.match(/^#\s+(.+)$/);
      if (h1) {
        title = h1[1].trim();
        continue;
      }
    }
    const sil = line.match(/<!--\s*silence:\s*(\d+)\s*-->/i);
    if (sil) {
      flush(parseInt(sil[1], 10));
      continue;
    }
    const ln = line.match(/<!--\s*line:\s*(.+?)\s*-->/i);
    if (ln) {
      pendingLine = { label: ln[1].trim() };
      continue;
    }
    buf.push(line);
  }
  flush(0);

  return { title, beats: beats.filter((b) => b.text || b.line) };
}

export default {
  name: 'SessionReader',
  props: {
    slug: { type: String, required: true },
  },
  setup(props) {
    const title = ref('');
    const beats = ref([]);
    const index = ref(0);
    const ready = ref(true);
    const lineText = ref('');
    let pauseTimer = null;

    const ctx = computed(() => getChapterContext(props.slug));
    const courseSlug = computed(() => ctx.value?.course.slug || '');
    const courseTitle = computed(() => ctx.value?.course.title || '');
    const courseRoute = computed(() => (courseSlug.value ? `/course/${courseSlug.value}` : ''));
    const chapterNumber = computed(() => (ctx.value ? ctx.value.index + 1 : ''));
    const sessionLabel = computed(() => title.value);

    const currentBeat = computed(() => beats.value[index.value] || null);
    const beatHtml = computed(() => renderBeat(currentBeat.value?.text || ''));
    const isLast = computed(() => index.value >= beats.value.length - 1);
    const nextChapter = computed(() => ctx.value?.next || null);

    const applyPause = () => {
      if (pauseTimer) {
        clearTimeout(pauseTimer);
        pauseTimer = null;
      }
      const pause = currentBeat.value?.pause || 0;
      if (pause > 0) {
        ready.value = false;
        pauseTimer = setTimeout(() => {
          ready.value = true;
        }, pause * 1000);
      } else {
        ready.value = true;
      }
    };

    const loadLineForBeat = () => {
      if (currentBeat.value?.line && courseSlug.value) {
        lineText.value = getLine(courseSlug.value, props.slug);
      }
    };

    const next = () => {
      if (!ready.value || isLast.value) return;
      index.value += 1;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      loadLineForBeat();
      applyPause();
      // Reaching the final beat counts the session as read.
      if (isLast.value && courseSlug.value) {
        setChapterRead(courseSlug.value, props.slug);
      }
    };

    const saveLine = () => {
      if (courseSlug.value) setLine(courseSlug.value, props.slug, lineText.value);
    };

    const finish = () => {
      if (courseSlug.value) setChapterRead(courseSlug.value, props.slug);
      if (courseRoute.value) router.push(courseRoute.value);
    };

    const goNext = () => {
      if (courseSlug.value) setChapterRead(courseSlug.value, props.slug);
      if (nextChapter.value?.route) router.push(nextChapter.value.route);
    };

    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'TEXTAREA' || tag === 'INPUT') return;
      if ((e.key === 'Enter' || e.key === 'ArrowRight' || e.key === ' ') && ready.value) {
        e.preventDefault();
        if (isLast.value) finish();
        else next();
      }
    };

    const load = async () => {
      const record = getDocRecordBySlug(props.slug);
      const contentFile = record?.contentFile;
      if (!contentFile) {
        router.push({ name: 'NotFound' });
        return;
      }
      let raw = '';
      try {
        const mod = rawContext(`./${contentFile}`);
        raw = typeof mod === 'string' ? mod : mod?.default || '';
      } catch (e) {
        router.push({ name: 'NotFound' });
        return;
      }
      const parsed = parseSession(raw);
      title.value = parsed.title;
      beats.value = parsed.beats;
      index.value = 0;
      await nextTick();
      loadLineForBeat();
      applyPause();
    };

    onMounted(() => {
      load();
      window.addEventListener('keydown', onKey);
    });
    onUnmounted(() => {
      window.removeEventListener('keydown', onKey);
      if (pauseTimer) clearTimeout(pauseTimer);
    });

    return {
      title,
      beats,
      index,
      ready,
      lineText,
      currentBeat,
      beatHtml,
      isLast,
      nextChapter,
      courseTitle,
      courseRoute,
      sessionLabel,
      chapterNumber,
      next,
      finish,
      goNext,
      saveLine,
    };
  },
};
</script>

<style scoped lang="scss">
.session-reader {
  min-block-size: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--background);
}

.session-reader__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  max-inline-size: 720px;
  inline-size: 100%;
  margin-inline: auto;
}

.session-reader__exit {
  text-decoration: none;
  font-size: var(--font-400);

  &:hover {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
}

.session-reader__label {
  font-size: var(--font-300);
}

.session-reader__stage {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-inline-size: 720px;
  inline-size: 100%;
  margin-inline: auto;
  padding: var(--spacing-lg) var(--spacing-md) var(--spacing-xl);
}

.session-reader__beat {
  animation: beat-in 0.5s ease both;
}

@keyframes beat-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.session-reader__text {
  font-size: var(--font-600);
  line-height: var(--lineHeight-relaxed, 1.6);

  :deep(p) {
    margin-block: 0 var(--spacing-md);
  }
  :deep(p:last-child) {
    margin-block-end: 0;
  }
}

.session-reader__line {
  margin-block-start: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.session-reader__line-label {
  font-size: var(--font-300);
}

.session-reader__line-input {
  inline-size: 100%;
  padding: var(--spacing-sm);
  font: inherit;
  font-size: var(--font-500);
  color: var(--foreground);
  background: var(--background-darker);
  border: var(--border);
  border-radius: var(--spacing-xxs);
  resize: vertical;

  &:focus,
  &:focus-visible {
    outline: none;
    border-color: color-mix(in srgb, var(--link) 45%, transparent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--link) 20%, transparent);
  }
}

.session-reader__line-hint {
  font-size: var(--font-2xs);
  margin: 0;
}

.session-reader__controls {
  margin-block-start: var(--spacing-xl);
  min-block-size: var(--spacing-lg);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.session-reader__rest {
  font-size: var(--font-700);
  color: var(--foreground-muted, var(--foreground));
  opacity: 0.35;
  animation: rest-pulse 3s ease-in-out infinite;
  user-select: none;
}

@keyframes rest-pulse {
  0%,
  100% {
    opacity: 0.15;
  }
  50% {
    opacity: 0.5;
  }
}

.session-reader__continue {
  display: inline-flex;
  align-items: center;
  padding: 0.85rem 1.4rem;
  font: inherit;
  font-size: var(--font-400);
  color: var(--foreground);
  background: var(--background);
  border: var(--border);
  border-radius: 999px;
  box-shadow: var(--shadow-light);
  cursor: pointer;
  animation: beat-in 0.4s ease both;
  transition:
    background 0.12s ease,
    transform 0.06s ease;

  &:hover {
    background: var(--background-darker);
  }
  &:active {
    transform: scale(0.98);
  }
  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--link) 35%, transparent),
      var(--shadow-light);
  }
}

.session-reader__continue--ghost {
  background: transparent;
  border-color: transparent;
  box-shadow: none;
  color: var(--foreground-muted);

  &:hover {
    background: transparent;
    color: var(--foreground);
  }
}
</style>
