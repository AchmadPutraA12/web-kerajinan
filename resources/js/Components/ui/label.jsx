"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        wajib: "after:content-['*'] after:ml-1 after:text-red-400",
        optional:
          "after:content-['(optional)'] after:ml-1 after:text-gray-400",
        none: "",
      },
    },
    defaultVariants: {
      variant: "none",
    },
  }
)

const Label = React.forwardRef(({ variant, className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ variant }), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
