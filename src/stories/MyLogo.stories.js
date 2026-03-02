import MyLogo from '../components/MyLogo.vue';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components/Primitives/Logo',
  component: MyLogo,
  decorators: [withDesign],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['24px', '32px', '48px', '64px', '96px', '128px'],
      description: 'Block size of the SVG logo mark',
    },
  },
};

const Template = (args) => ({
  components: { MyLogo },
  setup() { return { args }; },
  template: '<MyLogo v-bind="args" />',
});

export const Small = Template.bind({});
Small.args = { size: '24px' };

export const Default = Template.bind({});
Default.args = { size: '48px' };

export const Large = Template.bind({});
Large.args = { size: '96px' };

export const XLarge = Template.bind({});
XLarge.args = { size: '128px' };
XLarge.storyName = 'X-Large';

export const OnDarkAndLight = () => ({
  components: { MyLogo },
  template: `
    <div style="display: flex; gap: 0;">
      <div style="background: var(--color-offblack); padding: var(--spacing-md); display: flex; align-items: center; justify-content: center; flex: 1;">
        <MyLogo size="64px" />
      </div>
      <div style="background: var(--color-offwhite); padding: var(--spacing-md); display: flex; align-items: center; justify-content: center; flex: 1;">
        <MyLogo size="64px" />
      </div>
    </div>
  `,
});
OnDarkAndLight.storyName = 'On Dark & Light';
OnDarkAndLight.parameters = { layout: 'fullscreen' };
