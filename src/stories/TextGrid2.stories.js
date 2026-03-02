import TextGrid2 from "../components/card/TextGrid2.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Layout/TextGrid2",
  component: TextGrid2,
  decorators: [withDesign],
  argTypes: {
    label1: { control: "text" },
    label2: { control: "text" },
    label3: { control: "text" },
    value1: { control: "text" },
    value2: { control: "text" },
    value3: { control: "text" },
    subtitle: { control: "text" },
    description: { control: "text" },
  },
};

const Template = (args) => ({
  components: { TextGrid2 },
  setup() {
    return { args };
  },
  template: '<TextGrid2 v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  label1: "Role",
  value1: "Staff Product Designer",
  label2: "Location",
  value2: "Remote",
  label3: "Focus",
  value3: "Design Systems",
  subtitle: "About This Work",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
};
