<template>
  <aside
    class="article-outro"
    :class="{ 'article-outro--compact': compact }"
    aria-label="Subscribe for new essays"
  >
    <div class="article-outro__header">
      <TextBlock class="article-outro__intro" :title="title" :description="text" as="h2" />

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
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue';

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

<style scoped lang="scss">
/* Subscribe band — a subtle darker fill on the page background. Type comes
   from TextBlock (h2 title) on the design tokens; only layout and the fill
   live here. */
.article-outro {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--background-darker);
  border-radius: var(--spacing-xs);

  /* Full-bleed on mobile — no rounded corners at the viewport edges. */
  @media only screen and (max-width: 767px) {
    border-radius: 0;
  }
}

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
    align-items: stretch;
    width: auto;
  }
}

.article-outro__btn :deep(.custom-btn) {
  width: 100%;

  @media only screen and (min-width: 768px) {
    width: auto;
    height: 100%;
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
