import TextLink from "../components/text/TextLink.vue";

export default {
  title: "Components/Primitives/TextLink",
  component: TextLink,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Inline link component. Pass `route` for Vue Router navigation or `link` for external URLs. ' +
          'The `large` prop increases size; `left`/`right` add directional arrow indicators.',
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    route: { control: "text" },
    link: { control: "text" },
    large: { control: "boolean" },
    left: { control: "boolean" },
    right: { control: "boolean" },
  },
};

const Template = (args) => ({
  components: { TextLink },
  setup() {
    return { args };
  },
  template: `
    <TextLink
      v-bind="args"
    />
  `,
});

export const Default = Template.bind({});
Default.args = {
  label: "Text Link Label",
  route: "/some-route",
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  label: "Text Link Label",
  link: "https://example.com",
};
