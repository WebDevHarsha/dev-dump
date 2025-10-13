"use client"
import React, { useState } from 'react'
import Card from './ui/Card'
import Badge from './ui/Badge'
import Button from './ui/Button'
import { Calendar, MapPin, Users, Trophy } from 'lucide-react'

type Theme = { id: number | string; name: string }

type Hackathon = {
  id: number | string
  title: string
  url: string
  thumbnail_url?: string
  displayed_location?: { icon?: string; location?: string }
  open_state?: string
  time_left_to_submission?: string
  submission_period_dates?: string
  themes?: Theme[]
  prize_amount?: string
  prizes_counts?: { cash: number; other: number }
  registrations_count?: number
  organization_name?: string
  featured?: boolean
  winners_announced?: boolean
  submission_gallery_url?: string
  start_a_submission_url?: string
}

export default function HackathonsListClient({ hackathons }: { hackathons: Hackathon[] }) {
  const [visible, setVisible] = useState(6)
  const visibleItems = hackathons.slice(0, visible)

  function stripHtmlTags(str: string | undefined) {
    return (str || '').replace(/<[^>]*>/g, '')
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {visibleItems.map((hack, i) => {
          const prizeText = stripHtmlTags(hack.prize_amount)
          const thumbnailUrl = hack.thumbnail_url?.startsWith('//') ? `https:${hack.thumbnail_url}` : hack.thumbnail_url
          const isOpen = hack.open_state === 'open'

          return (
            <Card key={String(hack.id) + '-' + i} className={`p-6 border-4 border-foreground ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'} sticker hover:scale-105 transition-transform cursor-pointer bg-card`}>
              <div className="space-y-4">
                <a href={hack.url} target="_blank" rel="noopener noreferrer" className="block">
                  {thumbnailUrl && (
                    <div className="relative -mx-6 -mt-6 mb-4 h-32 overflow-hidden border-b-4 border-foreground">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={thumbnailUrl} alt={hack.title} className="w-full h-full object-cover" />
                      {hack.featured && (
                        <Badge className="absolute top-2 right-2 bg-yellow-500 text-black border-2 border-foreground font-mono font-bold rotate-3">FEATURED</Badge>
                      )}
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black mb-1 font-mono">{hack.title}</h3>
                      <p className="text-muted-foreground text-sm">by {hack.organization_name}</p>
                    </div>
                    <Badge className={`${isOpen ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'} border-2 border-foreground font-mono font-bold rotate-3 shrink-0`}>{isOpen ? 'OPEN' : 'CLOSED'}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-mono text-xs">{hack.submission_period_dates}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-secondary" />
                      <span className="font-mono text-xs">{hack.displayed_location?.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="font-mono">{(hack.registrations_count || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-secondary" />
                      <span className="font-mono font-bold">{prizeText}</span>
                    </div>
                  </div>

                  <div className="text-sm font-bold text-primary">⏰ {hack.time_left_to_submission}</div>

                  <div className="flex flex-wrap gap-2">
                    {hack.themes?.map((theme) => (
                      <Badge key={theme.id} variant="outline" className="border-2 border-foreground font-mono text-xs rotate-1">{theme.name}</Badge>
                    ))}
                  </div>
                </a>

                <div>
                  <a href={hack.start_a_submission_url || hack.url} target="_blank" rel="noopener noreferrer" className="w-full border-2 border-foreground font-mono font-bold block text-center">{isOpen ? 'REGISTER NOW →' : 'LEARN MORE →'}</a>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="text-center mt-12">
        {visible < hackathons.length ? (
          <Button size="lg" variant="outline" className="bg-background border-4 border-foreground font-mono font-bold text-lg px-8 py-6 rotate-1 sticker" onClick={() => setVisible((v) => v + 6)}>LOAD MORE CHAOS →</Button>
        ) : (
          <div className="text-sm text-muted-foreground">No more hackathons</div>
        )}
      </div>
    </>
  )
}
