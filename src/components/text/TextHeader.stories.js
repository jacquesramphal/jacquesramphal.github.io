import TextHeader from "./TextHeader.vue";

export default {
  title: "Components/text/TextHeader",
  component: TextHeader,
  argTypes: {
    title: { control: "text" },
    tag1: { control: "text" },
    typography: { control: "text" },
    description: { control: "text" },
  },
};

const Template = (args) => ({
  components: { TextHeader },
  setup() {
    return { args };
  },
  template: '<TextHeader v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: "Section Title",
  tag1: "3 min read",
  typography: "Design",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};
