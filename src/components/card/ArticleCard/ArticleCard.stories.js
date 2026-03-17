import ArticleCard from "./ArticleCard.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Card/ArticleCard",
  component: ArticleCard,
  decorators: [withDesign],
  argTypes: {},
};

const Template = (args) => ({
  components: { ArticleCard },
  setup() {
    return { args };
  },
  template: `
    <div>
      <ArticleCard v-bind="args" />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  alt: "Image description",
  eyebrow: "Eyebrow",
  title: "Hello World",
  description:
    "This is a short description taken from the article. Maybe a little longer ...",
  tag: "Tag",
  route: "/example",
  label: "Read More",
  filename: "jacques.jpg",
};

export const Cover = Template.bind({});
Cover.args = {
  alt: "Image description",
  eyebrow: "Eyebrow",
  title: "Hello World",
  description:
    "This is a short description taken from the article. Maybe a little longer ...",
  tag: "Tag",
  route: "/example",
  label: "Read More",
  filename: "jacques.jpg",
  cover: true,
};

export const Borderless = Template.bind({});
Borderless.args = {
  alt: "Image description",
  eyebrow: "Eyebrow",
  title: "Hello World",
  description:
    "This is a short description taken from the article. Maybe a little longer ...",
  tag: "Tag",
  route: "/example",
  label: "Read More",
  filename: "jacques.jpg",
  borderless: true,
};

export const List = Template.bind({});
List.args = {
  alt: "Image description",
  eyebrow: "Eyebrow",
  title: "Hello World",
  description:
    "This is a short description taken from the article. Maybe a little longer ...",
  tag: "Tag",
  route: "/example",
  label: "Read More",
  filename: "jacques.jpg",
  list: true,
};
