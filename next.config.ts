import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['s3.amazonaws.com', 'images.unsplash.com', 'cdn.discordapp.com', 'd112y698adiu2z.cloudfront.net'],
  },
};

export default nextConfig;
