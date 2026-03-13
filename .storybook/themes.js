import { create } from '@storybook/theming';

const shared = {
  brandTitle: 'Ramphal Library',
  brandUrl: 'https://jacquesramphal.github.io',
  brandTarget: '_blank',
  fontBase: "'Manrope', ui-sans-serif, system-ui, -apple-system, sans-serif",
  fontCode: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
  appBorderRadius: 8,
  inputBorderRadius: 6,
};

export const darkTheme = create({
  base: 'dark',
  ...shared,
  colorPrimary: '#fafafa',
  colorSecondary: '#3d3a47',
  // App chrome — --color-offblack
  appBg: '#1d1b22',
  appContentBg: '#141318',
  appBorderColor: 'rgba(0, 0, 0, 0.5)',
  // Text — --color-offwhite
  textColor: '#fafafa',
  textInverseColor: '#1d1b22',
  textMutedColor: 'rgba(250, 250, 250, 0.55)',
  // Toolbar
  barBg: '#1d1b22',
  barTextColor: 'rgba(250, 250, 250, 0.65)',
  barSelectedColor: '#fafafa',
  barHoverColor: '#fafafa',
  // Inputs
  inputBg: 'rgba(255, 255, 255, 0.06)',
  inputBorder: 'rgba(0, 0, 0, 0.6)',
  inputTextColor: '#fafafa',
});

export const lightTheme = create({
  base: 'light',
  ...shared,
  colorPrimary: '#1d1b22',
  colorSecondary: '#1d1b22',
  // App chrome — --color-offwhite
  appBg: '#fafafa',
  appContentBg: '#ffffff',
  appBorderColor: '#d6d6d6',
  // Text — --color-offblack
  textColor: '#1d1b22',
  textInverseColor: '#fafafa',
  textMutedColor: 'rgba(29, 27, 34, 0.55)',
  // Toolbar
  barBg: '#fafafa',
  barTextColor: 'rgba(29, 27, 34, 0.65)',
  barSelectedColor: '#fafafa',
  barHoverColor: '#1d1b22',
  // Inputs
  inputBg: '#ffffff',
  inputBorder: '#d6d6d6',
  inputTextColor: '#1d1b22',
});
