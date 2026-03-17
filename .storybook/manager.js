import { addons } from '@storybook/addons';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';
import { darkTheme, lightTheme } from './themes';

// Match system preference for the initial manager chrome.
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

addons.setConfig({
  theme: prefersDark ? darkTheme : lightTheme,
});

// Re-apply theme to the manager chrome when the toolbar toggle fires.
// addons.setConfig is static at init; injecting a style tag is the
// reliable way to keep the sidebar text/bg in sync with the toggle.
addons.getChannel().on(DARK_MODE_EVENT_NAME, (isDark) => {
  const theme = isDark ? darkTheme : lightTheme;
  const el = document.getElementById('_sb-theme-override');
  if (el) el.remove();
  const style = document.createElement('style');
  style.id = '_sb-theme-override';
  style.textContent = isDark
    ? `
        #root { background: ${darkTheme.appBg}; color: ${darkTheme.textColor}; }
        [class*="sidebar"] { background: ${darkTheme.appBg} !important; color: ${darkTheme.textColor} !important; }
        [class*="sidebar"] a, [class*="sidebar"] button, [class*="sidebar"] span { color: ${darkTheme.textColor} !important; }
      `
    : `
        #root { background: ${lightTheme.appBg}; color: ${lightTheme.textColor}; }
        [class*="sidebar"] { background: ${lightTheme.appBg} !important; color: ${lightTheme.textColor} !important; }
        [class*="sidebar"] a, [class*="sidebar"] button, [class*="sidebar"] span { color: ${lightTheme.textColor} !important; }
      `;
  document.head.appendChild(style);
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
