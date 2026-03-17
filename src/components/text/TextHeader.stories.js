import TextHeader from "./TextHeader.vue";

export default {
  title: "Components/Primitives/TextHeader",
  component: TextHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Section or article header with a title, optional category tag, read-time indicator, and description. ' +
          'Used at the top of article pages and case study sections.',
      },
    },
  },
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
