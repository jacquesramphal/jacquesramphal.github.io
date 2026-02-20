import MyButton from "./Button.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Forms/Button",
  component: MyButton,
  decorators: [withDesign],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["solid", "outline", "ghost", "subtle", "textlink"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "small", "large"],
    },
    label: { control: "text" },
  },
};

const Template = (args) => ({
  components: { MyButton },
  setup() {
    return { args };
  },
  template: '<my-button v-bind="args" />',
});

// --- Types ---

export const Solid = Template.bind({});
Solid.args = { label: "Solid", type: "solid", size: "large" };

export const Outline = Template.bind({});
Outline.args = { label: "Outline", type: "outline", size: "large" };

export const Ghost = Template.bind({});
Ghost.args = { label: "Ghost", type: "ghost", size: "large" };

export const Subtle = Template.bind({});
Subtle.args = { label: "Subtle", type: "subtle", size: "large" };

export const TextLink = Template.bind({});
TextLink.args = { label: "Text Link", type: "textlink", size: "large" };

// --- Sizes ---

export const SizeLarge = Template.bind({});
SizeLarge.storyName = "Size / Large";
SizeLarge.args = { label: "Large", type: "solid", size: "large" };

export const SizeSmall = Template.bind({});
SizeSmall.storyName = "Size / Small";
SizeSmall.args = { label: "Small", type: "solid", size: "small" };

export const SizeXS = Template.bind({});
SizeXS.storyName = "Size / XS";
SizeXS.args = { label: "XS", type: "solid", size: "xs" };

// --- All types at a glance ---

export const AllTypes = () => ({
  components: { MyButton },
  template: `
    <div style="display: flex; flex-wrap: wrap; gap: 1.6rem; align-items: center; padding: 2.4rem;">
      <my-button label="Solid" type="solid" size="large" />
      <my-button label="Outline" type="outline" size="large" />
      <my-button label="Ghost" type="ghost" size="large" />
      <my-button label="Subtle" type="subtle" size="large" />
      <my-button label="Text Link" type="textlink" size="large" />
    </div>
  `,
});
