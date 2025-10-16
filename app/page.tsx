import React from "react"
// Ensure this route is rendered on-demand so server components fetch fresh data
export const dynamic = 'force-dynamic'
import Header from "../components/Header"
import Hero from "../components/Hero"
import Stats from "../components/Stats"
import HackathonsList from "../components/HackathonsList"
import About from "../components/About"
import Footer from "../components/Footer"

export default function DevDumpLanding() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 text-9xl font-mono rotate-12">{"{"}</div>
        <div className="absolute bottom-20 right-20 text-9xl font-mono -rotate-12">{"}"}</div>
        <div className="absolute top-1/2 left-1/4 text-6xl font-mono rotate-45">{"</>"}</div>
      </div>

      <Header />
      <Hero />
      <Stats />
      {/* <About /> */}
      <HackathonsList />
      <Footer />
    </div>
  )
}
