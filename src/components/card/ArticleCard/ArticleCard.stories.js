import ArticleCard from "./ArticleCard.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Cards/ArticleCard",
  component: ArticleCard,
  tags: ['autodocs'],
  decorators: [withDesign],
  parameters: {
    docs: {
      description: {
        component:
          'A writing or work card with image, eyebrow, title, description, and a CTA link. ' +
          'Four display variants: `default` (image top), `cover` (image fills card), `borderless`, and `list` (horizontal).',
      },
    },
  },
  argTypes: {
    eyebrow: { control: 'text', description: 'Category label above the title' },
    title: { control: 'text' },
    description: { control: 'text' },
    tag: { control: 'text' },
    filename: { control: 'text', description: 'Image filename from assets/images/' },
    alt: { control: 'text' },
    route: { control: 'text' },
    label: { control: 'text', description: 'CTA button label' },
    cover: { control: 'boolean', description: 'Image fills the full card' },
    borderless: { control: 'boolean', description: 'Remove card border' },
    list: { control: 'boolean', description: 'Horizontal list layout' },
  },
};

const Template = (args) => ({
  components: { ArticleCard },
  setup() {
    return { args };
  },
  template: `
    <div style="max-width: 36rem;">
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
