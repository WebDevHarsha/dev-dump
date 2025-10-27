import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Dump - All hackathons in one place",
  description: "Because scrolling five sites is overrated.",
  applicationName: "Dev Dump",
  keywords: [
    'hackathons',
    'hackathon list',
    'hackathon events',
    'coding competitions',
    'developer events',
    'online hackathons',
    'in-person hackathons',
    'open source',
  ],
  icons: {
    icon: "/devdump.png",
    apple: "/devdump.png",
  },
  // themeColor moved to viewport export below (Next.js expects themeColor in viewport)
  authors: [{ name: 'Dev Dump' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Dev Dump",
    description: "Because scrolling five sites is overrated.",
    images: [
      {
        url: "https://devdump.vasriharsha.app/devdump.png",
        width: 1200,
        height: 630,
        alt: "Dev Dump",
      },
    ],
    siteName: "Dev Dump",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Dump",
    description: "Because scrolling five sites is overrated.",
    images: ["https://devdump.vasriharsha.app/devdump.png"],
  },
};

// NOTE: metadataBase export removed because this Next.js version's build types
// complain about unexpected exports. We instead use absolute URLs directly
// in the metadata and canonical tags below.

// Viewport + themeColor export (Next.js App Router expects themeColor in viewport)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1220' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Dev Dump",
    "description": "Because scrolling five sites is overrated.",
    "url": "https://devdump.vasriharsha.app/",
    "publisher": {
      "@type": "Organization",
      "name": "Dev Dump",
      "logo": {
        "@type": "ImageObject",
        "url": "https://devdump.vasriharsha.app/devdump.png"
      }
    }
  }
  return (
    <html lang="en">
      <head>
        {/* canonical */}
        <link rel="canonical" href="https://devdump.vasriharsha.app/" />
        {/* explicit favicon (helps override default next/host icons) */}
        <link rel="icon" href="/devdump.png" sizes="32x32" type="image/png" />
        <link rel="shortcut icon" href="/devdump.png" />
        <link rel="apple-touch-icon" href="/devdump.png" />
        <meta name="keywords" content="hackathons, hackathon list, hackathon events, coding competitions, developer events" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <Analytics></Analytics>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
