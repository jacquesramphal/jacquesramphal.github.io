import ShareWidget from "./ShareWidget.vue";
import SelectorCta from "../Button/SelectorCta.vue";

export default {
  title: "Components/Blog/ShareWidget",
  component: ShareWidget,
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
