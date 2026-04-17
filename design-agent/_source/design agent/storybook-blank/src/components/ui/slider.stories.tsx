import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './slider'

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
}
export default meta

type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: () => (
    <div className="w-[300px] p-4">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  ),
}

export const WithRange: Story = {
  render: () => (
    <div className="w-[300px] p-4">
      <Slider defaultValue={[25, 75]} max={100} step={1} />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[300px] p-4">
      <Slider defaultValue={[60]} max={100} step={1} disabled />
    </div>
  ),
}

export const Steps: Story = {
  render: () => (
    <div className="w-[300px] p-4 space-y-4">
      <p className="text-sm text-muted-foreground">Step of 10</p>
      <Slider defaultValue={[40]} max={100} step={10} />
    </div>
  ),
}
