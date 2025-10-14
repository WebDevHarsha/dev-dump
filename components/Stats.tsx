import React from "react"
import Image from 'next/image'

export default function Stats() {
  

  return (
    <>
      

      {/* Dumpy thank-you section restyled to match the site's sticker theme */}
      <section className="py-12 bg-background text-foreground border-t-2 border-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* sticker-like heading */}
            <div className="flex items-center justify-center gap-4 mb-6" aria-hidden>
              <div className="px-6 py-3 bg-red-700 text-white font-extrabold text-3xl transform -rotate-3 shadow-sticker border-4 border-black">THANK</div>
              <div className="px-5 py-2 bg-yellow-300 text-black font-extrabold text-2xl transform rotate-2 shadow-sticker border-4 border-black">YOU</div>
              <div className="px-8 py-4 bg-black text-white font-extrabold text-4xl transform -rotate-1 shadow-sticker border-4 border-black">DUMPY</div>
            </div>

            {/* two-column layout: image left, text + CTA right on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <div className="bg-white rounded-md p-6 shadow-md border border-foreground/10">
                  <Image src="/dumpy1.png" alt="dumpy" width={384} height={256} className="rounded-md" />
                </div>
              </div>

              <div className="text-left flex flex-col items-center md:items-start justify-center">
                <p className="font-mono text-lg md:text-xl text-foreground/90 mb-6">
                  Dumpy works tirelessly, crawling through pages at all hours to keep our data fresh. It doesn&apos;t sleep — it just keeps going.
                  Its little crawler heart runs on data and, occasionally, coffee.
                </p>

                <a
                  href="https://www.buymeacoffee.com/devharsha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-700 hover:bg-red-800 text-white font-bold tracking-wider px-6 py-3 rounded-sm border-4 border-black shadow-lg transform hover:-translate-y-0.5 transition"
                >
                  <Image src="/bmc.png" alt="bmc" width={24} height={24} className="inline-block mr-3 object-contain" />
                  <span className="uppercase">Buy Dumpy a coffee</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
