import StickyNav from '../components/StickyNav.vue';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components/Navigation/StickyNav',
  component: StickyNav,
  decorators: [withDesign],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sticky header that hides on scroll down and reappears on scroll up. ' +
          'Contains the wordmark, a Docs link (desktop), and a menu button slot. ' +
          'Toggle the theme with the toolbar to see both light and dark variants.',
      },
    },
  },
  argTypes: {},
};

export const Default = () => ({
  components: { StickyNav },
  template: `
    <div>
      <StickyNav />
      <div style="
        padding: var(--spacing-xl) var(--spacing-lg);
        font-family: var(--fontFamily-primary);
        color: var(--foreground);
        background: var(--background);
      ">
        <p style="font-size: var(--font-2xs); color: var(--foreground-muted);">
          Scroll within the preview to test the hide/show scroll behavior.
        </p>
        <div style="height: 200vh;" />
      </div>
    </div>
  `,
});
Default.storyName = 'Default';
