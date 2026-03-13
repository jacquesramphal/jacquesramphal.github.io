import ThumbDetail from "./ThumbDetail.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: 'Components/Cards/ThumbDetail',
  component: ThumbDetail,
  tags: ['autodocs'],
  decorators: [withDesign],
  parameters: {
    docs: {
      description: {
        component:
          'A thumbnail card with an image, title, short description, and an optional CTA link. ' +
          'Used in work and project grids. Pass `route` for internal navigation or `link` for external URLs.',
      },
    },
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    filename: { control: "text", description: "Image filename from assets/images/" },
    alt: { control: "text" },
    route: { control: "text", description: "Internal route" },
    link: { control: "text", description: "External URL" },
    cta: { control: "text", description: "CTA button label" },
  },
};

const Template = (args) => ({
  components: { ThumbDetail },
  setup() {
    return { args };
  },
  template: `
    <div style="width: 100%;">
      <ThumbDetail v-bind="args" />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: "Design Systems at Scale",
  description: "A token-based system built across four brands with a shared component foundation.",
  filename: "templates/template-desktop-device.svg",
  alt: "Project thumbnail",
  cta: "View Project",
  route: "/",
};

export const External = Template.bind({});
External.args = {
  ...Default.args,
  title: "External Link Example",
  cta: "Visit Site",
  route: undefined,
  link: "https://example.com",
};
External.storyName = 'External Link';
