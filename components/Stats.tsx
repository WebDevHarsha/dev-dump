import React from "react"

export default function Stats() {
  const stats = [
    { label: "HACKATHONS", value: "150+" },
    { label: "HACKERS", value: "50K+" },
    { label: "PRIZES", value: "$2M+" },
    { label: "CHAOS", value: "∞" },
  ]

  return (
    <section className="py-12 bg-foreground text-background border-y-4 border-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`text-3xl md:text-5xl font-black mb-2 ${i % 2 === 0 ? "text-primary" : "text-secondary"}`}>
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-mono font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
