import React from "react"
import type { ReactNode } from "react"

const Card = ({ children, className = "" }: { children?: ReactNode; className?: string }) => {
  return <div className={`rounded-lg bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>
}

export default Card
