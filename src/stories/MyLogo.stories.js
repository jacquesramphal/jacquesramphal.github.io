import MyLogo from "../components/MyLogo.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/MyLogo",
  component: MyLogo,
  decorators: [withDesign],
  argTypes: {},
};

const Template = (args) => ({
  components: { MyLogo },
  setup() {
    return { args };
  },
  template: '<MyLogo v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
