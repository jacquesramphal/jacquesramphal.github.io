import MyInput from "../components/form/MyInput.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Forms/MyInput",
  component: MyInput,
  decorators: [withDesign],
  argTypes: {},
};

const Template = (args) => ({
  components: { MyInput },
  setup() {
    return { args };
  },
  template: '<MyInput v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
