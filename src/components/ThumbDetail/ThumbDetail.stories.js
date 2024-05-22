import ThumbDetail from "./ThumbDetail.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: 'Components/Card/ThumbDetail',
  decorators: [withDesign],
  component: ThumbDetail,
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    filename: { control: "text" },
    alt: { control: "text" }, 
    route: { control: "text" },
    link: { control: "text" },
    cta: { control: "text" },
  },
};

const Template = (args) => ({
  components: { ThumbDetail },
  setup() {
    return { args };
  },
  template: `
    <div>
      <ThumbDetail v-bind="args" />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  route: "/",
};