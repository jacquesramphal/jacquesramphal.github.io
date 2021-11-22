import Container from './Container.vue';


export default {
  title: 'Components/Container',
  component: Container,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Container },
  template: '<Container v-bind="$props" />',
});

export const Normal = Template.bind({});
Normal.args = {
  normal: true,
};

export const Tight = Template.bind({});
Tight.args = {
  tight: true,
};