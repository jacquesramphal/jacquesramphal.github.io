import { addons } from '@storybook/addons';
import { darkTheme, lightTheme } from './themes';

// Match system preference for the initial manager chrome.
// The toolbar toggle (sun/moon) will switch both chrome and canvas together.
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

addons.setConfig({
  theme: prefersDark ? darkTheme : lightTheme,
});

// Redirect to the Introduction story when no story path is set in the URL.
// Uses URL() to stay on the current pathname so this works at any deploy path
// (e.g. ramphal.design/storybook/ or localhost:6006/).
if (typeof window !== 'undefined') {
  const params = new URLSearchParams(window.location.search);
  if (!params.has('path')) {
    const url = new URL(window.location.href);
    url.searchParams.set('path', '/story/introduction--welcome');
    window.location.replace(url.toString());
  }
}
