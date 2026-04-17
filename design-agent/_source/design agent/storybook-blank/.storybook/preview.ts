import type { Preview } from '@storybook/react'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    designToken: {
      defaultTab: 'Colors',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: { toc: true },
    options: {
      storySort: {
        order: ['Welcome', 'Foundations', ['Colors', 'Typography'], 'Components'],
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0a0a0f' },
      ],
    },
  },
}

export default preview
