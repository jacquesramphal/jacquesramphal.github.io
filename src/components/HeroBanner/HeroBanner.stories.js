import HeroBanner from "./HeroBanner.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/HeroBanner",
  component: HeroBanner,
  decorators: [withDesign],
  argTypes: {
    contentful: {
      type: "Array",
      description: "Array of content for the HeroBanner",
      control: {
        type: "object",
      },
    },
    eyebrow: {
      type: "string",
      description: "Eyebrow text for the HeroBanner",
      control: {
        type: "text",
      },
    },
    title: {
      type: "string",
      description: "Title text for the HeroBanner",
      control: {
        type: "text",
      },
    },
    tag: {
      type: "string",
      description: "Tag text for the HeroBanner",
      control: {
        type: "text",
      },
    },
    subtitle: {
      type: "string",
      description: "Subtitle text for the HeroBanner",
      control: {
        type: "text",
      },
    },
    route: {
      type: "string",
      description: "Route for the primary CTA button",
      control: {
        type: "text",
      },
    },
    label: {
      type: "string",
      description: "Label text for the primary CTA button",
      control: {
        type: "text",
      },
    },
    routetwo: {
      type: "string",
      description: "Route for the secondary CTA button",
      control: {
        type: "text",
      },
    },
    labeltwo: {
      type: "string",
      description: "Label text for the secondary CTA button",
      control: {
        type: "text",
      },
    },
    filename: {
      type: "string",
      description: "Filename of the HeroBanner image",
      control: {
        type: "text",
      },
    },
    background: {
      type: "boolean",
      description: "Specify if HeroBanner has a background image",
      control: {
        type: "boolean",
      },
    },
    center: {
      type: "boolean",
      description: "Specify if HeroBanner content is centered",
      control: {
        type: "boolean",
      },
    },
    overlap: {
      type: "boolean",
      description: "Specify if HeroBanner overlaps the content below",
      control: {
        type: "boolean",
      },
    },
    fullvh: {
      type: "boolean",
      description: "Specify if HeroBanner takes full viewport block-size",
      control: {
        type: "boolean",
      },
    },
  },
};

const Template = (args) => ({
  components: { HeroBanner },
  setup() {
    return { args };
  },
  template: '<HeroBanner v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  label: "Primary CTA",
  labeltwo: "Secondary CTA",
  route: "work",
  title: "Default",
  tag: "Tag1 typography",
  routetwo: "/example-secondary-route",
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};
export const Center = Template.bind({});
Center.args = {
  eyebrow: "Example Eyebrow",
  title: "Centered",
  tag: "Tag1 typography",
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  route: "example-route",
  label: "Primary CTA",
  routetwo: "/example-secondary-route",
  labeltwo: "Secondary CTA",
  background: false,
  center: true,
  overlap: false,
  fullvh: false,
};

export const Background = Template.bind({});
Background.args = {
  contentful: [
    // Add content here
  ],
  eyebrow: "Example Eyebrow",
  title: "Background",
  tag: "Tag1 typography",
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  route: "example-route",
  label: "Primary CTA",
  routetwo: "/example-secondary-route",
  labeltwo: "Secondary CTA",
  filename: "jacques.jpg",
  background: true,
  center: false,
  overlap: false,
  fullvh: false,
};
export const Overlap = Template.bind({});
Overlap.args = {
  contentful: [
    // Add content here
  ],
  filename: "jacques.jpg",
  eyebrow: "Example Eyebrow",
  title: "Overlapped",
  background: true,
  center: false,
  overlap: true,
  fullvh: false,
};
