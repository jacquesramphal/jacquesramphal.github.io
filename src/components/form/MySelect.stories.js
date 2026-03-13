import MySelect from "./MySelect.vue";

export default {
  title: "Components/Forms/Select",
  component: MySelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Styled select dropdown with a visible label. Options are passed via the default slot.',
      },
    },
  },
  argTypes: {
    id: { control: "text" },
    name: { control: "text" },
    label: { control: "text" },
  },
};

const Template = (args) => ({
  components: { MySelect },
  setup() {
    return { args };
  },
  template: '<MySelect v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  id: "select-id",
  name: "select-name",
  label: "Choose an option",
};
