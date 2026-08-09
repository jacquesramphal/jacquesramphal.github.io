<template>
  <aside
    class="article-outro"
    :class="{ 'article-outro--compact': compact }"
    aria-label="Subscribe for new essays"
  >
    <div class="article-outro__intro">
      <p class="article-outro__title">
        <strong>{{ title }}</strong>
      </p>
      <p v-if="text" class="article-outro__text subtle">{{ text }}</p>
    </div>

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
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue';

// Reusable subscribe call to action. Two forms: the default full-width bar
// appended after writing posts, and a `compact` variant injected partway
// through the article. Both share the Buttondown embed flow with
// NewsletterSubscription so there's a single source of truth for the list.
const props = defineProps({
  compact: { type: Boolean, default: false },
});

const ENDPOINT = 'https://buttondown.com/api/emails/embed-subscribe/jacquesramphal';

const title = computed(() =>
  props.compact ? 'Enjoying this?' : 'This is the kind of thing I write about.'
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

<style scoped>
.article-outro {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--background-darker);
  border-inline-start: 3px solid var(--color-red);
  border-radius: 0;
}

.article-outro__intro {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxxs);
}

/* Title and text inherit the global type scale — bold via <strong>, muted via
   .subtle — so there are no hardcoded font-size/weight/color overrides here. */
.article-outro__title {
  margin: 0;
}

.article-outro__text {
  margin: 0;
}

.article-outro__form {
  width: 100%;
}

/* Mobile: field and button stack full width. */
.article-outro__row {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--spacing-xs);
  width: 100%;
}

.article-outro__btn :deep(.custom-btn) {
  width: 100%;
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

/* Tablet and up: thin full-width bar — intro left, form right on one row. */
@media only screen and (min-width: 768px) {
  .article-outro {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-lg);
    padding: var(--spacing-sm) var(--spacing-md);
  }

  .article-outro__intro {
    flex: 1 1 auto;
    max-width: var(--size-36);
  }

  .article-outro__form {
    flex: 0 0 auto;
  }

  .article-outro__row {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: stretch;
    width: auto;
  }

  .article-outro__btn {
    display: flex;
  }

  .article-outro__btn :deep(.custom-btn) {
    width: auto;
    height: 100%;
    white-space: nowrap;
  }
}

/* Compact variant — a quieter inline nudge dropped partway through an article.
   Tighter padding and a smaller title; the block-margin gives it room between
   paragraphs. */
.article-outro--compact {
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  margin-block: var(--spacing-md);
}

@media only screen and (min-width: 768px) {
  .article-outro--compact {
    gap: var(--spacing-md);
    padding: var(--spacing-xs) var(--spacing-sm);
  }
}
</style>
