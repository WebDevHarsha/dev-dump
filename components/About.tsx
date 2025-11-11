import React from "react"
import Card from "./ui/Card"
import { Zap, Trophy, Code, Flame } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-12 text-center">
            <span className="bg-primary text-primary-foreground px-4 py-2 rotate-2 inline-block border-4 border-foreground sticker mr-2">WHY</span>
            <span className="bg-secondary text-secondary-foreground px-4 py-2 -rotate-1 inline-block border-4 border-foreground sticker">DEVDUMP?</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-4 border-foreground rotate-1 bg-card sticker">
              <div className="bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center border-2 border-foreground mb-4 rotate-3"><Zap className="w-6 h-6" /></div>
              <h3 className="text-2xl font-black mb-3 font-mono">ONE STOP SHOP</h3>
              <p className="text-muted-foreground leading-relaxed">Stop juggling multiple websites. All major hackathons from Devfolio, Devpost, MLH & more - all in one place.</p>
            </Card>

            <Card className="p-6 border-4 border-foreground -rotate-1 bg-card sticker">
              <div className="bg-secondary text-secondary-foreground w-12 h-12 flex items-center justify-center border-2 border-foreground mb-4 -rotate-3"><Trophy className="w-6 h-6" /></div>
              <h3 className="text-2xl font-black mb-3 font-mono">ALWAYS UPDATED</h3>
              <p className="text-muted-foreground leading-relaxed">Fresh hackathon listings, daily updates. Never miss a deadline or opportunity to build something awesome.</p>
            </Card>

            <Card className="p-6 border-4 border-foreground rotate-2 bg-card sticker">
              <div className="bg-foreground text-background w-12 h-12 flex items-center justify-center border-2 border-foreground mb-4 rotate-6"><Code className="w-6 h-6" /></div>
              <h3 className="text-2xl font-black mb-3 font-mono">FREE & OPEN API</h3>
              <p className="text-muted-foreground leading-relaxed">Developers first. Access our free API to integrate hackathon data into your own projects and tools.</p>
            </Card>

            <Card className="p-6 border-4 border-foreground -rotate-2 bg-card sticker">
              <div className="bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center border-2 border-foreground mb-4 -rotate-6"><Flame className="w-6 h-6" /></div>
              <h3 className="text-2xl font-black mb-3 font-mono">BUILT BY HACKERS</h3>
              <p className="text-muted-foreground leading-relaxed">Made with chaos & caffeine. Because we got tired of tab overload too.</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
