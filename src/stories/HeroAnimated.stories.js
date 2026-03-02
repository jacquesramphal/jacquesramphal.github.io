import HeroAnimated from '../components/HeroAnimated.vue';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components/Layout/HeroAnimated',
  component: HeroAnimated,
  decorators: [withDesign],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Animated hero section with text reveal. Used on the home page. ' +
          'No configurable props — the animation and content are baked in.',
      },
    },
  },
  argTypes: {},
};

export const Default = () => ({
  components: { HeroAnimated },
  template: '<HeroAnimated />',
});
Default.storyName = 'Default';
