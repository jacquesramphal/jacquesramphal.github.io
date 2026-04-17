import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from './calendar'

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    )
  },
}

export const RangeSelection: Story = {
  render: () => {
    const [range, setRange] = React.useState<{ from: Date; to?: Date } | undefined>()
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange as any}
        className="rounded-md border"
        numberOfMonths={2}
      />
    )
  },
}

export const WithDisabledDays: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>()
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={{ before: new Date() }}
        className="rounded-md border"
      />
    )
  },
}
