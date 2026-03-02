import TextBlock from "./TextBlock";

export default {
  title: "Components/Layout/TextBlock",
  component: TextBlock,
  argTypes: {
    alt: { control: "text" },
    as: {
      control: {
        type: 'text',
        options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      },
      defaultValue: 'h1',
    },
    eyebrow: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
    center: { control: "boolean" },
    clamped: { control: "boolean" },
    cta: { control: "text" },
    route: { control: "text" },
    btnroute: { control: "text" },
    link: { control: "text" },
    label: { control: "text" },
    icon: { control: "text" },
  },
};

const Template = (args) => ({
  components: { TextBlock },
  setup() {
    return { args };
  },
  template: `
    <TextBlock
      v-bind="args"
    />
  `,
});

export const Default = Template.bind({});
Default.args = {
  icon: "j-logo.svg",
  alt: "Logo",
  as: "h1",
  eyebrow: "Eyebrow",
  title: "This Header Text",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  center: false,
  clamped: false,
  cta: "Call to Action",
  btnroute: "your-route-here", // Provide a valid route value
  link: "",
  label: "This is a label",
};
