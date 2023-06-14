/* eslint-disable */
import { createStore } from 'vuex';

export default createStore({
  state: {
    email: '',
    message: '',
    isSuccess: false,
  },
  mutations: {
    setEmail(state, email) {
      state.email = email;
    },
    setMessage(state, { message, isSuccess }) {
      state.message = message;
      state.isSuccess = isSuccess;
    },
    resetState(state) {
      state.email = '';
      state.message = '';
      state.isSuccess = false;
    },
  },
  actions: {
    subscribe({ commit, state }, email) {
      // Simulate email validation logic
      const isValidEmail = /\S+@\S+\.\S+/.test(email);

      if (!isValidEmail) {
        commit('setMessage', { message: 'Please enter a valid email address.', isSuccess: false });
        return;
      }

      // Simulate successful subscription
      commit('setEmail', email);
      commit('setMessage', { message: 'Subscription successful! Redirecting...', isSuccess: true });

      // Simulate redirection after 2 seconds
      setTimeout(() => {
        commit('resetState');
      }, 2000);
    },
  },
});
