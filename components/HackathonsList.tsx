import React from 'react'
// Force dynamic server rendering so MongoDB is queried at request-time on Vercel
export const dynamic = 'force-dynamic'
import HackathonsListClient from './HackathonsListClient'
import Badge from './ui/Badge'
import { getHackathonsFromDb } from '../lib/mongodb'

type Theme = { id: number | string; name: string }

type Hackathon = {
  id: number | string
  title: string
  url: string
  thumbnail_url?: string
  displayed_location: { icon?: string; location: string }
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

async function fetchHackathons(): Promise<Hackathon[]> {
  try {
    const docs = (await getHackathonsFromDb()) as unknown[]

    const get = <T = unknown>(obj: Record<string, unknown>, key: string): T | undefined => {
      return obj[key] as T | undefined
    }

    const normalized: Hackathon[] = docs.map((recRaw, idx: number) => {
      const rec = (recRaw as Record<string, unknown>) ?? {}

      const id = (get<number | string>(rec, 'id') ?? get<number | string>(rec, '_id') ?? idx) as number | string
      const title = (get<string>(rec, 'title') ?? get<string>(rec, 'name') ?? 'Untitled') as string
      const url = (get<string>(rec, 'url') ?? get<string>(rec, 'external_url') ?? '#') as string
      const thumbnail_url = (get<string>(rec, 'thumbnail_url') ?? get<string>(rec, 'logo') ?? '') as string

      let displayed_location = { icon: '', location: 'Online' }
      const dlRaw = get<unknown>(rec, 'displayed_location')
      if (typeof dlRaw === 'string') {
        displayed_location = { icon: '', location: dlRaw.trim() || 'Online' }
      } else if (dlRaw && typeof dlRaw === 'object') {
        const dlObj = dlRaw as Record<string, unknown>
        const iconVal = dlObj['icon']
        const locationVal = dlObj['location']
        displayed_location = {
          icon: typeof iconVal === 'string' ? iconVal : '',
          location: typeof locationVal === 'string' ? locationVal : String(locationVal ?? 'Online'),
        }
      } else {
        const loc = get<string>(rec, 'location')
        displayed_location = { icon: '', location: loc ?? 'Online' }
      }

      const open_state = (get<string>(rec, 'open_state') ?? (get<boolean>(rec, 'isOpen') ? 'open' : (get<boolean>(rec, 'open') ? 'open' : 'closed'))) as string
      const time_left_to_submission = (get<string>(rec, 'time_left_to_submission') ?? get<string>(rec, 'time_left') ?? '') as string
      const submission_period_dates = (get<string>(rec, 'submission_period_dates') ?? get<string>(rec, 'dates') ?? '') as string

      const themesRaw = get<unknown>(rec, 'themes')
      const themes: Theme[] = Array.isArray(themesRaw)
        ? (themesRaw as unknown[]).map((t: unknown, i: number) => {
            if (t && typeof t === 'object') {
              const tobj = t as Record<string, unknown>
              return {
                id: (tobj['id'] as number) ?? i,
                name: (tobj['name'] as string) ?? String(t),
              }
            }
            return { id: i, name: String(t) }
          })
        : []

      const prize_amount = (get<string>(rec, 'prize_amount') ?? get<string>(rec, 'prizes') ?? '') as string
      const prizesCountsRaw = get<unknown>(rec, 'prizes_counts')
      const prizes_counts = prizesCountsRaw && typeof prizesCountsRaw === 'object'
        ? {
            cash: Number((prizesCountsRaw as Record<string, unknown>)['cash'] ?? 0),
            other: Number((prizesCountsRaw as Record<string, unknown>)['other'] ?? 0),
          }
        : { cash: 0, other: 0 }

      const registrations_count = Number(get<number>(rec, 'registrations_count') ?? get<number>(rec, 'participants_count') ?? get<number>(rec, 'num_registrations') ?? 0)
      const organization_name = (get<string>(rec, 'organization_name') ?? get<string>(rec, 'organization') ?? get<string>(rec, 'host') ?? '') as string
      const featured = !!get<boolean>(rec, 'featured')
      const winners_announced = !!get<boolean>(rec, 'winners_announced')
      const submission_gallery_url = (get<string>(rec, 'submission_gallery_url') ?? '') as string
      const start_a_submission_url = (get<string>(rec, 'start_a_submission_url') ?? get<string>(rec, 'registration_url') ?? get<string>(rec, 'external_apply_url') ?? get<string>(rec, 'url') ?? '#') as string

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

          {/* Client-side list + filters */}
          <HackathonsListClient hackathons={hackathons} />
        </div>
      </div>
    </section>
  )
}
