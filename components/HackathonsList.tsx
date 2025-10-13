import React from "react"
import Card from "./ui/Card"
import Badge from "./ui/Badge"
import Button from "./ui/Button"
import { Calendar, MapPin, Users, Trophy } from "lucide-react"
import { Dropbox } from 'dropbox'

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
    // Make sure URL ends with dl=1 to get raw JSON
    const DROPBOX_JSON_URL = 'https://www.dropbox.com/scl/fi/s80mllk5preqn5hgyi934/hack.json?rlkey=setdetypr0cj9d9ij5wo42pgs&st=mg0y4hr2&dl=0'

    // If the server has a DROPBOX_ACCESS_TOKEN and we have a dropbox share link,
    // prefer using the server-side Dropbox API route to avoid exposing tokens client-side
    const isDropboxLink = DROPBOX_JSON_URL.includes('dropbox.com') || DROPBOX_JSON_URL.includes('dropboxusercontent.com')

    // If we have a server-side Dropbox token, use the SDK to download the file
    let json: unknown
    const token = process.env.DROPBOX_ACCESS_TOKEN
    if (isDropboxLink && token) {
      try {
        // Provide a fetch implementation for the SDK in Node/Next server runtime.
        // Some SDK versions expect response.buffer() which the Web fetch Response doesn't implement.
        // Wrap global fetch to add a .buffer() method so the SDK can call it.
        const fetchWithBuffer = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
          const globalFetch = (globalThis as unknown as { fetch: typeof fetch }).fetch
          const res = await globalFetch(input as RequestInfo, init)
          try {
            // attach buffer() that returns a Node Buffer
            ;(res as Response & { buffer?: () => Promise<Buffer> }).buffer = async () => Buffer.from(await (res as Response).arrayBuffer())
          } catch (e: unknown) {
            console.log(e)
          }
          return res
        }

        const dbx = new Dropbox({ accessToken: token as string, fetch: fetchWithBuffer })

        // If the link looks like a shared link (dropbox.com), use sharingGetSharedLinkFile
        if (DROPBOX_JSON_URL.includes('dropbox.com')) {
          const res = await dbx.sharingGetSharedLinkFile({ url: DROPBOX_JSON_URL })
          // SDK v10+ may return result.fileBinary or result.fileBlob
          // The SDK sometimes returns the content directly on `res.result` string
          type DropboxSdkResult = string | { fileBinary?: ArrayBuffer | Uint8Array | string; fileBlob?: Blob; [key: string]: unknown }
          const resultAny: DropboxSdkResult = ((res as { result?: unknown }).result ?? res) as DropboxSdkResult
          let buffer: Buffer | null = null

          if (resultAny && typeof resultAny === 'object' && 'fileBinary' in resultAny && resultAny.fileBinary) {
            const fb = (resultAny as { fileBinary?: ArrayBuffer | Uint8Array | string }).fileBinary
            if (typeof fb === 'string') {
              buffer = Buffer.from(fb)
            } else if (fb instanceof Uint8Array) {
              buffer = Buffer.from(fb)
            } else if (fb instanceof ArrayBuffer) {
              buffer = Buffer.from(new Uint8Array(fb))
            }
          } else if (resultAny && typeof resultAny === 'object' && 'fileBlob' in resultAny && resultAny.fileBlob) {
            const blob = (resultAny as { fileBlob?: Blob }).fileBlob as Blob
            const ab = await blob.arrayBuffer()
            buffer = Buffer.from(ab)
          } else if (typeof resultAny === 'string') {
            // Some SDK behaviours return the text directly
            json = JSON.parse(resultAny)
          }

          if (!json && buffer) {
            json = JSON.parse(buffer.toString('utf8'))
          }
        } else {
          // Try filesDownload by path if the URL looks like a path (/folder/file.json)
          if (DROPBOX_JSON_URL.startsWith('/')) {
            const res = await dbx.filesDownload({ path: DROPBOX_JSON_URL })
            type DropboxFilesDownloadResult = { fileBinary?: ArrayBuffer | Uint8Array | string; fileBlob?: Blob; [key: string]: unknown } | string
            const resultAny: DropboxFilesDownloadResult = (((res as unknown) as { result?: unknown }).result ?? res) as DropboxFilesDownloadResult
            let buffer: Buffer | null = null
            if (typeof resultAny === 'object' && resultAny !== null && 'fileBinary' in resultAny && resultAny.fileBinary) {
              const fb = (resultAny as { fileBinary?: ArrayBuffer | Uint8Array | string }).fileBinary
              if (typeof fb === 'string') {
                buffer = Buffer.from(fb)
              } else if (fb instanceof Uint8Array) {
                buffer = Buffer.from(fb)
              } else if (fb instanceof ArrayBuffer) {
                buffer = Buffer.from(new Uint8Array(fb))
              }
            } else if (typeof resultAny === 'object' && resultAny !== null && 'fileBlob' in resultAny && resultAny.fileBlob) {
              const blob = (resultAny as { fileBlob?: Blob }).fileBlob as Blob
              const ab = await blob.arrayBuffer()
              buffer = Buffer.from(ab)
            }
            if (buffer) json = JSON.parse(buffer.toString('utf8'))
          } else {
            // Fallback to HTTP fetch for dropboxusercontent links
            const r = await fetch(DROPBOX_JSON_URL, { cache: 'no-store' })
            const text = await r.text()
            json = JSON.parse(text)
          }
        }
      } catch (err) {
        console.error('Dropbox SDK download error:', err)
        return []
      }
    } else {
      // No token or not a dropbox link — fetch directly
      const res = await fetch(DROPBOX_JSON_URL, { cache: 'no-store' })
      if (!res.ok) {
        console.error(`Failed to fetch JSON: ${res.status}`)
        return []
      }
      const contentType = res.headers.get('content-type') || ''
      if (contentType.includes('application/json')) json = await res.json()
      else {
        const text = await res.text()
        try { json = JSON.parse(text) } catch (err) { console.error('Failed to parse response as JSON, response preview: '+err, text.slice(0,300)); return [] }
      }
    }

    // The JSON may be an array of source objects (e.g. [{ source: 'devfolio', data: {...} }, { source: 'devpost', data: {...} }])
    if (Array.isArray(json) && json.length > 0) {
      // helper: deep-search for open_hackathons array inside an object
      const findOpenHackathons = (obj: unknown): unknown[] | null => {
        if (!obj || typeof obj !== 'object') return null
        const record = obj as Record<string, unknown>
        const maybe = record['open_hackathons']
        if (Array.isArray(maybe)) return maybe as unknown[]
        for (const k of Object.keys(record)) {
          try {
            const v = record[k]
            if (v && typeof v === 'object') {
              const found = findOpenHackathons(v)
              if (found) return found
            }
          } catch (e) {
            console.log(e)
          }
        }
        return null
      }

      const devpostLists: Hackathon[] = []
      const devfolioLists: Hackathon[] = []

      for (const item of json as unknown[]) {
        if (!item || typeof item !== 'object') continue
        const record = item as Record<string, unknown>
        const data = (record.data ?? record) as Record<string, unknown>

        // devpost style
        if (data && typeof data === 'object' && Array.isArray(data['hackathons'])) {
          devpostLists.push(...(data['hackathons'] as Hackathon[]))
        }

        // devfolio style: search for open_hackathons anywhere inside the object
        const open = findOpenHackathons(data)
        if (open && Array.isArray(open) && open.length > 0) {
          // map devfolio open_hackathons entries into our Hackathon shape
          const mapped = open.map((h: unknown, idx: number) => {
            const rec = h as Record<string, unknown>

            const id = rec['id'] ?? rec['uuid'] ?? rec['slug'] ?? idx
            const title = (rec['name'] ?? rec['title'] ?? 'Untitled') as string
            const slug = (rec['slug'] ?? '') as string
            const startsAt = (rec['starts_at'] ?? '') as string
            const endsAt = (rec['ends_at'] ?? '') as string
            const isOnlineFlag = rec['is_online'] === true
            const formatDate = (iso?: string) => {
              if (!iso) return ''
              try {
                const d = new Date(iso)
                return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              } catch {
                return iso
              }
            }
            const settings = (rec['settings'] && typeof rec['settings'] === 'object') ? (rec['settings'] as Record<string, unknown>) : undefined
            const url = (settings?.site as string) ?? (rec['external_url'] as string) ?? (rec['url'] as string) ?? (slug ? `https://devfolio.co/${slug}` : '#')
            const thumbnail_url = (rec['logo'] ?? rec['thumbnail_url'] ?? '') as string
            const displayed_location = { icon: '', location: isOnlineFlag ? 'Online' : ((rec['location'] as string) ?? 'In-Person') }
            const open_state = (rec['open_state'] ?? ((rec['is_open'] === true) ? 'open' : 'closed')) as string
            const time_left_to_submission = (rec['time_left_to_submission'] ?? '') as string
            const submission_period_dates = (rec['submission_period_dates'] ?? ((startsAt || endsAt) ? `${formatDate(startsAt)} - ${formatDate(endsAt)}` : '')) as string

            const themes = Array.isArray(rec['themes']) ? (rec['themes'] as unknown[]).map((t, i:number) => {
              if (typeof t === 'string') return { id: i, name: t }
              if (t && typeof t === 'object') {
                const maybe = (t as Record<string, unknown>)['theme'] ?? t
                if (maybe && typeof maybe === 'object') {
                  return { id: ((maybe as Record<string, unknown>)['id'] ?? i) as number, name: ((maybe as Record<string, unknown>)['name'] ?? String(maybe)) as string }
                }
                return { id: i, name: String(maybe) }
              }
              return { id: i, name: String(t) }
            }) : []

            const prize_amount = (rec['prize_amount'] ?? rec['prizes'] ?? '') as string
            const prizes_counts = { cash: Number((rec['prizes_counts'] as Record<string, unknown>)?.cash ?? 0), other: Number((rec['prizes_counts'] as Record<string, unknown>)?.other ?? 0) }
            const registrations_count = Number(rec['participants_count'] ?? rec['registrations_count'] ?? rec['num_registrations'] ?? 0)
            const organization_name = (rec['organization_name'] ?? rec['organization'] ?? rec['host'] ?? '') as string
            const featured = !!rec['featured']
            const winners_announced = !!rec['winners_announced']
            const submission_gallery_url = (rec['submission_gallery_url'] ?? '') as string
            const start_a_submission_url = (rec['start_a_submission_url'] ?? rec['registration_url'] ?? (settings?.external_apply_url as string) ?? (settings?.site as string) ?? (rec['external_url'] ?? rec['url'] ?? (slug ? `https://devfolio.co/${slug}` : '#'))) as string

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
          devfolioLists.push(...mapped)
        }
      }

      // If we collected any lists, merge and dedupe (prefer devpost entries when duplicates exist)
      const merged: Hackathon[] = [...devpostLists, ...devfolioLists]
      if (merged.length > 0) {
        const byKey = new Map<string, Hackathon>()
        for (const h of merged) {
          const key = (h.url && String(h.url)) || String(h.id)
          if (!byKey.has(key)) byKey.set(key, h)
          else {
            const existing = byKey.get(key)!
            if (!existing.thumbnail_url && h.thumbnail_url) existing.thumbnail_url = h.thumbnail_url
            if ((!existing.prize_amount || existing.prize_amount === '') && h.prize_amount) existing.prize_amount = h.prize_amount
          }
        }
        return Array.from(byKey.values())
      }
    }

    // If the JSON is directly an array of hackathon-like objects (e.g. [{...}, {...}])
    if (Array.isArray(json) && json.length > 0 && typeof json[0] === 'object') {
      const arr = json as unknown[]
      // simple heuristic: if items look like hackathon entries, normalize them
      const looksLikeHack = (item: unknown): item is Record<string, unknown> => {
        if (!item || typeof item !== 'object') return false
        const rec = item as Record<string, unknown>
        return Boolean((rec.title || rec.name) && (rec.url || rec.external_url))
      }
      if (arr.every(looksLikeHack)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const normalized = arr.map((h: unknown, idx: number) => {
                  const rec = h as Record<string, unknown>
                  const id = rec['id'] ?? rec['uuid'] ?? rec['slug'] ?? idx
                  const title = (rec['title'] ?? rec['name'] ?? 'Untitled Hack') as string
                  const url = (rec['url'] ?? rec['external_url'] ?? '#') as string
                  const thumbnail_url = (rec['thumbnail_url'] ?? rec['logo'] ?? '') as string
                  const displayed_location = { icon: '', location: (rec['location'] ?? ((rec['displayed_location'] as Record<string, unknown>)?.location) ?? 'Online') as string }
                  const open_state = (rec['open_state'] ?? ((rec['is_open'] as unknown) ? 'open' : 'closed')) as string
                  const time_left_to_submission = (rec['time_left_to_submission'] ?? rec['time_left'] ?? '') as string
                  const submission_period_dates = (rec['submission_period_dates'] ?? rec['dates'] ?? '') as string
                  const themes = Array.isArray(rec['themes']) ? (rec['themes'] as unknown[]).map((t: unknown, i: number) => {
                    if (typeof t === 'string') return { id: i, name: t }
                    if (t && typeof t === 'object') {
                      const maybe = (t as Record<string, unknown>)['theme'] ?? t
                      if (maybe && typeof maybe === 'object') {
                        return { id: ((maybe as Record<string, unknown>)['id'] ?? i) as number, name: ((maybe as Record<string, unknown>)['name'] ?? String(maybe)) as string }
                      }
                      return { id: i, name: String(maybe) }
                    }
                    return { id: i, name: String(t) }
                  }) : []
                  const prize_amount = (rec['prize_amount'] ?? rec['prizes'] ?? '') as string
                  const prizes_counts = { cash: (rec['prizes_counts'] as Record<string, unknown>)?.cash ?? 0, other: (rec['prizes_counts'] as Record<string, unknown>)?.other ?? 0 }
                  const registrations_count = (rec['registrations_count'] ?? rec['num_registrations'] ?? 0) as number
                  const organization_name = (rec['organization_name'] ?? rec['organization'] ?? rec['host'] ?? '') as string
                  const featured = !!rec['featured']
                  const winners_announced = !!rec['winners_announced']
                  const submission_gallery_url = (rec['submission_gallery_url'] ?? '') as string
                  const start_a_submission_url = (rec['start_a_submission_url'] ?? rec['registration_url'] ?? url) as string
        
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
      }
    }

    // Fallback: if it's directly the object format
    if (typeof json === 'object' && json !== null) {
      const obj = json as Record<string, unknown>
      if (obj.data && typeof obj.data === 'object' && obj.data !== null) {
        const data = obj.data as Record<string, unknown>
        if (Array.isArray(data.hackathons)) {
          return data.hackathons as Hackathon[]
        }
      }
    }

    console.error('Unexpected JSON structure:', json)
    return []
  } catch (error) {
    console.error('Error fetching hackathons:', error)
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
              const thumbnailUrl = hack.thumbnail_url.startsWith('//')
                ? `https:${hack.thumbnail_url}`
                : hack.thumbnail_url
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
