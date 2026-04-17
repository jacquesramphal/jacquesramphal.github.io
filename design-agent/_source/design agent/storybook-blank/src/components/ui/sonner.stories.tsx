import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { toast } from 'sonner'
import { Button } from './button'
import { Toaster } from './sonner'

const meta: Meta<typeof Toaster> = {
  title: 'Components/Sonner',
  component: Toaster,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Toaster>

export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        variant="outline"
        onClick={() => toast('Event has been created', { description: 'Sunday, December 03, 2023 at 9:00 AM' })}
      >
        Show Toast
      </Button>
    </>
  ),
}

export const Variants: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => toast('Default toast message')}>
          Default
        </Button>
        <Button variant="outline" onClick={() => toast.success('Action completed successfully')}>
          Success
        </Button>
        <Button variant="outline" onClick={() => toast.error('Something went wrong')}>
          Error
        </Button>
        <Button variant="outline" onClick={() => toast.warning('Proceed with caution')}>
          Warning
        </Button>
        <Button variant="outline" onClick={() => toast.info('Here is some information')}>
          Info
        </Button>
      </div>
    </>
  ),
}

export const WithAction: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        onClick={() =>
          toast('File deleted', {
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo'),
            },
          })
        }
      >
        Delete File
      </Button>
    </>
  ),
}
