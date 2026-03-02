import TextValue from '../components/text/TextValue.vue';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components/Primitives/TextValue',
  component: TextValue,
  decorators: [withDesign],
  argTypes: {
    label: { control: 'text', description: 'The label shown above the value' },
    value: { control: 'text', description: 'The value displayed prominently' },
  },
};

const Template = (args) => ({
  components: { TextValue },
  setup() { return { args }; },
  template: '<TextValue v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = { label: 'Label', value: 'Value' };

export const Stat = Template.bind({});
Stat.args = { label: 'Years of Experience', value: '12+' };

export const Text = Template.bind({});
Text.args = { label: 'Currently at', value: 'Orium' };

export const Percentage = Template.bind({});
Percentage.args = { label: 'Remote-friendly', value: '100%' };

export const StatRow = () => ({
  components: { TextValue },
  template: `
    <div style="display: flex; gap: var(--spacing-lg); padding: var(--spacing-md); flex-wrap: wrap;">
      <TextValue label="Years of Experience" value="12+" />
      <TextValue label="Products Shipped" value="50+" />
      <TextValue label="Design Tokens" value="100+" />
      <TextValue label="Themes" value="2" />
    </div>
  `,
});
StatRow.storyName = 'Stat Row';
