import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
  render: (args) => (
    <div className="p-8">
      <Badge {...args} />
    </div>
  ),
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="p-8 flex flex-wrap gap-3 items-center">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

export const InContext: Story = {
  name: 'In Context',
  render: () => (
    <div className="p-8 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Status</span>
        <Badge variant="default">Active</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Label</span>
        <Badge variant="secondary">Beta</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Alert</span>
        <Badge variant="destructive">Error</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Tag</span>
        <Badge variant="outline">New</Badge>
      </div>
    </div>
  ),
}

export const MultipleBadges: Story = {
  name: 'Multiple Badges',
  render: () => (
    <div className="p-8 flex flex-wrap gap-2">
      {['Design', 'React', 'Tailwind', 'TypeScript', 'Storybook', 'shadcn/ui'].map((tag) => (
        <Badge key={tag} variant="outline">{tag}</Badge>
      ))}
    </div>
  ),
}
