/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    typedRoutes: true,
    ppr: true,
  },
  reactStrictMode: true,
  devIndicators: {
    buildActivity: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'euwnyenhzhztqztezjdn.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
};

module.exports = nextConfig;
