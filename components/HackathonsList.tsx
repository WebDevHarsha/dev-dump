import React from "react"
import Card from "./ui/Card"
import Badge from "./ui/Badge"
import Button from "./ui/Button"
import { Calendar, MapPin, Users, Trophy } from "lucide-react"

const hackathons = [
  { id: 1, name: "CodeChaos 2025", tagline: "Break things, win prizes", date: "Mar 15-17, 2025", location: "San Francisco, CA", mode: "In-Person", participants: "500+", prize: "$50K", status: "Open", tags: ["Web3", "AI", "Hardware"] },
  { id: 2, name: "HackTheNight", tagline: "Code till sunrise", date: "Apr 2-3, 2025", location: "Online", mode: "Virtual", participants: "1000+", prize: "$30K", status: "Open", tags: ["Mobile", "Gaming", "Social"] },
  { id: 3, name: "BuildFast Jam", tagline: "Ship or die trying", date: "Apr 20-22, 2025", location: "New York, NY", mode: "Hybrid", participants: "300+", prize: "$25K", status: "Open", tags: ["Fintech", "SaaS", "API"] },
  { id: 4, name: "Midnight Hackers", tagline: "No sleep, just code", date: "May 5-7, 2025", location: "Austin, TX", mode: "In-Person", participants: "400+", prize: "$40K", status: "Soon", tags: ["IoT", "Climate", "Health"] },
  { id: 5, name: "DevRage 2025", tagline: "Rage code your way to victory", date: "May 18-19, 2025", location: "Online", mode: "Virtual", participants: "800+", prize: "$20K", status: "Soon", tags: ["Open Source", "DevTools", "Security"] },
  { id: 6, name: "SpeedRun Hack", tagline: "24 hours of pure chaos", date: "Jun 1-2, 2025", location: "Seattle, WA", mode: "In-Person", participants: "250+", prize: "$35K", status: "Soon", tags: ["AI/ML", "Data", "Cloud"] },
]

export default function HackathonsList() {
  return (
    <section id="hackathons" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
            <h2 className="text-3xl md:text-5xl font-black">
              <span className="bg-primary text-primary-foreground px-4 py-2 rotate-1 inline-block border-4 border-foreground sticker mr-2">UPCOMING</span>
              <span className="bg-secondary text-secondary-foreground px-4 py-2 -rotate-1 inline-block border-4 border-foreground sticker">HACKS</span>
            </h2>

            <div className="flex gap-2 flex-wrap">
              <Badge className="bg-foreground text-background border-2 border-foreground font-mono px-4 py-2 rotate-1">All</Badge>
              <Badge variant="outline" className="border-2 border-foreground font-mono px-4 py-2 -rotate-1 hover:bg-primary hover:text-primary-foreground">In-Person</Badge>
              <Badge variant="outline" className="border-2 border-foreground font-mono px-4 py-2 rotate-1 hover:bg-secondary hover:text-secondary-foreground">Virtual</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {hackathons.map((hack, i) => (
              <Card key={hack.id} className={`p-6 border-4 border-foreground ${i % 2 === 0 ? "rotate-1" : "-rotate-1"} sticker hover:scale-105 transition-transform cursor-pointer bg-card`}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black mb-1 font-mono">{hack.name}</h3>
                      <p className="text-muted-foreground text-sm">{hack.tagline}</p>
                    </div>
                    <Badge className={`${hack.status === "Open" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"} border-2 border-foreground font-mono font-bold rotate-3 shrink-0`}>{hack.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /><span className="font-mono">{hack.date}</span></div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-secondary" /><span className="font-mono">{hack.location}</span></div>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /><span className="font-mono">{hack.participants}</span></div>
                    <div className="flex items-center gap-2"><Trophy className="w-4 h-4 text-secondary" /><span className="font-mono font-bold">{hack.prize}</span></div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {hack.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="border-2 border-foreground font-mono text-xs rotate-1">{tag}</Badge>
                    ))}
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground font-mono font-bold">{hack.status === "Open" ? "REGISTER NOW →" : "LEARN MORE →"}</Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="bg-background border-4 border-foreground font-mono font-bold text-lg px-8 py-6 rotate-1 sticker">LOAD MORE CHAOS →</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
