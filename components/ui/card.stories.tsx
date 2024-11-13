import type { Meta, StoryObj } from '@storybook/react'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card'
import { Input } from './input'
import { Label } from './label'
import { Button } from './button'

const meta: Meta<typeof Card> = {
  title: 'Components/ui/card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      return (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Create schedule</CardTitle>
              <CardDescription>Create a new schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Label>Date</Label>
              <Input type="date" />
            </CardContent>
            <CardFooter className="gap-4">
              <Button variant="ghost">Cancel</Button>
              <Button>Create</Button>
            </CardFooter>
          </Card>
          <div className="hidden">
            <Story />
          </div>
        </>
      )
    },
  ],
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>Content</CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  ),
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
