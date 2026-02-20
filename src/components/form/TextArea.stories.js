import TextArea from "./TextArea.vue";

export default {
  title: "Components/Forms/TextArea",
  component: TextArea,
  argTypes: {
    id: { control: "text" },
    name: { control: "text" },
    label: { control: "text" },
    placeholder: { control: "text" },
  },
};

const Template = (args) => ({
  components: { TextArea },
  setup() {
    return { args };
  },
  template: '<TextArea v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  id: "textarea-id",
  name: "message",
  label: "Your message",
  placeholder: "Write your message here...",
};
