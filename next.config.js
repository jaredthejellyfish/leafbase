/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  reactStrictMode: true,
  devIndicators: {
    buildActivity: true,
  },
  images: {
    domains: [
      'companieslogo.com',
      'leafly-public.s3-us-west-2.amazonaws.com',
      's3-us-west-2.amazonaws.com',
      'images.leafly.com',
      'avatars.githubusercontent.com',
      'www.gravatar.com',
      'developers.google.com',
      'discord.com',
      'cdn.discordapp.com',
      'lh3.googleusercontent.com',
      'i.imgur.com',
      'www.google.com',
      'cloudflare-ipfs.com',
    ],
  },
};

module.exports = nextConfig;
