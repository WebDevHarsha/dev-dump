import React from "react"
import Button from "./ui/Button"

export default function Header() {
  return (
    <header className=" border-b-4 border-foreground bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground px-3 py-1 rotate-2 font-mono font-bold text-xl sticker border-2 border-foreground">DEV</div>
          <div className="bg-secondary text-secondary-foreground px-3 py-1 -rotate-2 font-mono font-bold text-xl sticker border-2 border-foreground">DUMP</div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#hackathons" className="font-mono hover:underline decoration-4 decoration-primary">Hackathons</a>
          <a href="#about" className="font-mono hover:underline decoration-4 decoration-primary">About</a>
        </nav>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground font-mono font-bold rotate-1 sticker">Sign In</Button>
      </div>
    </header>
  )
}
