<template>
  <GridContainer class="newsletter">
    <form class="newsletter__inner" @submit.prevent="subscribe">
      <TextBlock
        center
        as="h3"
        title="Subscribe"
        :description="leadText"
      />

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
        />
        <MyButton
          class="newsletter__btn"
          label="Subscribe"
          name="submit"
          primary
          size="large"
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
  </GridContainer>
</template>

<script setup>
import { ref } from "vue";

// Buttondown embed endpoint for the owned list.
const ENDPOINT =
  "https://buttondown.com/api/emails/embed-subscribe/jacquesramphal";

const leadText =
  "Notes on design when making is cheap and judgment is the scarce skill. I send new essays as I publish them.";

const email = ref("");
const message = ref("");
const isSuccess = ref(false);
const submitting = ref(false);

const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

const subscribe = async () => {
  const value = email.value.trim();

  if (!isValidEmail(value)) {
    isSuccess.value = false;
    message.value = "Please enter a valid email address.";
    return;
  }

  submitting.value = true;
  message.value = "";

  try {
    await fetch(ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email: value }),
    });
    // A no-cors request returns an opaque response, so the status can't be
    // read. Buttondown sends its own confirmation email; treat the submit as
    // delivered and point the reader there.
    isSuccess.value = true;
    message.value = "Almost there — check your inbox to confirm.";
    email.value = "";
  } catch (e) {
    isSuccess.value = false;
    message.value = "Something went wrong. Please try again.";
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.newsletter__inner {
  width: 100%;
  max-width: 32rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.newsletter__row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  width: 100%;
  margin-block-start: var(--spacing-sm);
}

.newsletter__btn {
  align-self: center;
}

.newsletter__message {
  margin: var(--spacing-xs) 0 0 0;
  text-align: center;
}

.newsletter__message.is-success {
  color: var(--color-success, green);
}

.newsletter__message.is-error {
  color: var(--color-error, red);
}
</style>
