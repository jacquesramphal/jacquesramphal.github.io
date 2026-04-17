import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from './separator'
import { ScrollArea } from './scroll-area'

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.${a.length - i}`)

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ScrollArea>

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const HorizontalScroll: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <figure key={index} className="shrink-0">
            <div className="overflow-hidden rounded-md bg-muted h-20 w-20 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">{index + 1}</span>
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Item {index + 1}
            </figcaption>
          </figure>
        ))}
      </div>
    </ScrollArea>
  ),
}
