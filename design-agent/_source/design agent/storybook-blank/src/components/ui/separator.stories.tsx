import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from './separator'

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Separator>

export const Default: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="p-8 w-64">
      <Separator {...args} />
    </div>
  ),
}

export const HorizontalBetweenText: Story = {
  name: 'Horizontal — Between Text',
  render: () => (
    <div className="p-8 w-80">
      <div>
        <h4 className="text-sm font-semibold">Section One</h4>
        <p className="text-sm text-muted-foreground mt-1">
          Content for the first section goes here.
        </p>
      </div>
      <Separator className="my-4" />
      <div>
        <h4 className="text-sm font-semibold">Section Two</h4>
        <p className="text-sm text-muted-foreground mt-1">
          Content for the second section goes here.
        </p>
      </div>
      <Separator className="my-4" />
      <div>
        <h4 className="text-sm font-semibold">Section Three</h4>
        <p className="text-sm text-muted-foreground mt-1">
          Content for the third section goes here.
        </p>
      </div>
    </div>
  ),
}

export const VerticalBetweenItems: Story = {
  name: 'Vertical — Between Items',
  render: () => (
    <div className="p-8">
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Blog</span>
        <Separator orientation="vertical" />
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  ),
}

export const InNavbar: Story = {
  name: 'In Navbar Context',
  render: () => (
    <div className="p-8 w-full">
      <div className="flex items-center justify-between py-3">
        <span className="font-semibold">My App</span>
        <div className="flex h-4 items-center gap-3 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Home</a>
          <Separator orientation="vertical" />
          <a href="#" className="hover:text-foreground transition-colors">About</a>
          <Separator orientation="vertical" />
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
      <Separator />
    </div>
  ),
}
