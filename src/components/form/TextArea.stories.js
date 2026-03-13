import TextArea from "./TextArea.vue";

export default {
  title: "Components/Forms/Textarea",
  component: TextArea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Multi-line text input with a visible label and placeholder. Used in contact and feedback forms.',
      },
    },
  },
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
