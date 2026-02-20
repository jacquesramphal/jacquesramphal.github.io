
import { setup } from '@storybook/vue3';
import "../src/assets/styles/css/all.css";
import { globalStyles } from './global-styles';
import { darkTheme, lightTheme } from './themes';

// Register global stubs needed by components
setup((app) => {
  // Stub router-link so components that use Vue Router render correctly
  app.component('RouterLink', {
    props: ['to'],
    template: '<a :href="typeof to === \'string\' ? to : \'#\'"><slot /></a>',
  });
  app.component('router-link', {
    props: ['to'],
    template: '<a :href="typeof to === \'string\' ? to : \'#\'"><slot /></a>',
  });
});

// Add Google Fonts for Manrope
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

const head = document.head || document.getElementsByTagName('head')[0];
const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(globalStyles));
head.appendChild(style);

// storybook-dark-mode applies darkClass/lightClass to <body>, but the app's
// CSS variable overrides are scoped to :root.dark-theme / :root.light-theme
// (i.e. the <html> element). Mirror the class up so selectors match.
// This also fires in Docs mode where the docs page shares the preview document.
const syncThemeClass = () => {
  const isDark = document.body.classList.contains('dark-theme');
  const isLight = document.body.classList.contains('light-theme');
  document.documentElement.classList.toggle('dark-theme', isDark);
  document.documentElement.classList.toggle('light-theme', isLight);
};
new MutationObserver(syncThemeClass).observe(document.body, {
  attributes: true,
  attributeFilter: ['class'],
});
syncThemeClass(); // run once on load for the initial state

// Docs pages use a Storybook theme object directly (not CSS variables).
// Set docs.theme from system preference so the initial docs render is correct.
// storybook-dark-mode will override this when the user toggles.
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: prefersDark ? darkTheme : lightTheme,
  },
  // storybook-dark-mode: the toolbar sun/moon toggle switches both the
  // manager chrome (via dark/light theme objects) and the canvas
  // (via darkClass/lightClass on :root). No current: set so it reads
  // from localStorage first, then falls back to system preference.
  darkMode: {
    dark: darkTheme,
    light: lightTheme,
    darkClass: 'dark-theme',
    lightClass: 'light-theme',
    stylePreview: true,
  },
};
