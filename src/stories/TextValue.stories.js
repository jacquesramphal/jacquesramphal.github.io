import TextValue from "../components/text/TextValue.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Text/TextValue",
  component: TextValue,
  decorators: [withDesign],
  argTypes: {},
};

const Template = (args) => ({
  components: { TextValue },
  setup() {
    return { args };
  },
  template: '<TextValue v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
