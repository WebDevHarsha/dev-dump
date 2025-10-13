import React from 'react'
import Image from 'next/image'

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
  // Replace this URL with your Dropbox JSON file URL (ensure dl=1 to fetch raw JSON)
  const DROPBOX_JSON_URL = 'https://www.dropbox.com/scl/fi/btk9utjoupf53m6zi03ki/hack.json?rlkey=omwn112qg0bc16drwou7jpvms&st=izfqx1ww&dl=1'
  
  const res = await fetch(DROPBOX_JSON_URL, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch JSON: ${res.status}`)
  }

  const json: unknown = await res.json()

  if (Array.isArray(json) && json.length > 0 && typeof json[0] === 'object' && json[0] !== null) {
    const first = json[0] as Record<string, unknown>
    if (first.data && typeof first.data === 'object' && first.data !== null) {
      const data = first.data as Record<string, unknown>
      if (Array.isArray(data.hackathons)) {
        return data.hackathons as Hackathon[]
      }
    }
  }

  if (typeof json === 'object' && json !== null) {
    const obj = json as Record<string, unknown>
    if (obj.data && typeof obj.data === 'object' && obj.data !== null) {
      const data = obj.data as Record<string, unknown>
      if (Array.isArray(data.hackathons)) {
        return data.hackathons as Hackathon[]
      }
    }
  }

  throw new Error('Unexpected JSON structure')
}

function stripHtmlTags(str: string): string {
  return str.replace(/<[^>]*>/g, '')
}

export default async function DataPage() {
  let hackathons: Hackathon[] = []
  let error: string | null = null

  try {
    hackathons = await fetchHackathons()
  } catch (e: unknown) {
    if (e instanceof Error) {
      error = e.message
    } else {
      error = 'Unknown error'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Devpost Hackathons
          </h1>
          <p className="text-gray-400">
            Explore {hackathons.length} open hackathons from around the world
          </p>
        </header>

        {error ? (
          <div className="bg-red-500/10 border border-red-500 text-red-400 rounded-lg p-4 mb-6">
            <strong>Error:</strong> {error}
          </div>
        ) : null}

        {hackathons.length === 0 && !error ? (
          <div className="text-center text-gray-400 py-12">
            Loading hackathons...
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hackathons.map((hackathon) => {
            const prizeText = stripHtmlTags(hackathon.prize_amount)
            const thumbnailUrl = hackathon.thumbnail_url.startsWith('//')
              ? `https:${hackathon.thumbnail_url}`
              : hackathon.thumbnail_url

            return (
              <article
                key={hackathon.id}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gray-900 overflow-hidden">
                  {thumbnailUrl && (
                    <Image
                      src={thumbnailUrl}
                      alt={hackathon.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  {hackathon.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                      FEATURED
                    </div>
                  )}
                  {hackathon.open_state === 'open' && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                      OPEN
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Title & Organization */}
                  <div className="mb-3">
                    <a
                      href={hackathon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-semibold hover:text-blue-400 transition-colors line-clamp-2"
                    >
                      {hackathon.title}
                    </a>
                    <p className="text-sm text-gray-400 mt-1">
                      by {hackathon.organization_name}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{hackathon.displayed_location.location}</span>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{hackathon.submission_period_dates}</span>
                  </div>

                  {/* Time Left */}
                  <div className="text-sm font-semibold text-blue-400 mb-3">
                    ⏰ {hackathon.time_left_to_submission}
                  </div>

                  {/* Prize */}
                  <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Total Prize</p>
                        <p className="text-2xl font-bold text-yellow-400">
                          {prizeText}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 mb-1">Prizes</p>
                        <p className="text-lg font-semibold">
                          {hackathon.prizes_counts.cash + hackathon.prizes_counts.other}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Themes */}
                  {hackathon.themes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {hackathon.themes.map((theme) => (
                        <span
                          key={theme.id}
                          className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30"
                        >
                          {theme.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Registrations */}
                  <div className="text-sm text-gray-400 mb-4">
                    👥 {hackathon.registrations_count.toLocaleString()} registered
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto flex gap-2">
                    <a
                      href={hackathon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-semibold transition-colors"
                    >
                      View Details
                    </a>
                    <a
                      href={hackathon.start_a_submission_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded-lg font-semibold transition-colors"
                    >
                      Submit
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Footer Note */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Data sourced from Devpost. Updated periodically.
          </p>
        </footer>
      </div>
    </div>
  )
}
