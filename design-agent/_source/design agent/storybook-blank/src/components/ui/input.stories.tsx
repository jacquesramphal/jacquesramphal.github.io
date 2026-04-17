import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'
import { Label } from './label'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
  },
  render: (args) => (
    <div className="p-8 w-80">
      <Input {...args} />
    </div>
  ),
}

export const WithLabel: Story = {
  name: 'With Label',
  render: () => (
    <div className="p-8 w-80 flex flex-col gap-2">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
}

export const InputTypes: Story = {
  name: 'Input Types',
  render: () => (
    <div className="p-8 w-80 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="text-input">Text</Label>
        <Input id="text-input" type="text" placeholder="Plain text input" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email-input">Email</Label>
        <Input id="email-input" type="email" placeholder="you@example.com" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password-input">Password</Label>
        <Input id="password-input" type="password" placeholder="••••••••" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="search-input">Search</Label>
        <Input id="search-input" type="search" placeholder="Search..." />
      </div>
    </div>
  ),
}

export const DisabledState: Story = {
  name: 'Disabled',
  render: () => (
    <div className="p-8 w-80 flex flex-col gap-2">
      <Label htmlFor="disabled-input">Disabled input</Label>
      <Input id="disabled-input" type="text" placeholder="Cannot edit this" disabled />
    </div>
  ),
}
