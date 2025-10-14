import React from "react"
import Card from "./ui/Card"
import Badge from "./ui/Badge"
import Button from "./ui/Button"
import { Calendar, MapPin, Users, Trophy } from "lucide-react"
import { getHackathonsFromDb } from '../lib/mongodb'

type Theme = {
  id: number
  name: string
}

type Hackathon = {
  id: number
  title: string
  url: string
  thumbnail_url: string
  displayed_location: {
    icon: string
    location: string
  }
  open_state: string
  time_left_to_submission: string
  submission_period_dates: string
  themes: Theme[]
  prize_amount: string
  prizes_counts: {
    cash: number
    other: number
  }
  registrations_count: number
  organization_name: string
  featured: boolean
  winners_announced: boolean
  submission_gallery_url: string
  start_a_submission_url: string
}



async function fetchHackathons(): Promise<Hackathon[]> {
  try {
    const docs = await getHackathonsFromDb()
    // Normalize documents stored in MongoDB to our Hackathon shape
    const normalized: Hackathon[] = docs.map((rec: any, idx: number) => {
      const id = rec.id ?? rec._id ?? idx
      const title = rec.title ?? rec.name ?? 'Untitled'
      const url = rec.url ?? rec.external_url ?? '#'
      const thumbnail_url = rec.thumbnail_url ?? rec.logo ?? ''
      const displayed_location = rec.displayed_location ?? (rec.location ? { icon: '', location: rec.location } : { icon: '', location: 'Online' })
      const open_state = rec.open_state ?? (rec.isOpen ? 'open' : (rec.open ? 'open' : 'closed'))
      const time_left_to_submission = rec.time_left_to_submission ?? rec.time_left ?? ''
      const submission_period_dates = rec.submission_period_dates ?? rec.dates ?? ''
      const themes = Array.isArray(rec.themes) ? rec.themes.map((t: any, i: number) => ({ id: t?.id ?? i, name: t?.name ?? String(t) })) : []
      const prize_amount = rec.prize_amount ?? rec.prizes ?? ''
      const prizes_counts = rec.prizes_counts ?? { cash: 0, other: 0 }
      const registrations_count = Number(rec.registrations_count ?? rec.participants_count ?? rec.num_registrations ?? 0)
      const organization_name = rec.organization_name ?? rec.organization ?? rec.host ?? ''
      const featured = !!rec.featured
      const winners_announced = !!rec.winners_announced
      const submission_gallery_url = rec.submission_gallery_url ?? ''
      const start_a_submission_url = rec.start_a_submission_url ?? rec.registration_url ?? rec.external_apply_url ?? rec.url ?? '#'

      return {
        id,
        title,
        url,
        thumbnail_url,
        displayed_location,
        open_state,
        time_left_to_submission,
        submission_period_dates,
        themes,
        prize_amount,
        prizes_counts,
        registrations_count,
        organization_name,
        featured,
        winners_announced,
        submission_gallery_url,
        start_a_submission_url,
      } as Hackathon
    })

    return normalized
  } catch (error) {
    console.error('Error fetching hackathons from MongoDB:', error)
    return []
  }
}

// No client-side fallback per user request

function stripHtmlTags(str: string): string {
  return str.replace(/<[^>]*>/g, '')
}

export default async function HackathonsList() {
  const hackathons = await fetchHackathons()
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
            {hackathons.map((hack, i) => {
              const prizeText = stripHtmlTags(hack.prize_amount)
              const thumbnailUrl = hack.thumbnail_url
                ? (typeof hack.thumbnail_url === 'string' && hack.thumbnail_url.startsWith('//') ? `https:${hack.thumbnail_url}` : hack.thumbnail_url)
                : null
              const isOpen = hack.open_state === "open"
              
              return (
                <Card key={hack.id} className={`p-6 border-4 border-foreground ${i % 2 === 0 ? "rotate-1" : "-rotate-1"} sticker hover:scale-105 transition-transform cursor-pointer bg-card`}>
                  <div className="space-y-4">
                    {/* Main clickable content (links to hack.url) */}
                    <a href={hack.url} target="_blank" rel="noopener noreferrer" className="block">
                      {/* Thumbnail */}
                      {thumbnailUrl && (
                        <div className="relative -mx-6 -mt-6 mb-4 h-32 overflow-hidden border-b-4 border-foreground">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={thumbnailUrl}
                            alt={hack.title}
                            className="w-full h-full object-cover"
                          />
                          {hack.featured && (
                            <Badge className="absolute top-2 right-2 bg-yellow-500 text-black border-2 border-foreground font-mono font-bold rotate-3">
                              FEATURED
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-black mb-1 font-mono">{hack.title}</h3>
                          <p className="text-muted-foreground text-sm">by {hack.organization_name}</p>
                        </div>
                        <Badge className={`${isOpen ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"} border-2 border-foreground font-mono font-bold rotate-3 shrink-0`}>
                          {isOpen ? "OPEN" : "CLOSED"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="font-mono text-xs">{hack.submission_period_dates}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-secondary" />
                          <span className="font-mono text-xs">{hack.displayed_location.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="font-mono">{hack.registrations_count.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-secondary" />
                          <span className="font-mono font-bold">{prizeText}</span>
                        </div>
                      </div>

                      {/* Time Left */}
                      <div className="text-sm font-bold text-primary">
                        ⏰ {hack.time_left_to_submission}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {hack.themes.map((theme) => (
                          <Badge key={theme.id} variant="outline" className="border-2 border-foreground font-mono text-xs rotate-1">
                            {theme.name}
                          </Badge>
                        ))}
                      </div>
                    </a>

                    {/* Action buttons (as anchors) */}
                    <div>
                      <a
                        href={hack.start_a_submission_url || hack.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-center w-full border-2 border-foreground font-mono font-bold py-2 px-4"
                      >
                        {isOpen ? "REGISTER NOW →" : "LEARN MORE →"}
                      </a>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="bg-background border-4 border-foreground font-mono font-bold text-lg px-8 py-6 rotate-1 sticker">LOAD MORE CHAOS →</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
