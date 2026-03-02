import ThemeButton from './ThemeButton.vue';

export default {
  title: 'Components/Primitives/ThemeButton',
  component: ThemeButton,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          'A theme toggle button that reads from `localStorage` and `prefers-color-scheme`. ' +
          'Applies `light-theme` or `dark-theme` class to `document.documentElement`. ' +
          'No props — it is fully self-contained. Use the Storybook dark mode toolbar to see both states.',
      },
    },
  },
};

// The ThemeButton positions itself absolutely (fixed to viewport corner).
// Wrap it in a relative container so it renders visibly in the story canvas.
export const Default = () => ({
  components: { ThemeButton },
  template: `
    <div style="
      position: relative;
      height: 8rem;
      background: var(--background);
      border: var(--border);
      border-radius: var(--size-1);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-inline-end: var(--spacing-xxs);
    ">
      <ThemeButton />
    </div>
  `,
});
Default.storyName = 'Default';

// Simulate the button in context — positioned as it would appear in the nav
export const InNavContext = () => ({
  components: { ThemeButton },
  template: `
    <div style="
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-xxs) var(--spacing-sm);
      background: var(--background);
      border-bottom: var(--border);
      font-family: var(--fontFamily-primary);
      font-size: var(--font-2xs);
      color: var(--foreground);
    ">
      <span style="font-weight: var(--fontWeight-bold)">Ramphal Library</span>
      <ThemeButton />
    </div>
  `,
});
InNavContext.storyName = 'In Nav Context';
InNavContext.parameters = { layout: 'fullscreen' };
