import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './progress'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
}
export default meta

type Story = StoryObj<typeof Progress>

export const Default: Story = {
  args: { value: 60 },
}

export const AllValues: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      {[0, 25, 50, 75, 100].map((value) => (
        <div key={value} className="space-y-1">
          <div className="text-sm text-muted-foreground">{value}%</div>
          <Progress value={value} />
        </div>
      ))}
    </div>
  ),
}

export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0)
    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 10))
      }, 800)
      return () => clearInterval(timer)
    }, [])
    return (
      <div className="w-[400px] space-y-2">
        <p className="text-sm text-muted-foreground">Progress: {progress}%</p>
        <Progress value={progress} />
      </div>
    )
  },
}
