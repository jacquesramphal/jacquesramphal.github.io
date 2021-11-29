import Banner from './Banner.vue';

export default {
  title: 'Components/Banner',
  component: Banner,
  argTypes: {
    type: { control: { type: 'select', options: ['background', 'base'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Banner },
  template: '<Banner v-bind="$props" />',
});

export const Base = Template.bind({});
Base.args = {
  base: true,
  type: Base,
};

export const Background = Template.bind({});
Background.args = {
  background: true,
  type: Background,
};