// global-styles.js

export const globalStyles = `
* {
    font-family: 'Manrope', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji !important;
    font-kerning: auto;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
}

/* Match the app's html base (rem calculations depend on this) */
html {
    font-size: 10px !important;
}

/* In the app, color is set on #app — that element doesn't exist in Storybook.
   Set it on body so headings and other elements using color:inherit
   correctly pick up the themed foreground token. */
body {
    color: var(--foreground) !important;
    background-color: var(--background) !important;
}

/* Storybook docs mode wraps content in .sbdocs-wrapper / .sbdocs-content.
   These are styled directly by the Storybook theme object (not CSS variables),
   so they don't respond to our :root theme class. Override them here so the
   docs page background and text honour the active design tokens. */
.sbdocs-wrapper,
.sbdocs-content,
.docs-story {
    background-color: var(--background) !important;
    color: var(--foreground) !important;
}
`
