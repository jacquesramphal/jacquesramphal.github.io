import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <div className="p-8 w-96">
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>
            A short description of what this card contains or its purpose.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This is the card body content. Place any relevant information or UI here.
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Confirm</Button>
        </CardFooter>
      </Card>
    </div>
  ),
}

export const SimpleContent: Story = {
  name: 'Simple Content',
  render: () => (
    <div className="p-8 w-80">
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm">
            A minimal card with only body content — no header or footer required.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
}

export const FormCard: Story = {
  name: 'Form Card',
  render: () => (
    <div className="p-8 w-96">
      <Card>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="card-email">Email</Label>
            <Input id="card-email" type="email" placeholder="you@example.com" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="card-password">Password</Label>
            <Input id="card-password" type="password" placeholder="••••••••" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Sign in</Button>
        </CardFooter>
      </Card>
    </div>
  ),
}

export const MultipleCards: Story = {
  name: 'Multiple Cards',
  render: () => (
    <div className="p-8 grid grid-cols-3 gap-4">
      {['Starter', 'Pro', 'Enterprise'].map((plan) => (
        <Card key={plan}>
          <CardHeader>
            <CardTitle className="text-lg">{plan}</CardTitle>
            <CardDescription>Perfect for {plan.toLowerCase()} teams</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {plan === 'Starter' ? '$0' : plan === 'Pro' ? '$49' : 'Custom'}
              {plan !== 'Enterprise' && <span className="text-sm font-normal text-muted-foreground">/mo</span>}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant={plan === 'Pro' ? 'default' : 'outline'} className="w-full" size="sm">
              Get started
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  ),
}
