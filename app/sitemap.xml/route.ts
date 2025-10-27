import { NextResponse } from 'next/server'
import { getHackathonsFromDb } from '../../lib/mongodb'

const baseUrl = 'https://devdump.vasriharsha.app'

export async function GET() {
  // include static pages
  const pages = ['/', '/about']

  // try to include per-hackathon pages if present (if you later add internal pages)
  let hackUrls: { loc: string; lastmod?: string }[] = []
  try {
    const hacks = await getHackathonsFromDb()
    // if your hackathons have internal pages, adjust this mapping
    hackUrls = hacks
      .filter(h => h.slug || h.id || h._id)
      .map(h => {
        const id = h.slug || h.id || h._id
        // try to pick a startDate-like field for lastmod
        const sd = h.startDate || h.start_date || h.start || h.starts_at || h.startsAt || h._createdAt
        let lastmod: string | undefined
        if (sd) {
          try {
            const d = new Date(sd)
            if (!isNaN(d.getTime())) lastmod = d.toISOString()
          } catch (e) {
            // ignore invalid date
          }
        }
        return { loc: `/hackathon/${id}`, lastmod }
      })
  } catch (e) {
    // ignore DB errors; sitemap will still include main pages
    console.error('sitemap db error', e)
  }
  const urls: Array<{ loc: string; lastmod?: string }> = [...pages.map(p => ({ loc: p })), ...hackUrls]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map((u) => {
        const loc = `${baseUrl}${u.loc}`
        const lastmod = u.lastmod || new Date().toISOString()
        return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`
      })
      .join('\n')}
  </urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  })
}
