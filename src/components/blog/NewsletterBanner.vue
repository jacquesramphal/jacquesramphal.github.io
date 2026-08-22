<template>
  <!-- `inset` pulls the band in off the viewport edges and rounds it, trading
       margin for padding so the contents stay aligned with the sections above. -->
  <GridWrapper>
    <GridContainer inset style="background-color: var(--background-darker)">
      <!-- Generated mesh gradient as the band's fill, from the same source the
           image-less cards use. Parked in favour of the flat --background-darker
           above. To re-enable: uncomment this, drop the inline background-color,
           and uncomment the gradientSvg block in the script plus the
           .article-outro__bg rules in the style block. -->
      <!-- <div class="article-outro__bg" aria-hidden="true" v-html="gradientSvg"></div> -->

      <div class="article-outro__header">
        <TextBlock class="article-outro__intro" :title="title" :description="text" as="h3" />

        <form class="article-outro__form" @submit.prevent="subscribe">
          <div class="article-outro__row">
            <MyInput
              :id="compact ? 'article-inline-cta-email' : 'article-outro-email'"
              type="email"
              name="email"
              label="Email address"
              hide-label
              placeholder="you@example.com"
              autocomplete="email"
              v-model="email"
              size="large"
            />
            <MyButton
              class="article-outro__btn"
              label="Subscribe"
              name="submit"
              primary
              :disabled="submitting"
              @click="subscribe"
            />
          </div>
          <!-- <SubscribeForm /> -->

          <p
            v-if="message"
            class="article-outro__message"
            :class="{ 'is-success': isSuccess, 'is-error': !isSuccess }"
            role="status"
            aria-live="polite"
          >
            {{ message }}
          </p>
        </form>
      </div>
    </GridContainer>
  </GridWrapper>
</template>

<script setup>
import { ref, computed } from 'vue';
// import SubscribeForm from '../form/SubscribeForm.vue';
// import { generatePlaceholder } from '../../utils/gradientPlaceholder';

// Reusable subscribe call to action, built as the CardRow header (TextBlock
// title, as="h2") on an inverse container with the cards stripped out — the
// left is the section title/text, the right is the subscribe form. Two forms:
// the default bar appended after writing posts, and a `compact` variant
// injected partway through. Both share the Buttondown embed flow with
// NewsletterSubscription so there's a single source of truth for the list.
const props = defineProps({
  compact: { type: Boolean, default: false },
});

const ENDPOINT = 'https://buttondown.com/api/emails/embed-subscribe/jacquesramphal';

// The band's fill, from the same generator the image-less cards use — parked in
// favour of a flat --background-darker. A fixed seed rather than the title, so
// editing the copy doesn't reshuffle the artwork. A wide viewBox matches the
// band's proportions, so `slice` barely crops. And `bigsoft` is deliberate:
// three large calm blobs sit under text far better than `scatter`, whose small
// blobs compete with the copy.
// const gradientSvg = generatePlaceholder('subscribe-band', {
//   width: 1600,
//   height: 400,
//   variant: 'mesh',
//   pattern: 'bigsoft',
// }).svg;

const title = computed(() =>
  props.compact ? 'This is the kind of thing I write about.' : 'Subscribe to my newsletter.'
);
const text = computed(() =>
  props.compact ? '' : 'New essays on design, systems, and AI as I publish them. No noise.'
);

const email = ref('');
const message = ref('');
const isSuccess = ref(false);
const submitting = ref(false);

const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

const subscribe = async () => {
  const value = email.value.trim();

  if (!isValidEmail(value)) {
    isSuccess.value = false;
    message.value = 'Please enter a valid email address.';
    return;
  }

  submitting.value = true;
  message.value = '';

  try {
    await fetch(ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ email: value }),
    });
    // no-cors yields an opaque response, so the status can't be read.
    // Buttondown sends its own confirmation email; treat submit as delivered.
    isSuccess.value = true;
    message.value = 'Almost there — check your inbox to confirm.';
    email.value = '';
  } catch (e) {
    isSuccess.value = false;
    message.value = 'Something went wrong. Please try again.';
  }

  submitting.value = false;
};
</script>

<style scoped lang="scss">
/* Subscribe band — a subtle darker fill on the page background. Type comes
   from TextBlock (h2 title) on the design tokens; only layout and the fill
   live here. */
.article-outro {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--background-darker);
  border-radius: var(--spacing-xs);
}

/* Opt-in for full-bleed placements (e.g. the band above the footer): a radius
   reads as a mistake when the bar's edges are the viewport's edges. Inset
   placements — anything inside a padded GridContainer — leave this off and keep
   their corners. */
.article-outro--bleed {
  @media only screen and (max-width: 767px) {
    border-radius: 0;
  }
}

/* Gradient-fill layer — parked alongside the markup and script above.
 *
 * .article-outro__bg sits behind everything, clipped to the container's radius
 * by its overflow. The background-color underneath is load-bearing: the mesh
 * paints negative-space blooms in `var(--background)`, so it needs that same
 * colour behind it to blend into rather than transparency.
 *
 * The :deep() is mandatory, not stylistic — v-html content is injected at
 * runtime without this component's scope attribute, so a plain descendant
 * selector compiles to `svg[data-v-hash]` and matches nothing.
 *
 * The ::after is a scrim, the same device ArticleCard lays over its placeholder:
 * it eases the page background across the panel so the copy keeps its contrast
 * against saturated colour instead of relying on where the blobs land.
 *
 * .article-outro__bg {
 *   position: absolute;
 *   inset: 0;
 *   z-index: 0;
 *   background-color: var(--background);
 *   pointer-events: none;
 * }
 *
 * .article-outro__bg :deep(svg) {
 *   display: block;
 *   width: 100%;
 *   height: 100%;
 * }
 *
 * .article-outro__bg::after {
 *   content: '';
 *   position: absolute;
 *   inset: 0;
 *   background: linear-gradient(135deg, var(--background) 0%, rgba(255, 255, 255, 0) 200%);
 * }
 */

/* CardRow-style header: title/text left, action (the form) right. Stacks on
   mobile, sits on one row from tablet up. */
.article-outro__header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-lg);
  }
}

.article-outro__intro {
  flex: 1 1 auto;
  min-width: 0;
}

.article-outro__form {
  flex: 0 0 auto;
  width: 100%;

  @media only screen and (min-width: 768px) {
    width: auto;
  }
}

/* Mobile: field and button stack full width. */
.article-outro__row {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--spacing-xs);
  width: 100%;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: nowrap;
    /* `center`, not `baseline`: the field and the button are equal-height boxes
       now, but their text sits at different offsets inside them (the input's
       placeholder rides its own line box), so baseline alignment shifted the
       two boxes a pixel apart to line the glyphs up. Centring aligns the boxes,
       which is what reads as aligned here. */
    align-items: center;
    width: auto;
  }
}

.article-outro__btn :deep(.custom-btn) {
  width: 100%;

  @media only screen and (min-width: 768px) {
    width: auto;
    /* No `height: 100%` — that was propping the button up to the taller field.
       Both now derive the same height from the FORM CONTROLS tokens. */
    white-space: nowrap;
  }
}

.article-outro__message {
  margin: var(--spacing-xs) 0 0 0;
}

.article-outro__message.is-success {
  color: var(--color-success, green);
}

.article-outro__message.is-error {
  color: var(--color-error, red);
}

/* Compact variant — a quieter inline nudge dropped partway through an article.
   Tighter padding and a block-margin that gives it room between paragraphs;
   type stays on the shared scale. */
.article-outro--compact {
  padding: var(--spacing-sm);
  margin-block: var(--spacing-md);
}
</style>
