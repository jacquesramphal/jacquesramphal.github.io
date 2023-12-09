<template>
  <div>
    <img :src="imageSrc" alt="Newsletter Image" />
    <p>{{ placeholderText }}</p>
    <input v-model="email" placeholder="Enter your email" />
    <button @click="subscribe">Subscribe</button>
    <p
      v-if="message"
      :class="{ 'success-message': isSuccess, 'error-message': !isSuccess }"
    >
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import { useStore } from "vuex";

const store = useStore();

const email = ref("");

onBeforeUnmount(() => {
  store.commit("resetState");
});

const imageSrc = "/path/to/your/image/placeholder.jpg";
const placeholderText = "Subscribe to our newsletter for updates";

const subscribe = () => {
  store.dispatch("subscribe", email.value);
};

// eslint-disable-next-line no-unused-vars
const { email: globalEmail, message, isSuccess } = store.state; // You can use these directly if needed

// const validateEmail = (email) => {
//   return /\S+@\S+\.\S+/.test(email);
// };
</script>

<style>
.success-message {
  color: green;
}

.error-message {
  color: red;
}
</style>
