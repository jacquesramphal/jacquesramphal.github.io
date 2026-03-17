import DynamicText from "./DynamicText.vue";

export default {
  title: "Components/Primitives/DynamicText",
  component: DynamicText,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A renderless-style wrapper that renders any heading or text element via the `as` prop (`p`, `h1`–`h6`, `span`). ' +
          'Set `isHtml: true` to render raw HTML — use with trusted content only.',
      },
    },
  },
  argTypes: {
    as: {
      control: { type: "select" },
      options: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "span"],
    },
    text: { control: "text" },
    isHtml: { control: "boolean" },
  },
};

const Template = (args) => ({
  components: { DynamicText },
  setup() {
    return { args };
  },
  template: '<DynamicText v-bind="args" />',
});

export const Paragraph = Template.bind({});
Paragraph.args = {
  as: "p",
  text: "This is a paragraph of dynamic text.",
};

export const Heading = Template.bind({});
Heading.args = {
  as: "h2",
  text: "This is a Heading",
};

export const HtmlContent = Template.bind({});
HtmlContent.args = {
  as: "p",
  text: "Text with <strong>bold</strong> and <em>italic</em> content.",
  isHtml: true,
};
