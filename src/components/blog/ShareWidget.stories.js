import ShareWidget from "./ShareWidget.vue";
import SelectorCta from "../Button/SelectorCta.vue";

export default {
  title: "Components/Primitives/SelectorCta/ShareWidget",
  component: ShareWidget,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A share button that opens a dropdown with copy/share options. ' +
          'Pass `title` and `url` to pre-populate the share target. ' +
          'Built on top of SelectorCta — see that story for slot/menu documentation.',
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    title: { control: "text" },
    url: { control: "text" },
  },
};

const Template = (args) => ({
  components: { ShareWidget, SelectorCta },
  setup() {
    return { args };
  },
  template: '<div style="padding: 24px; display: flex; justify-content: flex-end;"><ShareWidget v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {
  label: "Share",
  title: "Article Title",
  url: "https://jacquesramphal.github.io",
};
