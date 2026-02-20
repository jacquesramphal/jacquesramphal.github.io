import MyInput from "../components/form/MyInput.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Forms/MyInput",
  component: MyInput,
  decorators: [withDesign],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "checkbox", "radio"],
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    hideLabel: { control: "boolean" },
  },
};

const Template = (args) => ({
  components: { MyInput },
  setup() {
    return { args };
  },
  template: '<MyInput v-bind="args" />',
});

export const Text = Template.bind({});
Text.args = {
  id: "input-text",
  name: "text-input",
  type: "text",
  label: "Full name",
  placeholder: "Enter your name",
};

export const Email = Template.bind({});
Email.args = {
  id: "input-email",
  name: "email",
  type: "email",
  label: "Email address",
  placeholder: "you@example.com",
};

export const Password = Template.bind({});
Password.args = {
  id: "input-password",
  name: "password",
  type: "password",
  label: "Password",
  placeholder: "••••••••",
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: "input-disabled",
  name: "disabled-input",
  type: "text",
  label: "Disabled field",
  placeholder: "Not editable",
  disabled: true,
};
