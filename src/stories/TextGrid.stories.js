import TextGrid from "../components/card/TextGrid.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Layout/TextGrid",
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
Default.args = {
  title: "Key Features",
  as: "h2",
  description: "Our platform offers a comprehensive set of features designed to enhance your workflow and productivity.",
  eyebrow1: "Seamless Integration",
  detail1: "Easily integrate with your existing tools and workflows. Our platform works with all major development environments and frameworks.",
  eyebrow2: "Advanced Analytics",
  detail2: "Get detailed insights into your application's performance with real-time analytics and customizable dashboards.",
  eyebrow3: "Automated Workflows",
  detail3: "Save time with automated processes and intelligent task management that streamlines your development pipeline.",
  eyebrow4: "Robust Security",
  detail4: "Enterprise-grade security features to protect your data and ensure compliance with industry standards."
};
