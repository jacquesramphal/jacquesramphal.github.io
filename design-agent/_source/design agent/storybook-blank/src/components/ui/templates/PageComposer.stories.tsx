import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { componentRegistry, resolveComponent } from './_componentRegistry'

/**
 * PageComposer — storybook-blank stub
 *
 * This file demonstrates the PageComposer pattern in storybook-blank.
 * storybook-blank contains only shadcn/ui primitives — no section-level
 * CMS components yet. The pattern is identical to the main storybook and
 * storybook-tailwind implementations.
 *
 * To activate this pattern:
 * 1. Add section-level layout components to this app (Hero, Banner, ProductGrid, etc.)
 * 2. Register them in _componentRegistry.ts
 * 3. Define named story exports below with sections arrays
 *
 * See storybook/apps/storybook/stories/ui/4-templates/PageComposer.stories.tsx
 * for the full working reference implementation.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface SectionEntry {
  type: string
  props: Record<string, unknown>
}

// ─── Renderer (pattern stub) ──────────────────────────────────────────────────

const PageComposerRenderer = ({ sections }: { sections: SectionEntry[] }) => (
  <div className='min-h-screen'>
    {/* Frame: add Header/Nav component here once available */}
    <main className='mx-auto max-w-screen-xl px-4 py-8'>
      {sections.map((section, i) => {
        const Component = resolveComponent(section.type)
        const resolvedProps = componentRegistry[section.type]
          ? section.props
          : { id: String(i), contentType: section.type }
        return <Component key={i} {...resolvedProps} />
      })}
    </main>
    {/* Frame: add Footer component here once available */}
  </div>
)

// ─── Story meta ───────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/Page Composer',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        component: [
          '**Page Composer (stub)** — Pattern demonstration for storybook-blank.',
          '',
          'storybook-blank contains only shadcn/ui primitives, not section-level CMS components.',
          'Add section-level components to `_componentRegistry.ts` to activate full page composition.',
          '',
          'See the main storybook `4. Templates/Page Composer` for a complete working example.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    sections: {
      control: false,
      table: { category: '⚠ Proposed — Needs CMS Review' },
      description: 'PROPOSED: Ordered array of { type, props } objects defining the page body.',
    },
  },
}

export default meta
type Story = StoryObj<{ sections: SectionEntry[] }>

// ─── Demo: fallback behavior ──────────────────────────────────────────────────

/**
 * Demonstrates the unknown component fallback — how the renderer handles
 * section types not yet registered in _componentRegistry.ts.
 * All sections here are unregistered, showing the red fallback blocks.
 * Register components in _componentRegistry.ts to replace them with real content.
 */
export const FallbackDemo: Story = {
  name: 'Fallback Demo (Add Components to Activate)',
  render: ({ sections }) => <PageComposerRenderer sections={sections} />,
  args: {
    sections: [
      { type: 'HeroBanner', props: {} },
      { type: 'ProductGrid', props: {} },
      { type: 'CallToAction', props: {} },
    ],
  },
}
