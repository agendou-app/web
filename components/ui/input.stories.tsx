import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'Components/ui/input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      type: 'string',
    },
    disabled: {
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
  args: {
    placeholder: 'Placeholder',
    disabled: false,
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled',
    disabled: true,
  },
}
