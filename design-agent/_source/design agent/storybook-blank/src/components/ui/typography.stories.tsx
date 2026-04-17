import type { Meta, StoryObj } from '@storybook/react'
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
} from './typography'

const meta: Meta = {
  title: 'Components/Typography',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const AllStyles: Story = {
  name: 'All Styles',
  render: () => (
    <div className="p-8 max-w-2xl space-y-6">
      <TypographyH1>The quick brown fox</TypographyH1>
      <TypographyH2>Heading level two</TypographyH2>
      <TypographyH3>Heading level three</TypographyH3>
      <TypographyH4>Heading level four</TypographyH4>
      <TypographyLead>
        A lead paragraph draws the reader in. It is slightly larger and muted to set the context.
      </TypographyLead>
      <TypographyP>
        Body text for long-form content. The line height is optimised for readability at paragraph
        scale. Use this for descriptions, articles, and most content areas.
      </TypographyP>
      <TypographyLarge>Large text for emphasis</TypographyLarge>
      <TypographySmall>Small text for captions or helper text</TypographySmall>
      <TypographyMuted>Muted text for secondary information or metadata</TypographyMuted>
    </div>
  ),
}

export const Headings: Story = {
  name: 'Headings',
  render: () => (
    <div className="p-8 max-w-2xl space-y-4">
      <TypographyH1>H1 — Page title</TypographyH1>
      <TypographyH2>H2 — Section heading</TypographyH2>
      <TypographyH3>H3 — Subsection heading</TypographyH3>
      <TypographyH4>H4 — Card or panel title</TypographyH4>
    </div>
  ),
}

export const BodyStyles: Story = {
  name: 'Body & Supporting Styles',
  render: () => (
    <div className="p-8 max-w-xl space-y-4">
      <TypographyLead>
        Lead — introductory sentence or subheadline placed below a page title.
      </TypographyLead>
      <TypographyP>
        Paragraph — the standard body text style. Used for the majority of content on a page.
        It includes comfortable line-height for reading longer passages of text.
      </TypographyP>
      <TypographyLarge>Large — for highlighted callouts or pull quotes</TypographyLarge>
      <TypographySmall>Small — labels, captions, helper text</TypographySmall>
      <TypographyMuted>Muted — timestamps, metadata, secondary info</TypographyMuted>
    </div>
  ),
}

export const ArticleExample: Story = {
  name: 'Article Example',
  render: () => (
    <div className="p-8 max-w-2xl">
      <TypographyH1>Design Systems at Scale</TypographyH1>
      <TypographyLead className="mt-4">
        How a well-structured token system and component library can accelerate product teams.
      </TypographyLead>
      <TypographyP>
        Building a design system is not just about creating reusable components — it is about
        establishing a shared language between designers and developers. When both teams work
        from the same source of truth, iteration cycles shorten dramatically.
      </TypographyP>
      <TypographyH2>Starting with tokens</TypographyH2>
      <TypographyP>
        Tokens are the smallest unit of a design system. A well-defined token set allows you to
        retheme an entire product by changing a handful of variables.
      </TypographyP>
      <TypographyH3>Color semantics</TypographyH3>
      <TypographyP>
        Rather than naming tokens after their visual value (e.g. <code>blue-500</code>), name
        them after their intent (e.g. <code>--primary</code>). This makes rethreading across
        themes straightforward.
      </TypographyP>
      <TypographyMuted className="mt-4">Last updated March 2026 · 4 min read</TypographyMuted>
    </div>
  ),
}
