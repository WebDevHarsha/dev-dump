import React from "react"

export default function Footer() {
  return (
    <footer className="border-t-4 border-foreground bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-black text-lg mb-4 text-primary">PLATFORM</h4>
              <div className="space-y-2 font-mono text-sm"><p>Browse Hackathons</p></div>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4 text-secondary">COMMUNITY</h4>
              <div className="space-y-2 font-mono text-sm"><p>Discord</p><p>Twitter/X</p><p>GitHub</p></div>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4 text-primary">RESOURCES</h4>
              <div className="space-y-2 font-mono text-sm"><p>Blog</p><p>Help Center</p><p>API Docs</p></div>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4 text-secondary">LEGAL</h4>
              <div className="space-y-2 font-mono text-sm"><p>Terms</p><p>Privacy</p><p>Code of Conduct</p></div>
            </div>
          </div>
          <div className="text-center font-mono text-sm pt-8 border-t-2 border-background/20">© 2025 DevDump. All rights reserved. Made with chaos & caffeine.</div>
        </div>
      </div>
    </footer>
  )
}
