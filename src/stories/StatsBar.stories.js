import TextStats from "../components/card/TextStats.vue";
import GridContainer from "../components/grid/GridContainer.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Cards/TextStats",
  component: TextStats,
  decorators: [withDesign],
  argTypes: {
    value1: { control: "text" },
    label1: { control: "text" },
    value2: { control: "text" },
    label2: { control: "text" },
    value3: { control: "text" },
    label3: { control: "text" },
  },
};

const Template = (args) => ({
  components: { TextStats, GridContainer },
  setup() {
    return { args };
  },
  template: '<TextStats v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  value1: "12+",
  label1: "Years of Experience",
  value2: "50+",
  label2: "Products Shipped",
  value3: "100%",
  label3: "Remote-friendly",
};
