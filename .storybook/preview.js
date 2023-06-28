import "../src/assets/styles/css/all.css";

// trying to registerr global components but not working
// import {app} from '@storybook/vue3';
// app.component('router-link', MockRouterLink);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // docs: {
  //   page: DocumentationTemplate,
  // },
};
