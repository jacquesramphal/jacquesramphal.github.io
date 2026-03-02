/**
 * Foundation / Tokens
 *
 * Custom token showcase built from the CSS custom properties defined in
 * src/assets/styles/scss/_config.scss. Tokens are read live from the
 * document so they automatically reflect the active light/dark theme.
 *
 * Doc Blocks (MDX) are still supported in Storybook 7 but work best for
 * component documentation. A custom story is a better fit for token display.
 */

// ---------------------------------------------------------------------------
// Shared styles injected once into the Storybook preview document
// ---------------------------------------------------------------------------
const STYLES = `
  .tok-page {
    padding: var(--spacing-lg);
    font-family: var(--fontFamily-primary);
    color: var(--foreground);
    background: var(--background);
    min-height: 100vh;
    box-sizing: border-box;
  }
  .tok-section {
    margin-bottom: var(--spacing-lg);
  }
  .tok-section h2 {
    font-size: var(--font-600);
    font-weight: var(--fontWeight-bold);
    margin: 0 0 var(--spacing-xs);
    padding-bottom: var(--spacing-xs);
    border-bottom: var(--border);
    letter-spacing: var(--letterSpacing-tight);
  }
  .tok-section h3 {
    font-size: 1.1rem;
    font-weight: var(--fontWeight-bold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--foreground-muted);
    margin: var(--spacing-md) 0 var(--spacing-xs);
  }

  /* ── Color grid ── */
  .tok-color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(9.6rem, 1fr));
    gap: 1.6rem;
  }
  .tok-color-item {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  .tok-color-swatch {
    height: 6.4rem;
    border-radius: var(--size-1);
    border: 1px solid rgba(128, 128, 128, 0.12);
  }
  .tok-color-name {
    font-size: 1.2rem;
    font-weight: var(--fontWeight-medium);
    line-height: 1.3;
  }
  .tok-color-token {
    font-size: 1rem;
    font-family: monospace;
    color: var(--foreground-muted);
    word-break: break-all;
  }

  /* ── Type rows ── */
  .tok-type-row {
    display: flex;
    align-items: baseline;
    gap: 2.4rem;
    padding: 1.2rem 0;
    border-bottom: 1px solid rgba(128, 128, 128, 0.1);
  }
  .tok-type-token {
    font-family: monospace;
    font-size: 1.1rem;
    color: var(--foreground-muted);
    min-width: 16rem;
    flex-shrink: 0;
  }
  .tok-type-specimen {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 1;
    line-height: 1.2;
  }
  .tok-type-meta {
    font-family: monospace;
    font-size: 1rem;
    color: var(--foreground-muted);
    flex-shrink: 0;
    text-align: right;
    min-width: 10rem;
  }

  /* ── Weight rows ── */
  .tok-weight-row {
    display: flex;
    align-items: center;
    gap: 2.4rem;
    padding: 1.2rem 0;
    border-bottom: 1px solid rgba(128, 128, 128, 0.1);
  }
  .tok-weight-token {
    font-family: monospace;
    font-size: 1.1rem;
    color: var(--foreground-muted);
    min-width: 22rem;
    flex-shrink: 0;
  }
  .tok-weight-specimen {
    font-size: var(--font-600);
    flex: 1;
  }

  /* ── Family rows ── */
  .tok-family-row {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.6rem 0;
    border-bottom: 1px solid rgba(128, 128, 128, 0.1);
  }

  /* ── Spacing rows ── */
  .tok-spacing-row {
    display: flex;
    align-items: center;
    gap: 2.4rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid rgba(128, 128, 128, 0.1);
  }
  .tok-spacing-token {
    font-family: monospace;
    font-size: 1.1rem;
    color: var(--foreground-muted);
    min-width: 18rem;
    flex-shrink: 0;
  }
  .tok-spacing-bar-wrap {
    flex: 1;
    max-width: 48rem;
    overflow: hidden;
  }
  .tok-spacing-bar {
    height: 2rem;
    background: var(--color-blue);
    opacity: 0.45;
    border-radius: 2px;
    min-width: 2px;
  }
  .tok-spacing-value {
    font-family: monospace;
    font-size: 1rem;
    color: var(--foreground-muted);
    min-width: 6rem;
    text-align: right;
    flex-shrink: 0;
  }

  /* ── Radius ── */
  .tok-radius-row {
    display: flex;
    align-items: center;
    gap: 2.4rem;
    padding: 1.2rem 0;
    border-bottom: 1px solid rgba(128, 128, 128, 0.1);
  }
  .tok-radius-token {
    font-family: monospace;
    font-size: 1.1rem;
    color: var(--foreground-muted);
    min-width: 14rem;
    flex-shrink: 0;
  }
  .tok-radius-swatch {
    width: 6.4rem;
    height: 6.4rem;
    border: 2px solid var(--foreground-muted);
    flex-shrink: 0;
  }

  /* ── Shadows ── */
  .tok-shadow-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: 3.2rem;
  }
  .tok-shadow-item {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    padding: 3.2rem 2.4rem;
    border-radius: var(--size-2);
    background: var(--background);
  }
  .tok-shadow-token {
    font-family: monospace;
    font-size: 1.1rem;
    font-weight: var(--fontWeight-medium);
  }
  .tok-shadow-label {
    font-size: 1.1rem;
    color: var(--foreground-muted);
  }
`;

function injectTokenStyles() {
  if (document.getElementById('_tok-styles')) return;
  const el = document.createElement('style');
  el.id = '_tok-styles';
  el.textContent = STYLES;
  document.head.appendChild(el);
}

// ---------------------------------------------------------------------------
// Story metadata
// ---------------------------------------------------------------------------
export default {
  title: 'Foundation/Tokens',
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: false },
  },
};

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------
export const Colors = () => ({
  setup() {
    injectTokenStyles();
    return {
      groups: [
        {
          label: 'Semantic',
          tokens: [
            { name: 'foreground', token: '--foreground' },
            { name: 'foreground-muted', token: '--foreground-muted' },
            { name: 'background', token: '--background' },
            { name: 'background-darker', token: '--background-darker' },
            { name: 'link', token: '--link' },
          ],
        },
        {
          label: 'Neutrals',
          tokens: [
            { name: 'offblack', token: '--color-offblack' },
            { name: 'black', token: '--color-black' },
            { name: 'slate', token: '--color-slate' },
            { name: 'dark', token: '--color-dark' },
            { name: 'medium', token: '--color-medium' },
            { name: 'light', token: '--color-light' },
            { name: 'xlight', token: '--color-xlight' },
            { name: 'xxlight', token: '--color-xxlight' },
            { name: 'xxxlight', token: '--color-xxxlight' },
            { name: 'offwhite', token: '--color-offwhite' },
            { name: 'white', token: '--color-white' },
          ],
        },
        {
          label: 'Accent',
          tokens: [
            { name: 'red', token: '--color-red' },
            { name: 'green', token: '--color-green' },
            { name: 'blue', token: '--color-blue' },
            { name: 'dodgerblue', token: '--color-dodgerblue' },
            { name: 'purple', token: '--color-purple' },
            { name: 'lightpurple', token: '--color-lightpurple' },
            { name: 'yellow', token: '--color-yellow' },
            { name: 'lightyellow', token: '--color-lightyellow' },
            { name: 'accent', token: '--color-accent' },
            { name: 'brown', token: '--color-brown' },
            { name: 'darkbrown', token: '--color-darkbrown' },
            { name: 'pink', token: '--color-pink' },
          ],
        },
        {
          label: 'States',
          tokens: [
            { name: 'action', token: '--color-action' },
            { name: 'danger', token: '--color-danger' },
            { name: 'success', token: '--color-success' },
            { name: 'disabled', token: '--color-disabled' },
          ],
        },
        {
          label: 'Gradients',
          tokens: [
            { name: 'sunrise-start', token: '--gradient-sunrise-start' },
            { name: 'sunrise-mid', token: '--gradient-sunrise-mid' },
            { name: 'sunrise-end', token: '--gradient-sunrise-end' },
          ],
        },
      ],
    };
  },
  template: `
    <div class="tok-page">
      <div class="tok-section" v-for="group in groups" :key="group.label">
        <h3>{{ group.label }}</h3>
        <div class="tok-color-grid">
          <div class="tok-color-item" v-for="t in group.tokens" :key="t.token">
            <div class="tok-color-swatch" :style="{ background: 'var(' + t.token + ')' }"></div>
            <div class="tok-color-name">{{ t.name }}</div>
            <div class="tok-color-token">{{ t.token }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
});
Colors.storyName = 'Colors';

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------
export const Typography = () => ({
  setup() {
    injectTokenStyles();
    return {
      fluidScale: [
        { token: '--font-1000', label: 'Display', value: 'clamp(4.8rem, 7vw, 12.8rem)' },
        { token: '--font-900', label: 'H1', value: 'clamp(4.8rem, 7vw, 8rem)' },
        { token: '--font-800', label: 'H2', value: 'clamp(3.6rem, 7vw, 4.8rem)' },
        { token: '--font-700', label: 'H3', value: 'clamp(2.8rem, 7vw, 3.6rem)' },
        { token: '--font-600', label: 'H4', value: '2.8rem' },
        { token: '--font-500', label: 'H5 / Body', value: '2.0rem' },
        { token: '--font-400', label: 'H6 / Small', value: '1.6rem' },
        { token: '--font-300', label: 'Smaller', value: '1.2rem' },
      ],
      absoluteScale: [
        { token: '--font-4xl', value: '12.8rem' },
        { token: '--font-3xl', value: '8.0rem' },
        { token: '--font-2xl', value: '7.2rem' },
        { token: '--font-xl', value: '6.4rem' },
        { token: '--font-lg', value: '4.8rem' },
        { token: '--font-md', value: '3.6rem' },
        { token: '--font-sm', value: '2.8rem' },
        { token: '--font-xs', value: '2.0rem' },
        { token: '--font-2xs', value: '1.6rem' },
        { token: '--font-3xs', value: '1.2rem' },
      ],
      weights: [
        { token: '--fontWeight-light', label: 'Light', value: '300' },
        { token: '--fontWeight-normal', label: 'Normal', value: '400' },
        { token: '--fontWeight-medium', label: 'Medium', value: '500' },
        { token: '--fontWeight-bold', label: 'Bold', value: '600' },
        { token: '--fontWeight-heavy', label: 'Heavy', value: '800' },
      ],
      families: [
        { token: '--fontFamily-primary', label: 'Primary' },
        { token: '--fontFamily-secondary', label: 'Secondary' },
        { token: '--fontFamily-displaySans', label: 'Display Sans' },
        { token: '--fontFamily-displaySerif', label: 'Display Serif' },
      ],
      letterSpacings: [
        { token: '--letterSpacing-tight', value: '-0.16rem' },
        { token: '--letterSpacing-base', value: '0' },
        { token: '--letterSpacing-loose', value: '0.03rem' },
      ],
      lineHeights: [
        { token: '--lineHeight-shorter', value: '1.1' },
        { token: '--lineHeight-short', value: '1.2' },
        { token: '--lineHeight-base', value: '1.4' },
        { token: '--lineHeight-tall', value: '1.5' },
        { token: '--lineHeight-taller', value: '1.8' },
      ],
    };
  },
  template: `
    <div class="tok-page">

      <div class="tok-section">
        <h2>Fluid Type Scale</h2>
        <div v-for="t in fluidScale" :key="t.token" class="tok-type-row">
          <div class="tok-type-token">{{ t.token }}</div>
          <div class="tok-type-specimen" :style="{ fontSize: 'var(' + t.token + ')' }">The quick brown fox</div>
          <div class="tok-type-meta">{{ t.label }} · {{ t.value }}</div>
        </div>
      </div>

      <div class="tok-section">
        <h2>Absolute Type Scale</h2>
        <div v-for="t in absoluteScale" :key="t.token" class="tok-type-row">
          <div class="tok-type-token">{{ t.token }}</div>
          <div class="tok-type-specimen" :style="{ fontSize: 'var(' + t.token + ')' }">Aa</div>
          <div class="tok-type-meta">{{ t.value }}</div>
        </div>
      </div>

      <div class="tok-section">
        <h2>Font Weights</h2>
        <div v-for="t in weights" :key="t.token" class="tok-weight-row">
          <div class="tok-weight-token">{{ t.token }} — {{ t.value }}</div>
          <div class="tok-weight-specimen" :style="{ fontWeight: 'var(' + t.token + ')' }">
            {{ t.label }} — The quick brown fox jumps over the lazy dog
          </div>
        </div>
      </div>

      <div class="tok-section">
        <h2>Font Families</h2>
        <div v-for="t in families" :key="t.token" class="tok-family-row">
          <div class="tok-type-token">{{ t.token }} — {{ t.label }}</div>
          <div :style="{ fontFamily: 'var(' + t.token + ')', fontSize: 'var(--font-600)' }">
            The quick brown fox jumps over the lazy dog
          </div>
        </div>
      </div>

      <div class="tok-section">
        <h2>Letter Spacing</h2>
        <div v-for="t in letterSpacings" :key="t.token" class="tok-type-row">
          <div class="tok-type-token">{{ t.token }}</div>
          <div class="tok-type-specimen"
            :style="{ letterSpacing: 'var(' + t.token + ')', fontSize: 'var(--font-600)' }">
            ABCDEFGHIJKLM
          </div>
          <div class="tok-type-meta">{{ t.value }}</div>
        </div>
      </div>

      <div class="tok-section">
        <h2>Line Height</h2>
        <div v-for="t in lineHeights" :key="t.token" class="tok-type-row">
          <div class="tok-type-token">{{ t.token }}</div>
          <div class="tok-type-specimen"
            :style="{ lineHeight: 'var(' + t.token + ')', fontSize: 'var(--font-500)' }">
            The quick brown fox<br/>jumps over the lazy dog
          </div>
          <div class="tok-type-meta">{{ t.value }}</div>
        </div>
      </div>

    </div>
  `,
});
Typography.storyName = 'Typography';

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------
export const Spacing = () => ({
  setup() {
    injectTokenStyles();
    return {
      spacingTokens: [
        { token: '--spacing-xxxs', value: '0.4rem' },
        { token: '--spacing-xxs', value: '0.8rem' },
        { token: '--spacing-xs', value: '1.6rem' },
        { token: '--spacing-sm', value: '2.4rem' },
        { token: '--spacing-md', value: '3.2rem' },
        { token: '--spacing-big', value: '4.8rem' },
        { token: '--spacing-lg', value: '8.0rem' },
        { token: '--spacing-xl', value: '12.8rem' },
        { token: '--spacing-xxl', value: '25.6rem' },
        { token: '--spacing-xxxl', value: '51.2rem' },
      ],
      radii: [
        { token: '--radius-sm', value: '0.4rem' },
        { token: '--radius-full', value: '9999px' },
      ],
      shadows: [
        { token: '--shadow-z1', label: 'Elevation 1' },
        { token: '--shadow-z2', label: 'Elevation 2' },
        { token: '--shadow-z3', label: 'Elevation 3' },
        { token: '--shadow-z4', label: 'Elevation 4' },
        { token: '--shadow-z5', label: 'Elevation 5' },
        { token: '--shadow-inner', label: 'Inner' },
        { token: '--shadow-light', label: 'Light' },
        { token: '--shadow-heavy', label: 'Heavy' },
        { token: '--shadow-hover', label: 'Hover' },
        { token: '--shadow-deep', label: 'Deep' },
      ],
    };
  },
  template: `
    <div class="tok-page">

      <div class="tok-section">
        <h2>Spacing Scale</h2>
        <div v-for="t in spacingTokens" :key="t.token" class="tok-spacing-row">
          <div class="tok-spacing-token">{{ t.token }}</div>
          <div class="tok-spacing-bar-wrap">
            <div class="tok-spacing-bar"
              :style="{ width: 'min(var(' + t.token + '), 100%)' }">
            </div>
          </div>
          <div class="tok-spacing-value">{{ t.value }}</div>
        </div>
      </div>

      <div class="tok-section">
        <h2>Border Radius</h2>
        <div v-for="t in radii" :key="t.token" class="tok-radius-row">
          <div class="tok-radius-token">{{ t.token }}</div>
          <div class="tok-radius-swatch" :style="{ borderRadius: 'var(' + t.token + ')' }"></div>
          <div class="tok-spacing-value">{{ t.value }}</div>
        </div>
      </div>

      <div class="tok-section">
        <h2>Shadows</h2>
        <div class="tok-shadow-grid">
          <div
            class="tok-shadow-item"
            v-for="t in shadows"
            :key="t.token"
            :style="{ boxShadow: 'var(' + t.token + ')' }"
          >
            <div class="tok-shadow-token">{{ t.token }}</div>
            <div class="tok-shadow-label">{{ t.label }}</div>
          </div>
        </div>
      </div>

    </div>
  `,
});
Spacing.storyName = 'Spacing';
