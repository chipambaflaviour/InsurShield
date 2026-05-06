import React from 'react';
import { cn } from '../../utils/cn';

export const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        className={cn(
          "flex h-14 w-full appearance-none rounded-xl border border-outline-variant bg-white px-4 py-2 pr-10 text-[16px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
        <span className="material-symbols-outlined">expand_more</span>
      </div>
    </div>
  )
})
Select.displayName = "Select"
