import { addons } from '@storybook/addons';
import { darkTheme, lightTheme } from './themes';

// Match system preference for the initial manager chrome.
// The toolbar toggle (sun/moon) will switch both chrome and canvas together.
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

addons.setConfig({
  theme: prefersDark ? darkTheme : lightTheme,
});
