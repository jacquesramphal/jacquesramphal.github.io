import { create } from '@storybook/theming';

// Shared paths for the logo mark (original 359×437, scaled in the SVG via transform)
const paths = `<g transform="translate(0,3) scale(0.0778)"><path d="M90.8534 345.494L147.225 289.122" stroke="%23FFC972" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><path d="M300.203 391.7L311.74 380.163" stroke="%23FFBCCD" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><path d="M326.514 14C335.335 22.821 335.436 37.225 326.514 45.944L326.423 46.036L243.459 129" stroke="%2300D2C5" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><path d="M64.5697 244L48.5967 259.973H48.5977C39.5957 268.61 25.4747 268.794 16.6537 259.973C7.83268 251.152 7.73168 236.748 16.6537 228.029L16.6527 228.028L23.0417 221.639" stroke="%2300D2C5" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><path d="M211.515 65.1115C220.336 73.9325 234.457 73.7485 243.459 65.1115L280.195 28.3745" stroke="%23F85CA5" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><path d="M220.39 26.27L231.93 14.73" stroke="%23FFBCCD" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><path d="M281.792 282.333L310.224 253.901L310.143 253.821C319.144 245.184 333.266 245 342.086 253.821C350.908 262.642 351.009 277.046 342.086 285.765L339.292 288.722" stroke="%23FFC972" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><path d="M214.709 157.75C205.787 166.469 205.888 180.873 214.709 189.694C223.53 198.515 237.651 198.331 246.653 189.694L278.598 157.749L310.143 126.204C319.144 117.567 333.266 117.383 342.086 126.204" stroke="%23FFC972" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><path d="M275.403 416.5C266.402 425.137 252.28 425.321 243.459 416.5C234.638 407.679 234.537 393.275 243.459 384.556L313.737 314.277" stroke="%2300D2C5" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><path d="M339.292 160.944L112.487 387.75C103.565 396.469 103.666 410.873 112.487 419.694C121.308 428.515 135.429 428.331 144.431 419.694L150.82 413.305L249.682 314.443" stroke="%2380CCEB" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><path d="M64.5697 371.778C55.5677 380.415 41.4467 380.599 32.6257 371.778C23.8047 362.957 23.7037 348.553 32.6257 339.834L122.069 250.389C130.991 241.67 130.89 227.266 122.069 218.445C113.248 209.624 99.1267 209.808 90.1247 218.445" stroke="%23F85CA5" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></g>`;

// Combined lockup: logo mark + wordmark. Two versions for dark/light sidebars.
// brandImage is rendered as <img> so currentColor doesn't work — colour is baked in.
const logoDark = `data:image/svg+xml,<svg width="160" height="40" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">${paths}<text x="34" y="26" font-family="ui-sans-serif,system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="%23fafafa">Ramphal Library</text></svg>`;

const logoLight = `data:image/svg+xml,<svg width="160" height="40" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">${paths}<text x="34" y="26" font-family="ui-sans-serif,system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="%231d1b22">Ramphal Library</text></svg>`;

const shared = {
  brandTitle: 'Ramphal Library',
  brandUrl: 'https://jacquesramphal.github.io',
  brandTarget: '_blank',
  fontBase: "'Manrope', ui-sans-serif, system-ui, -apple-system, sans-serif",
  fontCode: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
  appBorderRadius: 8,
  inputBorderRadius: 6,
  colorPrimary: '#00D2C5',
  colorSecondary: '#00D2C5',
};

export const darkTheme = create({
  base: 'dark',
  ...shared,
  brandImage: logoDark,
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
  brandImage: logoLight,
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
  barSelectedColor: '#1d1b22',
  barHoverColor: '#1d1b22',
  // Inputs
  inputBg: '#ffffff',
  inputBorder: '#d6d6d6',
  inputTextColor: '#1d1b22',
});
