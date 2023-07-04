import BlogCard from "../components/card/BlogCard.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Card/BlogCard",
  component: BlogCard,
  decorators: [withDesign],
  argTypes: {},
};

const Template = (args) => ({
  components: { BlogCard },
  setup() {
    return { args };
  },
  template: `
    <div>
      <BlogCard v-bind="args" />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: "Hello World",
  description:
    "This is a short description taken from the article. Maybe a little longer ...",
  route: "/example",
};
