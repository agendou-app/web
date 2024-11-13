import type { Meta, StoryObj } from '@storybook/react'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast'

const customCodeExample = `
const { toast } = useToast()

toast({
  title: "Title",
  description: "Description",
  variant: "default"
})
`

const meta: Meta<typeof Toast> = {
  title: 'Components/ui/toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        code: customCodeExample,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
    },
  },
  args: {
    variant: 'default',
  },
  render: (args) => {
    return (
      <ToastProvider duration={86400}>
        <Toast variant={args.variant}>
          <div className="grid gap-1">
            <ToastTitle>Title</ToastTitle>
            <ToastDescription>Description</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport className="relative" />
      </ToastProvider>
    )
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
}
