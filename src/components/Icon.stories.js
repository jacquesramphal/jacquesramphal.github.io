import MyIcon from "./Icon.vue";

export default {
  title: "Components/Icon",
  component: MyIcon,
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
