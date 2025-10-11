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
            The most <span className="bg-secondary text-secondary-foreground px-2 py-1 rotate-1 inline-block border-2 border-foreground">unhinged</span> hackathon platform. Discover events, dump code, and <span className="bg-primary text-primary-foreground px-2 py-1 -rotate-1 inline-block border-2 border-foreground">win big</span>.
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input placeholder="Search hackathons..." className="pl-10 h-14 border-4 border-foreground font-mono text-lg" />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground border-4 border-foreground font-mono font-black text-lg px-8 h-14 rotate-1 sticker">SEARCH</Button>
            </div>
          </div>

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
