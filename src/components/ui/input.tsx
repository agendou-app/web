import * as React from 'react'

import { cn } from '@/utils/merge'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftContent?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftContent, ...props }, ref) => {
    if (leftContent) {
      return (
        <div className="flex">
          <div className="flex items-center justify-center rounded-l border bg-accent px-2 text-sm text-muted-foreground">
            {leftContent}
          </div>
          <input
            type={type}
            className={cn(
              'flex h-9 w-full rounded-md rounded-l-none border border-input bg-transparent px-3 py-1 pl-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }