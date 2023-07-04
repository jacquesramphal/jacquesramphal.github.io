import TextStats from "../components/card/TextStats.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Text/TextStats",
  component: TextStats,
  decorators: [withDesign],
  argTypes: {},
};

const Template = (args) => ({
  components: { TextStats },
  setup() {
    return { args };
  },
  template: '<TextStats v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
