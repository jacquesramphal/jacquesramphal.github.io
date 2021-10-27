import TextBlock from './TextBlock.vue';

export default {
  title: 'Example/TextBlock',
  component: TextBlock,
  argTypes: {
    align: { control: { type: 'select', options: ['center', 'left'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextBlock },
  template: '<text-block v-bind="$props" />',
});

export const Left = Template.bind({});
Left.args = {
  left: true,
  label: 'Left',
};

export const Center = Template.bind({});
Center.args = {
  label: 'Center',
};