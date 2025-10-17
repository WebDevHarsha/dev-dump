"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b-4 border-foreground bg-background sticky top-0 z-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-primary-foreground px-4 py-2 rotate-2 font-mono font-bold text-xl md:text-2xl border-4 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:rotate-3 group-hover:scale-105">
              DEV
            </div>
            <div className="bg-secondary text-secondary-foreground px-4 py-2 -rotate-2 font-mono font-bold text-xl md:text-2xl border-4 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:-rotate-3 group-hover:scale-105">
              DUMP
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#hackathons"
              className="font-mono font-semibold text-lg hover:text-primary transition-colors relative group"
            >
              Hackathons
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a
              href="/about"
              className="font-mono font-semibold text-lg hover:text-primary transition-colors relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a
              href="#contact"
              className="bg-primary text-primary-foreground px-6 py-2 font-mono font-bold border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Join Us
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 border-4 border-foreground bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-6 pb-4 flex flex-col gap-4 border-t-4 border-foreground pt-6">
            <a
              href="#hackathons"
              className="font-mono font-semibold text-lg px-4 py-3 border-4 border-foreground bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hackathons
            </a>
            <a
              href="#about"
              className="font-mono font-semibold text-lg px-4 py-3 border-4 border-foreground bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="bg-primary text-primary-foreground px-4 py-3 font-mono font-bold text-center border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join Us
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
