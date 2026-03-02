import SelectorCta from "./SelectorCta.vue";

export default {
  title: "Components/Primitives/SelectorCta",
  component: SelectorCta,
  argTypes: {
    align: {
      control: { type: "select" },
      options: ["start", "end"],
    },
    placement: {
      control: { type: "select" },
      options: ["bottom-start", "bottom-end", "top-start", "top-end"],
    },
    disabled: { control: "boolean" },
    modelValue: { control: "boolean" },
    label: { control: "text" },
    icon: { control: "text" },
  },
};

const Template = (args) => ({
  components: { SelectorCta },
  setup() {
    return { args };
  },
  template: `
    <div style="padding: 24px;">
      <SelectorCta v-bind="args">
        <template #menu>
          <button class="selector-item" role="menuitem">Copy page</button>
          <button class="selector-item" role="menuitem">Copy page as Markdown for LLMs</button>
          <div class="selector-divider" role="separator"></div>
          <button class="selector-item is-muted" role="menuitem">Open in Claude</button>
          <button class="selector-item is-muted" role="menuitem">Open in ChatGPT</button>
        </template>
      </SelectorCta>
      <style>
        .selector-item {
          width: 100%;
          padding: 10px 12px;
          border: 0;
          border-radius: 10px;
          background: transparent;
          color: var(--foreground);
          cursor: pointer;
          text-align: left;
          font-size: var(--font-400);
          line-height: 1.2;
        }
        .selector-item:hover {
          background: var(--background-darker);
        }
        .selector-item.is-muted {
          opacity: 0.85;
        }
        .selector-divider {
          height: 1px;
          background: color-mix(in srgb, var(--foreground) 12%, transparent);
          margin: 6px 6px;
          border-radius: 999px;
        }
      </style>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  label: "Copy page",
  icon: "icon/eclipse-svgrepo-com.svg",
  modelValue: false,
  align: "start",
  placement: undefined,
  disabled: false,
};

export const Open = Template.bind({});
Open.args = {
  ...Default.args,
  modelValue: true,
};

