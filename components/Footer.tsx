import React from "react"

export default function Footer() {
  return (
    <footer className="border-t-4 border-foreground bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="font-mono font-bold text-lg mb-3">Open Hackathons API</h3>
            <a 
              href="https://webdevharsha.github.io/open-hackathons-api/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block font-mono text-sm hover:underline underline-offset-4 transition-all hover:scale-105"
            >
              🚀 Access our free API →
            </a>
          </div>
          <div className="text-center font-mono text-sm pt-8 border-t-2 border-background/20">© 2025 DevDump. All rights reserved. Made with chaos & caffeine.</div>
        </div>
      </div>
    </footer>
  )
}
