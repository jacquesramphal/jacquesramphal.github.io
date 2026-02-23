import MyInput from "../components/form/MyInput.vue";
import { withDesign } from "storybook-addon-designs";
import { ref } from "vue";

export default {
  title: "Components/Forms/MyInput",
  component: MyInput,
  decorators: [withDesign],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "checkbox", "radio"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "small"],
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    hideLabel: { control: "boolean" },
    submitButton: { control: "boolean" },
    submitDisabled: { control: "boolean" },
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

export const Small = Template.bind({});
Small.args = {
  id: "input-small",
  name: "small-input",
  type: "text",
  label: "Small input",
  placeholder: "Small variant...",
  size: "small",
};

export const SmallWithSubmit = (args) => ({
  components: { MyInput },
  setup() {
    const value = ref("");
    const submitted = ref(null);
    function onSubmit() {
      if (value.value.trim()) {
        submitted.value = value.value;
        value.value = "";
      }
    }
    return { args, value, submitted, onSubmit };
  },
  template: `
    <div style="max-width: 320px;">
      <MyInput
        v-bind="args"
        v-model="value"
        :submitDisabled="!value.trim()"
        @submit="onSubmit"
      />
      <p v-if="submitted" style="margin-top: 1rem; font-size: 0.875rem; opacity: 0.7;">
        Submitted: {{ submitted }}
      </p>
    </div>
  `,
});
SmallWithSubmit.args = {
  id: "input-small-submit",
  name: "small-submit-input",
  type: "text",
  label: "Small with submit",
  placeholder: "Type and hit send...",
  size: "small",
  submitButton: true,
};

export const WithSubmitButton = (args) => ({
  components: { MyInput },
  setup() {
    const value = ref("");
    const submitted = ref(null);
    function onSubmit() {
      if (value.value.trim()) {
        submitted.value = value.value;
        value.value = "";
      }
    }
    return { args, value, submitted, onSubmit };
  },
  template: `
    <div style="max-width: 400px;">
      <MyInput
        v-bind="args"
        v-model="value"
        :submitDisabled="!value.trim()"
        @submit="onSubmit"
      />
      <p v-if="submitted" style="margin-top: 1rem; font-size: 0.875rem; opacity: 0.7;">
        Submitted: {{ submitted }}
      </p>
    </div>
  `,
});
WithSubmitButton.args = {
  id: "input-submit",
  name: "submit-input",
  type: "text",
  label: "Ask a question",
  placeholder: "Type something and hit send...",
  submitButton: true,
  submitDisabled: false,
};
