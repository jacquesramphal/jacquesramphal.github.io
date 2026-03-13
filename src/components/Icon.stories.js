import MyIcon from "./Icon.vue";

export default {
  title: "Components/Primitives/Icon",
  component: MyIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Renders a unicode character or emoji at a given pixel size. ' +
          'Set `isSvg: true` to render an SVG file from assets instead. ' +
          'Used inside Button, TextLink, and other components that accept an `icon` prop.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: [16, 24, 32, 48, 64],
    },
    isSvg: { control: "boolean" },
    unicode: { control: "text" },
  },
};

const Template = (args) => ({
  components: { MyIcon },
  setup() {
    return { args };
  },
  template: '<MyIcon v-bind="args" />',
});

export const Small = Template.bind({});
Small.args = {
  unicode: "★",
  isSvg: false,
  size: 16,
};

export const Medium = Template.bind({});
Medium.args = {
  unicode: "★",
  isSvg: false,
  size: 32,
};

export const Large = Template.bind({});
Large.args = {
  unicode: "★",
  isSvg: false,
  size: 64,
};

export const Emoji = Template.bind({});
Emoji.args = {
  unicode: "🎨",
  isSvg: false,
  size: 32,
};
