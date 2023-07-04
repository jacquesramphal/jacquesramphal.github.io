import StickyNav from "../components/StickyNav.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/StickyNav",
  component: StickyNav,
  decorators: [withDesign],
  argTypes: {},
};

const Template = (args) => ({
  components: { StickyNav },
  setup() {
    return { args };
  },
  template: '<StickyNav v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
