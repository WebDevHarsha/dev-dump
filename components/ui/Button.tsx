import React from "react"
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react"

type BaseProps = {
  children?: ReactNode
  className?: string
  variant?: "default" | "outline"
  size?: "default" | "lg"
}

type Props = BaseProps & (ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined } | AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })

const Button = ({ children, className = "", variant = "default", size = "default", ...props }: Props) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors disabled:opacity-50"
  const variantStyles =
    variant === "outline"
      ? "bg-background hover:bg-accent hover:text-accent-foreground"
      : "bg-primary text-primary-foreground hover:bg-primary/90"
  const sizeStyles = size === "lg" ? "px-8 py-3 text-lg" : "px-4 py-2"

  const classNames = `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`

  // If href is present, render an anchor element so links work correctly inside linked cards.
  if ((props as any).href) {
    const { href, ...rest } = props as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
    return (
      <a className={classNames} href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button className={classNames} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}

export default Button
