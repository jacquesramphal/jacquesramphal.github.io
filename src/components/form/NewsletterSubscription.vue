<template>
  <div class="newsletter">
    <TextImage
      as="h2"
      eyebrow=""
      title="Subscribe"
      :description="leadText"
      filename="placeholders/placeholder-24.svg"
      alt="Jacques Ramphal"
      :flipped="false"
      :red="false"
    >
      <form class="newsletter__form" @submit.prevent="subscribe">
        <div class="newsletter__row">
          <MyInput
            id="newsletter-email"
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
            class="newsletter__btn"
            label="Subscribe"
            name="submit"
            primary
            :disabled="submitting"
            @click="subscribe"
          />
        </div>

        <p
          v-if="message"
          class="newsletter__message"
          :class="{ 'is-success': isSuccess, 'is-error': !isSuccess }"
          role="status"
          aria-live="polite"
        >
          {{ message }}
        </p>
      </form>
    </TextImage>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Buttondown embed endpoint for the owned list.
const ENDPOINT = 'https://buttondown.com/api/emails/embed-subscribe/jacquesramphal';

const leadText =
  'Notes on design when making is cheap and judgment is the scarce skill. I send new essays as I publish them.';

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
    // A no-cors request returns an opaque response, so the status can't be
    // read. Buttondown sends its own confirmation email; treat the submit as
    // delivered and point the reader there.
    isSuccess.value = true;
    message.value = 'Almost there — check your inbox to confirm.';
    email.value = '';
  } catch (e) {
    isSuccess.value = false;
    message.value = 'Something went wrong. Please try again.';
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.newsletter {
  background: var(--background-darker);
}

/* Mobile: input and button stack, button full width. */
.newsletter__row {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--spacing-xs);
  width: 100%;
}

.newsletter__btn :deep(.custom-btn) {
  width: 100%;
}

/* Tablet and up: input and button sit in a row at one shared height, so the
   button matches the field height and their tops and bottoms line up. */
@media only screen and (min-width: 768px) {
  .newsletter__row {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }

  .newsletter__row :deep(#input) {
    flex: 1 1 12rem;
  }

  .newsletter__row :deep(.input-wrap) {
    height: auto;
  }

  .newsletter__row :deep(input) {
    height: var(--size-10);
    box-sizing: border-box;
  }

  .newsletter__btn {
    flex: 0 0 auto;
    display: flex;
  }

  .newsletter__btn :deep(.custom-btn) {
    width: auto;
    height: var(--size-10);
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-block: 0;
  }
}

.newsletter__message {
  margin: var(--spacing-xs) 0 0 0;
}

.newsletter__message.is-success {
  color: var(--color-success, green);
}

.newsletter__message.is-error {
  color: var(--color-error, red);
}
</style>
