import PresenterBar from '@/components/PresenterBar/PresenterBar.vue';

export default {
  title: 'Components/PresenterBar',
  component: PresenterBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Floating control bar for presenter mode on markdown doc pages. ' +
          'Activates via the "Present" button in the doc share area or by pressing `p`. ' +
          'Teleported to `<body>` so it sits above all page content. ' +
          'Navigate sections with ↑ ↓ buttons or arrow keys; exit with Escape or the Exit button.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    currentIndex: { control: { type: 'number', min: 0 } },
    total: { control: { type: 'number', min: 1 } },
  },
};

const Template = (args) => ({
  components: { PresenterBar },
  setup() { return { args }; },
  template: `
    <div style="position: relative; height: 120px; background: var(--background, #fafafa);">
      <presenter-bar v-bind="args" />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = { currentIndex: 0, total: 7 };
Default.storyName = 'Bar / Default (first section)';

export const MidSection = Template.bind({});
MidSection.args = { currentIndex: 3, total: 7 };
MidSection.storyName = 'Bar / Mid-section';

export const LastSection = Template.bind({});
LastSection.args = { currentIndex: 6, total: 7 };
LastSection.storyName = 'Bar / Last section (↓ disabled)';

// ── Interactive presenter mode context ────────────────────────────────────────

export const PresenterModeActive = () => ({
  components: { PresenterBar },
  data() {
    return { current: 0, sections: ['Introduction', 'The Problem', 'Approach', 'Outcome'] };
  },
  methods: {
    onNavigate(i) { this.current = i; },
  },
  template: `
    <div style="min-height: 100vh; background: var(--background, #fafafa); font-family: var(--fontFamily-primary, sans-serif);">
      <div style="max-width: 72rem; margin-inline: auto; padding: 4rem 2rem;">
        <div
          v-for="(title, i) in sections" :key="i"
          style="min-height: 100vh; padding-block: 8rem; border-bottom: 1px solid var(--border-color, #eee); transition: opacity 0.3s ease;"
          :style="{ opacity: i === current ? 1 : 0.25 }"
        >
          <h2 style="font-size: var(--font-700, 2rem); font-weight: 700; margin-bottom: 1.6rem;">{{ title }}</h2>
          <p style="font-size: var(--font-500, 1.2rem); opacity: 0.75; max-width: 60ch;">
            Section {{ i + 1 }} of {{ sections.length }}. In presenter mode each H2 section
            becomes a full-height slide. Text scales via <code>zoom: 1.2</code>.
          </p>
        </div>
      </div>
      <presenter-bar :current-index="current" :total="sections.length" @navigate="onNavigate" />
    </div>
  `,
});
PresenterModeActive.storyName = 'Presenter Mode / Active (interactive)';
PresenterModeActive.parameters = {
  docs: {
    description: {
      story: 'Click ↑ ↓ to navigate. Active section is full opacity; others are dimmed. In production, scrollIntoView handles the actual scroll.',
    },
  },
};
