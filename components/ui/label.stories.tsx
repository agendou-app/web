import type { Meta, StoryObj } from '@storybook/react'

import { Label } from './label'
import { Input } from './input'
import { Checkbox } from './checkbox'

const meta: Meta<typeof Label> = {
  title: 'Components/ui/label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Label',
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const LabelWithInput: Story = {
  decorators: [
    (Story, { args }) => (
      <div>
        <Story args={{ htmlFor: 'input-test', ...args }} />
        <Input id="input-test" />
      </div>
    ),
  ],
}

export const LabelWithCheckBox: Story = {
  decorators: [
    (Story, { args }) => (
      <div className="flex items-center space-x-2">
        <Checkbox id="checkbox-test" />
        <Story args={{ htmlFor: 'checkbox-test', ...args }} />
      </div>
    ),
  ],
}
