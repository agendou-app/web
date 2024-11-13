import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './checkbox'
import { Label } from './label'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/ui/checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      type: 'boolean',
    },
  },
  args: {
    disabled: false,
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story, { args }) => (
      <div className="flex items-center space-x-2">
        <Story args={{ id: 'checkbox-test-2', ...args }} />
        <Label htmlFor="checkbox-test-2">Checkbox</Label>
      </div>
    ),
  ],
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  decorators: [
    (Story, { args }) => (
      <div className="flex items-center space-x-2">
        <Story args={{ id: 'checkbox-test-3', ...args }} />
        <Label htmlFor="checkbox-test-3">Checkbox</Label>
      </div>
    ),
  ],
}
