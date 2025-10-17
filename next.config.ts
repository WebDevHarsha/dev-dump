import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['s3.amazonaws.com', 'images.unsplash.com', 'cdn.discordapp.com'],
  },
};

export default nextConfig;
