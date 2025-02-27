import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'brooklinelabrescue.org',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 's3-media0.fl.yelpcdn.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.milofoundation.org',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.dbw3zep4prcju.cloudfront.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.animalhumanesociety.org',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'pngimg.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
