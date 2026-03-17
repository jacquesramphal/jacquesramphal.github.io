import TextStats from "../components/card/TextStats.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Cards/TextStats",
  component: TextStats,
  tags: ['autodocs'],
  decorators: [withDesign],
  parameters: {
    docs: {
      description: {
        component:
          'A horizontal stats bar with up to three value/label pairs. ' +
          'Used for career highlights, project metrics, or quick facts. ' +
          'For composable stat pairs see the `TextValue` Stat Row story.',
      },
    },
  },
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
  components: { TextStats },
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
