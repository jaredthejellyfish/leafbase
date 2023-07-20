/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
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
    ],
  },
};

module.exports = withBundleAnalyzer({
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
      'cannabisbcn.com',
    ],
  },
});
