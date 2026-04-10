import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.jakpost.net',
      },
      {
        protocol: 'https',
        hostname: 'citywalkjakarta.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.promediateknologi.id',
      },
      {
        protocol: 'https',
        hostname: 'geoparkjogja.jogjaprov.go.id',
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      }
    ],
  },
};

export default nextConfig;