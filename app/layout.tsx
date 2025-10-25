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
  icons: {
    icon: "/devdump.png",
    apple: "/devdump.png",
  },
  openGraph: {
    title: "Dev Dump",
    description: "Because scrolling five sites is overrated.",
    images: [
      {
        url: "/devdump.png",
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
    images: ["/devdump.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics></Analytics>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
