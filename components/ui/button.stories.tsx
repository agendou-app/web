import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './button'

import { action } from '@storybook/addon-actions'

import { ClockIcon } from '@radix-ui/react-icons'

const meta: Meta<typeof Button> = {
  title: 'Components/ui/button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    disabled: {
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
    children: {
      name: 'text',
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    onClick: action('click'),
    children: 'Confirm',
  },
  render: (args) => (
    <Button {...args}>
      {args.size === 'icon' ? <ClockIcon /> : args.children}
    </Button>
  ),
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
  },
}
