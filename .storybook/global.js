import { createApp } from 'vue';
import app from '../src/App.vue';

export const globalComponents = (app) => {
  app.component('my-component', MyComponent);
};

// Assuming you have an existing Vue instance exported from main.ts
const app = createApp({});
globalComponents(app);