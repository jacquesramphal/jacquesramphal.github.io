import SimpleFooter from "./SimpleFooter.vue";

export default {
  title: "Components/Navigation/SimpleFooter",
  component: SimpleFooter,
  tags: ['autodocs'],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          'Minimal footer bar with a site name label. ' +
          'Used inside the Artboard pattern and on pages that don\'t need full nav links.',
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "Site name or copyright label" },
  },
};

const Template = (args) => ({
  components: { SimpleFooter },
  setup() {
    return { args };
  },
  template: '<SimpleFooter v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: "Jacques Ramphal",
};
