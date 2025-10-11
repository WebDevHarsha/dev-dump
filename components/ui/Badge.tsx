import React from "react"
import type { ReactNode } from "react"

const Badge = ({
  children,
  className = "",
  variant = "default",
}: {
  children?: ReactNode
  className?: string
  variant?: "default" | "outline"
}) => {
  const variantStyles =
    variant === "outline"
      ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      : "bg-primary text-primary-foreground"

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variantStyles} ${className}`}
    >
      {children}
    </div>
  )
}

export default Badge
