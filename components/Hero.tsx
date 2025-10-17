import React from "react"
import { Search, Zap, Code, Trophy, Flame } from "lucide-react"
import Input from "./ui/Input"
import Button from "./ui/Button"

export default function Hero() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-6">
            <span className="text-4xl md:text-7xl font-black bg-primary text-primary-foreground px-4 py-2 rotate-2 border-4 border-foreground sticker">FIND</span>
            <span className="text-3xl md:text-6xl font-mono bg-secondary text-secondary-foreground px-3 py-1 -rotate-1 border-4 border-foreground sticker">YOUR</span>
            <span className="text-5xl md:text-8xl font-black bg-foreground text-background px-4 py-2 rotate-1 border-4 border-foreground sticker">HACK</span>
          </div>

          <p className="text-lg md:text-2xl font-mono max-w-2xl mx-auto leading-relaxed text-balance">
            Bringing  <span className="bg-secondary text-secondary-foreground px-2 py-1 rotate-1 inline-block border-2 border-foreground">hackathons</span> together so you never miss one. Discover events, dump code, and <span className="bg-primary text-primary-foreground px-2 py-1 -rotate-1 inline-block border-2 border-foreground">win big</span>.
          </p>

          

          <div className="flex items-center justify-center gap-4 md:gap-6 py-6">
            <div className="bg-primary text-primary-foreground p-3 rotate-6 border-3 border-foreground sticker"><Zap className="w-8 h-8" /></div>
            <div className="bg-secondary text-secondary-foreground p-3 -rotate-3 border-3 border-foreground sticker"><Code className="w-8 h-8" /></div>
            <div className="bg-foreground text-background p-3 rotate-2 border-3 border-foreground sticker"><Trophy className="w-8 h-8" /></div>
            <div className="bg-primary text-primary-foreground p-3 -rotate-6 border-3 border-foreground sticker"><Flame className="w-8 h-8" /></div>
          </div>
        </div>
      </div>
    </section>
  )
}
