import { Calendar, MapPin, Users, Trophy, Search, Zap, Code, Flame } from "lucide-react"
import type { ReactNode, InputHTMLAttributes, ButtonHTMLAttributes } from "react"

const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline"
  size?: "default" | "lg"
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors disabled:opacity-50"
  const variantStyles =
    variant === "outline"
      ? "bg-background hover:bg-accent hover:text-accent-foreground"
      : "bg-primary text-primary-foreground hover:bg-primary/90"
  const sizeStyles = size === "lg" ? "px-8 py-3 text-lg" : "px-4 py-2"

  return (
    <button className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`} {...props}>
      {children}
    </button>
  )
}

const Card = ({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) => {
  return <div className={`rounded-lg bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>
}

const Badge = ({
  children,
  className = "",
  variant = "default",
}: {
  children: ReactNode
  className?: string
  variant?: "default" | "outline"
}) => {
  const variantStyles =
    variant === "outline"
      ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      : "bg-primary text-primary-foreground"

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variantStyles} ${className}`}
    >
      {children}
    </div>
  )
}

const Input = ({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

const hackathons = [
  {
    id: 1,
    name: "CodeChaos 2025",
    tagline: "Break things, win prizes",
    date: "Mar 15-17, 2025",
    location: "San Francisco, CA",
    mode: "In-Person",
    participants: "500+",
    prize: "$50K",
    status: "Open",
    tags: ["Web3", "AI", "Hardware"],
  },
  {
    id: 2,
    name: "HackTheNight",
    tagline: "Code till sunrise",
    date: "Apr 2-3, 2025",
    location: "Online",
    mode: "Virtual",
    participants: "1000+",
    prize: "$30K",
    status: "Open",
    tags: ["Mobile", "Gaming", "Social"],
  },
  {
    id: 3,
    name: "BuildFast Jam",
    tagline: "Ship or die trying",
    date: "Apr 20-22, 2025",
    location: "New York, NY",
    mode: "Hybrid",
    participants: "300+",
    prize: "$25K",
    status: "Open",
    tags: ["Fintech", "SaaS", "API"],
  },
  {
    id: 4,
    name: "Midnight Hackers",
    tagline: "No sleep, just code",
    date: "May 5-7, 2025",
    location: "Austin, TX",
    mode: "In-Person",
    participants: "400+",
    prize: "$40K",
    status: "Soon",
    tags: ["IoT", "Climate", "Health"],
  },
  {
    id: 5,
    name: "DevRage 2025",
    tagline: "Rage code your way to victory",
    date: "May 18-19, 2025",
    location: "Online",
    mode: "Virtual",
    participants: "800+",
    prize: "$20K",
    status: "Soon",
    tags: ["Open Source", "DevTools", "Security"],
  },
  {
    id: 6,
    name: "SpeedRun Hack",
    tagline: "24 hours of pure chaos",
    date: "Jun 1-2, 2025",
    location: "Seattle, WA",
    mode: "In-Person",
    participants: "250+",
    prize: "$35K",
    status: "Soon",
    tags: ["AI/ML", "Data", "Cloud"],
  },
]

export default function DevDumpLanding() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Chaotic Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 text-9xl font-mono rotate-12">{"{"}</div>
        <div className="absolute bottom-20 right-20 text-9xl font-mono -rotate-12">{"}"}</div>
        <div className="absolute top-1/2 left-1/4 text-6xl font-mono rotate-45">{"</>"}</div>
      </div>

      {/* Header */}
      <header className=" border-b-4 border-foreground bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground px-3 py-1 rotate-2 font-mono font-bold text-xl sticker border-2 border-foreground">
              DEV
            </div>
            <div className="bg-secondary text-secondary-foreground px-3 py-1 -rotate-2 font-mono font-bold text-xl sticker border-2 border-foreground">
              DUMP
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#hackathons" className="font-mono hover:underline decoration-4 decoration-primary">
              Hackathons
            </a>
            <a href="#about" className="font-mono hover:underline decoration-4 decoration-primary">
              About
            </a>
          </nav>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground font-mono font-bold rotate-1 sticker">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-6">
              <span className="text-4xl md:text-7xl font-black bg-primary text-primary-foreground px-4 py-2 rotate-2 border-4 border-foreground sticker">
                FIND
              </span>
              <span className="text-3xl md:text-6xl font-mono bg-secondary text-secondary-foreground px-3 py-1 -rotate-1 border-4 border-foreground sticker">
                YOUR
              </span>
              <span className="text-5xl md:text-8xl font-black bg-foreground text-background px-4 py-2 rotate-1 border-4 border-foreground sticker">
                HACK
              </span>
            </div>

            <p className="text-lg md:text-2xl font-mono max-w-2xl mx-auto leading-relaxed text-balance">
              The most{" "}
              <span className="bg-secondary text-secondary-foreground px-2 py-1 rotate-1 inline-block border-2 border-foreground">
                unhinged
              </span>{" "}
              hackathon platform. Discover events, dump code, and{" "}
              <span className="bg-primary text-primary-foreground px-2 py-1 -rotate-1 inline-block border-2 border-foreground">
                win big
              </span>
              .
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search hackathons..."
                    className="pl-10 h-14 border-4 border-foreground font-mono text-lg"
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground border-4 border-foreground font-mono font-black text-lg px-8 h-14 rotate-1 sticker">
                  SEARCH
                </Button>
              </div>
            </div>

            {/* Sticker Icons */}
            <div className="flex items-center justify-center gap-4 md:gap-6 py-6">
              <div className="bg-primary text-primary-foreground p-3 rotate-6 border-3 border-foreground sticker">
                <Zap className="w-8 h-8" />
              </div>
              <div className="bg-secondary text-secondary-foreground p-3 -rotate-3 border-3 border-foreground sticker">
                <Code className="w-8 h-8" />
              </div>
              <div className="bg-foreground text-background p-3 rotate-2 border-3 border-foreground sticker">
                <Trophy className="w-8 h-8" />
              </div>
              <div className="bg-primary text-primary-foreground p-3 -rotate-6 border-3 border-foreground sticker">
                <Flame className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-foreground text-background border-y-4 border-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: "HACKATHONS", value: "150+" },
              { label: "HACKERS", value: "50K+" },
              { label: "PRIZES", value: "$2M+" },
              { label: "CHAOS", value: "∞" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className={`text-3xl md:text-5xl font-black mb-2 ${i % 2 === 0 ? "text-primary" : "text-secondary"}`}
                >
                  {stat.value}
                </div>
                <div className="text-sm md:text-base font-mono font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="hackathons" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
              <h2 className="text-3xl md:text-5xl font-black">
                <span className="bg-primary text-primary-foreground px-4 py-2 rotate-1 inline-block border-4 border-foreground sticker mr-2">
                  UPCOMING
                </span>
                <span className="bg-secondary text-secondary-foreground px-4 py-2 -rotate-1 inline-block border-4 border-foreground sticker">
                  HACKS
                </span>
              </h2>

              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-foreground text-background border-2 border-foreground font-mono px-4 py-2 rotate-1">
                  All
                </Badge>
                <Badge
                  variant="outline"
                  className="border-2 border-foreground font-mono px-4 py-2 -rotate-1 hover:bg-primary hover:text-primary-foreground"
                >
                  In-Person
                </Badge>
                <Badge
                  variant="outline"
                  className="border-2 border-foreground font-mono px-4 py-2 rotate-1 hover:bg-secondary hover:text-secondary-foreground"
                >
                  Virtual
                </Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {hackathons.map((hack, i) => (
                <Card
                  key={hack.id}
                  className={`p-6 border-4 border-foreground ${i % 2 === 0 ? "rotate-1" : "-rotate-1"} sticker hover:scale-105 transition-transform cursor-pointer bg-card`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-black mb-1 font-mono">{hack.name}</h3>
                        <p className="text-muted-foreground text-sm">{hack.tagline}</p>
                      </div>
                      <Badge
                        className={`${
                          hack.status === "Open"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        } border-2 border-foreground font-mono font-bold rotate-3 shrink-0`}
                      >
                        {hack.status}
                      </Badge>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="font-mono">{hack.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-secondary" />
                        <span className="font-mono">{hack.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="font-mono">{hack.participants}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-secondary" />
                        <span className="font-mono font-bold">{hack.prize}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {hack.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="border-2 border-foreground font-mono text-xs rotate-1"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground font-mono font-bold">
                      {hack.status === "Open" ? "REGISTER NOW →" : "LEARN MORE →"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                className="bg-background border-4 border-foreground font-mono font-bold text-lg px-8 py-6 rotate-1 sticker"
              >
                LOAD MORE CHAOS →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-12 text-center">
              <span className="bg-primary text-primary-foreground px-4 py-2 rotate-2 inline-block border-4 border-foreground sticker mr-2">
                WHY
              </span>
              <span className="bg-secondary text-secondary-foreground px-4 py-2 -rotate-1 inline-block border-4 border-foreground sticker">
                DEVDUMP?
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-4 border-foreground rotate-1 bg-card sticker">
                <div className="bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center border-2 border-foreground mb-4 rotate-3">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black mb-3 font-mono">NO GATEKEEPING</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All skill levels welcome. From first-time hackers to seasoned pros, everyone belongs here.
                </p>
              </Card>

              <Card className="p-6 border-4 border-foreground -rotate-1 bg-card sticker">
                <div className="bg-secondary text-secondary-foreground w-12 h-12 flex items-center justify-center border-2 border-foreground mb-4 -rotate-3">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black mb-3 font-mono">REAL PRIZES</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Millions in prizes across hundreds of hackathons. Build cool stuff, get paid.
                </p>
              </Card>

              <Card className="p-6 border-4 border-foreground rotate-2 bg-card sticker">
                <div className="bg-foreground text-background w-12 h-12 flex items-center justify-center border-2 border-foreground mb-4 rotate-6">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black mb-3 font-mono">CHAOS FRIENDLY</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We celebrate the messy, the weird, and the experimental. Break things and learn fast.
                </p>
              </Card>

              <Card className="p-6 border-4 border-foreground -rotate-2 bg-card sticker">
                <div className="bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center border-2 border-foreground mb-4 -rotate-6">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black mb-3 font-mono">GLOBAL COMMUNITY</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Join 50K+ hackers worldwide. Virtual, in-person, or hybrid - we've got you covered.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-foreground bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-black text-lg mb-4 text-primary">PLATFORM</h4>
                <div className="space-y-2 font-mono text-sm">
                  <p>Browse Hackathons</p>
                </div>
              </div>
              <div>
                <h4 className="font-black text-lg mb-4 text-secondary">COMMUNITY</h4>
                <div className="space-y-2 font-mono text-sm">
                  <p>Discord</p>
                  <p>Twitter/X</p>
                  <p>GitHub</p>
                </div>
              </div>
              <div>
                <h4 className="font-black text-lg mb-4 text-primary">RESOURCES</h4>
                <div className="space-y-2 font-mono text-sm">
                  <p>Blog</p>
                  <p>Help Center</p>
                  <p>API Docs</p>
                </div>
              </div>
              <div>
                <h4 className="font-black text-lg mb-4 text-secondary">LEGAL</h4>
                <div className="space-y-2 font-mono text-sm">
                  <p>Terms</p>
                  <p>Privacy</p>
                  <p>Code of Conduct</p>
                </div>
              </div>
            </div>
            <div className="text-center font-mono text-sm pt-8 border-t-2 border-background/20">
              © 2025 DevDump. All rights reserved. Made with chaos & caffeine.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
