import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './label'
import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="checked" defaultChecked />
      <Label htmlFor="checked">Already checked</Label>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-unchecked" disabled />
        <Label htmlFor="disabled-unchecked" className="opacity-50">Disabled unchecked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked" className="opacity-50">Disabled checked</Label>
      </div>
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">Notifications</p>
      {['Email', 'Push', 'SMS'].map((item) => (
        <div key={item} className="flex items-center space-x-2">
          <Checkbox id={item.toLowerCase()} defaultChecked={item === 'Email'} />
          <Label htmlFor={item.toLowerCase()}>{item}</Label>
        </div>
      ))}
    </div>
  ),
}
