import MainFooter from '../components/MainFooter.vue';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components/Navigation/MainFooter',
  component: MainFooter,
  decorators: [withDesign],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Full-width site footer with avatar, copyright, and nav links. Used on all primary pages.',
      },
    },
  },
  argTypes: {},
};

export const Default = () => ({
  components: { MainFooter },
  template: '<MainFooter />',
});
Default.storyName = 'Default';
