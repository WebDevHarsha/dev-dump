import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['s3.amazonaws.com', 'images.unsplash.com', 'cdn.discordapp.com', 'd112y698adiu2z.cloudfront.net'],
    // allow fetching images from S3 and cloudfront with querystrings/paths
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
