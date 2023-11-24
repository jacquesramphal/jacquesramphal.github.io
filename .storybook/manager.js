// ./storybook/manager.ts
import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'
// import tokens from '@oriuminc/chakra/src/figma-tokens/transformedTokens.json'

const theme = create({
  base: 'light', // this will inherit the base properties of Storybooks'light theme

  // Base color
  colorSecondary: colors.colors.text['link'], 

  // UI
  appBg: 'red',
  appContentBg: 'blue',
  appBorderColor: 'green',
  appBorderRadius: 4,

  // Typography
  fontBase:  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',

  fontCode: 'monospace',

  // // Text colors
  // textColor: colors.colors.text['primary'],
  // textInverseColor: colors.colors.text['primary-inverse'],
  // textMutedColor: colors.colors.text['muted'],

  // // Toolbar default and active colors
  // barTextColor: colors.colors.light['text-muted'],
  // barSelectedColor: colors.colors.text['link'],
  // barBg: colors.colors.surface['primary'],

  // // Form colors
  // inputBg: colors.colors.surface['primary'],
  // inputBorder: colors.colors.surface['border'],
  // inputTextColor: colors.colors.text['primary'],
  // inputBorderRadius: tokens.radii['base'],

  // // Brand assets
  // brandTitle: "Orium's Accelerator",
  // brandUrl: 'https://orium.com',
  // brandImage:
  //   'https://orium.com/images/brand-logo/wordmark-dark-2.svg',
})

addons.setConfig({
  theme,
})