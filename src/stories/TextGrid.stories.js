import TextGrid from "../components/card/TextGrid.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Text/TextGrid",
  component: TextGrid,
  decorators: [withDesign],
  argTypes: {},
};

const Template = (args) => ({
  components: { TextGrid },
  setup() {
    return { args };
  },
  template: '<TextGrid v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
