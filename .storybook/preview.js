
// trying to registerr global components but not working
// import {app} from '@storybook/vue3';
// app.component('router-link', MockRouterLink);

import "../src/assets/styles/css/all.css";
import { globalStyles } from './global-styles'; // Import the styles from global-font.ts

const global = `
  ${globalStyles}
`;

const head = document.head || document.getElementsByTagName('head')[0];
const style = document.createElement('style');

style.type = 'text/css';
style.appendChild(document.createTextNode(global));
head.appendChild(style);


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

