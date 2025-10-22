"use client"
import React, { useState } from 'react'
import Image from 'next/image'
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
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  // simple debounce for search input
  React.useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim().toLowerCase()), 250)
    return () => clearTimeout(t)
  }, [search])

  // Filters
  const [locationFilter, setLocationFilter] = useState<'all' | 'online' | 'in-person'>('all')
  const [daysFilter, setDaysFilter] = useState<'all' | 'lt7' | '7to30' | 'gt30'>('all')
  // new: featured filter
  const [featuredFilter, setFeaturedFilter] = useState<'all' | 'featured'>('all')

  function parseDaysLeft(str?: string): number | null {
    if (!str) return null
    const s = str.toLowerCase()

    // Exact days: "6 days", "1 day"
    let m = s.match(/(\d+)\s*day/)
    if (m) return Number(m[1])

    // Hours -> treat as 0 days remaining
    m = s.match(/(\d+)\s*hour/)
    if (m) return 0

    // Weeks: "2 weeks", "1 wk", "2 wks"
    m = s.match(/(\d+)\s*(?:week|weeks|wk|wks|w)/)
    if (m) return Number(m[1]) * 7

    // Months: approximate as 30 days: "1 month", "2 mos"
    m = s.match(/(\d+)\s*(?:month|months|mo|mos)/)
    if (m) return Number(m[1]) * 30

    m = s.match(/in\s*(\d+)\s*day/)
    if (m) return Number(m[1])
    m = s.match(/in\s*(\d+)\s*week/)
    if (m) return Number(m[1]) * 7
    m = s.match(/in\s*(\d+)\s*month/)
    if (m) return Number(m[1]) * 30

    if (s.includes('week')) return 7
    if (s.includes('month')) return 30

    return null
  }

  const filtered = hackathons.filter((h) => {
    // search filter
    if (debouncedSearch) {
      const q = debouncedSearch
      const inTitle = (h.title || '').toLowerCase().includes(q)
      const inOrg = (h.organization_name || '').toLowerCase().includes(q)
      const inThemes = (h.themes || []).some(t => (t.name || '').toLowerCase().includes(q))
      if (!(inTitle || inOrg || inThemes)) return false
    }
    // location filter
    const loc = (typeof h.displayed_location === 'string') ? h.displayed_location : (h.displayed_location?.location || '')
    const isOnline = !loc || /online/i.test(String(loc))
    if (locationFilter === 'online' && !isOnline) return false
    if (locationFilter === 'in-person' && isOnline) return false

    // days left filter
    if (daysFilter !== 'all') {
      const days = parseDaysLeft(h.time_left_to_submission)
      if (days === null) return false
      if (daysFilter === 'lt7' && !(days < 7)) return false
      if (daysFilter === '7to30' && !(days >= 7 && days <= 30)) return false
      if (daysFilter === 'gt30' && !(days > 30)) return false
    }

    // featured filter
    if (featuredFilter === 'featured' && !h.featured) return false

    return true
  })

  const visibleFiltered = filtered.slice(0, visible)

  const totalCount = hackathons.length
  const filteredCount = filtered.length
  const noFiltersActive = locationFilter === 'all' && daysFilter === 'all'

  function stripHtmlTags(str: string | undefined) {
    return (str || '').replace(/<[^>]*>/g, '')
  }

  return (
    <>
      {/* Search */}
      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search hackathons, orgs, themes..."
          className="w-full md:w-1/2 font-mono px-4 py-2 border-2 border-foreground bg-background text-foreground rounded-sm"
        />
      </div>
      <div className="mb-2">
        {noFiltersActive ? (
          <div className="font-mono text-md">{totalCount} {totalCount === 1 ? 'hackathon' : 'hackathons'}</div>
        ) : (
          <div className="font-mono text-md">Showing {filteredCount} {filteredCount === 1 ? 'hackathon' : 'hackathons'} of {totalCount}</div>
        )}
      </div>
      <div className="mb-6 flex gap-6 flex-wrap items-center">
        <fieldset className="flex items-center gap-3" aria-label="Featured filter">
          <legend className="font-mono font-bold mr-2">Featured</legend>
          <label className="cursor-pointer">
            <input className="sr-only peer" type="radio" name="featured" checked={featuredFilter === 'all'} onChange={() => setFeaturedFilter('all')} />
            <span className="inline-block font-mono text-sm rounded-full px-4 py-2 border-2 border-foreground bg-background text-muted-foreground peer-checked:bg-primary peer-checked:text-primary-foreground">All</span>
          </label>

          <label className="cursor-pointer">
            <input className="sr-only peer" type="radio" name="featured" checked={featuredFilter === 'featured'} onChange={() => setFeaturedFilter('featured')} />
            <span className="inline-block font-mono text-sm rounded-full px-4 py-2 border-2 border-foreground bg-background text-muted-foreground peer-checked:bg-primary peer-checked:text-primary-foreground">Featured</span>
          </label>
        </fieldset>
        <fieldset className="flex items-center gap-3" aria-label="Location filter">
          <legend className="font-mono font-bold mr-2">Location</legend>
          <label className="cursor-pointer">
            <input className="sr-only peer" type="radio" name="loc" checked={locationFilter === 'all'} onChange={() => setLocationFilter('all')} />
            <span className="inline-block font-mono text-sm rounded-full px-4 py-2 border-2 border-foreground bg-background text-muted-foreground peer-checked:bg-primary peer-checked:text-primary-foreground">All</span>
          </label>

          <label className="cursor-pointer">
            <input className="sr-only peer" type="radio" name="loc" checked={locationFilter === 'online'} onChange={() => setLocationFilter('online')} />
            <span className="inline-block font-mono text-sm rounded-full px-4 py-2 border-2 border-foreground bg-background text-muted-foreground peer-checked:bg-primary peer-checked:text-primary-foreground">Online</span>
          </label>

          <label className="cursor-pointer">
            <input className="sr-only peer" type="radio" name="loc" checked={locationFilter === 'in-person'} onChange={() => setLocationFilter('in-person')} />
            <span className="inline-block font-mono text-sm rounded-full px-4 py-2 border-2 border-foreground bg-background text-muted-foreground peer-checked:bg-primary peer-checked:text-primary-foreground">In-Person</span>
          </label>
        </fieldset>

        <fieldset className="flex items-center gap-3" aria-label="Days left filter">
          <legend className="font-mono font-bold mr-2">Days left</legend>
          <label className="cursor-pointer">
            <input className="sr-only peer" type="radio" name="days" checked={daysFilter === 'all'} onChange={() => setDaysFilter('all')} />
            <span className="inline-block font-mono text-sm rounded-full px-4 py-2 border-2 border-foreground bg-background text-muted-foreground peer-checked:bg-primary peer-checked:text-primary-foreground">All</span>
          </label>

          <label className="cursor-pointer">
            <input className="sr-only peer" type="radio" name="days" checked={daysFilter === 'lt7'} onChange={() => setDaysFilter('lt7')} />
            <span className="inline-block font-mono text-sm rounded-full px-4 py-2 border-2 border-foreground bg-background text-muted-foreground peer-checked:bg-primary peer-checked:text-primary-foreground">&lt; 7 days</span>
          </label>

          <label className="cursor-pointer">
            <input className="sr-only peer" type="radio" name="days" checked={daysFilter === '7to30'} onChange={() => setDaysFilter('7to30')} />
            <span className="inline-block font-mono text-sm rounded-full px-4 py-2 border-2 border-foreground bg-background text-muted-foreground peer-checked:bg-primary peer-checked:text-primary-foreground">7–30 days</span>
          </label>

          <label className="cursor-pointer">
            <input className="sr-only peer" type="radio" name="days" checked={daysFilter === 'gt30'} onChange={() => setDaysFilter('gt30')} />
            <span className="inline-block font-mono text-sm rounded-full px-4 py-2 border-2 border-foreground bg-background text-muted-foreground peer-checked:bg-primary peer-checked:text-primary-foreground">&gt; 30 days</span>
          </label>
        </fieldset>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visibleFiltered.map((hack, i) => {
          const prizeText = stripHtmlTags(hack.prize_amount)
          const thumbnailUrl = hack.thumbnail_url?.startsWith('//') ? `https:${hack.thumbnail_url}` : hack.thumbnail_url
          const isOpen = hack.open_state === 'open'

          return (
            <Card key={String(hack.id) + '-' + i} className={`p-4 sm:p-6 border-4 border-foreground ${i % 2 === 0 ? 'md:rotate-1' : 'md:-rotate-1'} sticker hover:scale-105 transition-transform cursor-pointer bg-card`}>
              <div className="space-y-4">
                <a href={hack.url} target="_blank" rel="noopener noreferrer" className="block">
                  {thumbnailUrl && (
                    <div className="relative -mx-4 -mt-4 mb-4 h-28 sm:h-32 md:-mx-6 md:-mt-6 md:h-40 overflow-hidden border-b-4 border-foreground">
                      <Image src={thumbnailUrl} alt={hack.title} fill className="object-cover" />
                      {hack.featured && (
                        <Badge className="absolute top-2 right-2 bg-yellow-500 text-black border-2 border-foreground font-mono font-bold rotate-3">FEATURED</Badge>
                      )}
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4">
                   <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-1 font-mono">{hack.title}</h3>
                      <p className="text-muted-foreground text-sm">by {hack.organization_name}</p>
                    </div>
                    <Badge className={`${isOpen ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'} border-2 border-foreground font-mono font-bold rotate-3 shrink-0`}>{isOpen ? 'OPEN' : 'CLOSED'}</Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
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
        {visible < filtered.length ? (
          <Button size="lg" variant="outline" className="bg-background border-4 border-foreground font-mono font-bold text-lg px-8 py-6 rotate-1 sticker" onClick={() => setVisible((v) => v + 10)}>LOAD MORE CHAOS →</Button>
        ) : (
          <div className="text-sm text-muted-foreground">No more hackathons</div>
        )}
      </div>
    </>
  )
}
