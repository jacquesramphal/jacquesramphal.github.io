import { addons } from '@storybook/addons';
import { darkTheme, lightTheme } from './themes';

// Match system preference for the initial manager chrome.
// The toolbar toggle (sun/moon) will switch both chrome and canvas together.
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

addons.setConfig({
  theme: prefersDark ? darkTheme : lightTheme,
});

// Redirect to the Introduction story when no story path is set in the URL.
// This makes the Intro page the effective "home" of the Storybook.
if (typeof window !== 'undefined') {
  const params = new URLSearchParams(window.location.search);
  if (!params.has('path')) {
    window.location.replace('/?path=/story/introduction--welcome');
  }
}
