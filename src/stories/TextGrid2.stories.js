import TextGrid2 from "../components/card/TextGrid2.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Text/TextGrid2",
  component: TextGrid2,
  decorators: [withDesign],
  argTypes: {},
};

const Template = (args) => ({
  components: { TextGrid2 },
  setup() {
    return { args };
  },
  template: '<TextGrid2 v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
