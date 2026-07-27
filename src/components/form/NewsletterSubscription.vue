<template>
  <div class="newsletter">
    <p class="newsletter__lead">{{ leadText }}</p>
    <form class="newsletter__form" @submit.prevent="subscribe">
      <MyInput
        id="newsletter-email"
        type="email"
        name="email"
        label="Email address"
        hide-label
        placeholder="you@example.com"
        autocomplete="email"
        size="small"
        :submit-button="true"
        :submit-disabled="submitting"
        v-model="email"
        @submit="subscribe"
      />
    </form>
    <p
      v-if="message"
      class="newsletter__message"
      :class="{ 'is-success': isSuccess, 'is-error': !isSuccess }"
      role="status"
      aria-live="polite"
    >
      {{ message }}
    </p>
  </div>
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
.newsletter {
  width: 100%;
  max-width: 32rem;
}

.newsletter__lead {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: var(--font-400);
  color: var(--foreground-subtle, var(--foreground));
}

.newsletter__form {
  width: 100%;
}

.newsletter__message {
  margin: var(--spacing-xxs) 0 0 0;
  font-size: var(--font-300);
}

.newsletter__message.is-success {
  color: var(--color-success, green);
}

.newsletter__message.is-error {
  color: var(--color-error, red);
}
</style>
