// global-styles.js

export const globalStyles = `
* {
    font-family: 'Manrope', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji !important;
    font-kerning: auto;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
}

/* Match the app's html base (rem calculations depend on this).
   Scoped to .sb-show-main so it applies to the canvas preview only —
   the Docs page (sbdocs-wrapper) inherits the browser default (16px)
   so props table labels render at the correct size. */
.sb-show-main {
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

/* Docs page headings — Storybook's static docs theme object bakes in heading
   colors at load time and doesn't update on toolbar toggle. Force per theme. */
.dark-theme .sbdocs-wrapper h1,
.dark-theme .sbdocs-wrapper h2,
.dark-theme .sbdocs-wrapper h3,
.dark-theme .sbdocs-wrapper h4,
.dark-theme .sbdocs-wrapper h5,
.dark-theme .sbdocs-wrapper h6,
.dark-theme .sbdocs-content h1,
.dark-theme .sbdocs-content h2,
.dark-theme .sbdocs-content h3,
.dark-theme .sbdocs-content h4,
.dark-theme .sbdocs-content h5,
.dark-theme .sbdocs-content h6 {
    color: #fafafa !important;
}
.light-theme .sbdocs-wrapper h1,
.light-theme .sbdocs-wrapper h2,
.light-theme .sbdocs-wrapper h3,
.light-theme .sbdocs-wrapper h4,
.light-theme .sbdocs-wrapper h5,
.light-theme .sbdocs-wrapper h6,
.light-theme .sbdocs-content h1,
.light-theme .sbdocs-content h2,
.light-theme .sbdocs-content h3,
.light-theme .sbdocs-content h4,
.light-theme .sbdocs-content h5,
.light-theme .sbdocs-content h6 {
    color: #1d1b22 !important;
}

/* Inline code and code blocks in Docs description text.
   Storybook renders these with hardcoded colors — override per theme. */
.dark-theme .sbdocs-wrapper code,
.dark-theme .sbdocs-content code,
.dark-theme .docblock-source,
.dark-theme .sb-unstyled code,
.dark-theme .docblock-argstable-body td code {
    background-color: rgba(255, 255, 255, 0.08) !important;
    color: #fafafa !important;
    border-color: rgba(255, 255, 255, 0.12) !important;
}
.light-theme .sbdocs-wrapper code,
.light-theme .sbdocs-content code,
.light-theme .docblock-source,
.light-theme .sb-unstyled code,
.light-theme .docblock-argstable-body td code {
    background-color: rgba(0, 0, 0, 0.05) !important;
    color: #1d1b22 !important;
    border-color: #d6d6d6 !important;
}

/* Reset app typography overrides (td font-size, color) that bleed in via all.css.
   Without this, typography.scss's td rule inflates prop label font-size and
   overrides Storybook's own type-badge span colors. */
.docblock-argstable td,
.docblock-argstable th {
    font-size: revert !important;
    line-height: revert !important;
    font-weight: revert !important;
}

/* Type badge spans ("string", "boolean", etc.) in the description/default columns.
   Storybook renders these as <span> with hardcoded emotion CSS colors — override per theme. */
.dark-theme .docblock-argstable-body td span {
    color: #fafafa !important;
    border-color: rgba(255, 255, 255, 0.2) !important;
}
.light-theme .docblock-argstable-body td span {
    color: #1d1b22 !important;
    border-color: rgba(0, 0, 0, 0.15) !important;
}

/* ArgsTable / Controls — Storybook uses emotion CSS-in-JS so the table
   ignores CSS variables. Force bg/text/border using the theme class on body. */
.dark-theme table.docblock-argstable,
.dark-theme .docblock-argstable-body tr,
.dark-theme .sb-argstableBlock,
.dark-theme .docblock-argstable-body td,
.dark-theme .docblock-argstable-body th {
    background-color: #1d1b22 !important;
    color: #fafafa !important;
    border-color: rgba(255, 255, 255, 0.1) !important;
}
.dark-theme .docblock-argstable-body tr:nth-child(even) td,
.dark-theme .docblock-argstable-body tr:nth-child(even) th {
    background-color: #141318 !important;
}
.dark-theme .docblock-argstable-body input,
.dark-theme .docblock-argstable-body select,
.dark-theme .docblock-argstable-body textarea,
.dark-theme .docblock-argstable-body button {
    background-color: rgba(255, 255, 255, 0.06) !important;
    color: #fafafa !important;
    border-color: rgba(255, 255, 255, 0.15) !important;
}
.dark-theme .docblock-argstable-head th,
.dark-theme .docblock-argstable-head td {
    background-color: #141318 !important;
    color: rgba(250, 250, 250, 0.55) !important;
    border-color: rgba(255, 255, 255, 0.1) !important;
}

.light-theme table.docblock-argstable,
.light-theme .docblock-argstable-body tr,
.light-theme .sb-argstableBlock,
.light-theme .docblock-argstable-body td,
.light-theme .docblock-argstable-body th {
    background-color: #ffffff !important;
    color: #1d1b22 !important;
    border-color: #d6d6d6 !important;
}
.light-theme .docblock-argstable-body tr:nth-child(even) td,
.light-theme .docblock-argstable-body tr:nth-child(even) th {
    background-color: #fafafa !important;
}
.light-theme .docblock-argstable-head th,
.light-theme .docblock-argstable-head td {
    background-color: #fafafa !important;
    color: rgba(29, 27, 34, 0.55) !important;
    border-color: #d6d6d6 !important;
}`
