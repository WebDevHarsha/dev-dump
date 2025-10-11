import React from "react"
import type { ButtonHTMLAttributes, ReactNode } from "react"

const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline"
  size?: "default" | "lg"
  children?: ReactNode
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors disabled:opacity-50"
  const variantStyles =
    variant === "outline"
      ? "bg-background hover:bg-accent hover:text-accent-foreground"
      : "bg-primary text-primary-foreground hover:bg-primary/90"
  const sizeStyles = size === "lg" ? "px-8 py-3 text-lg" : "px-4 py-2"

  return (
    <button className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
