/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "companieslogo.com",
      "leafly-public.s3-us-west-2.amazonaws.com",
      "s3-us-west-2.amazonaws.com",
      "images.leafly.com",
      "avatars.githubusercontent.com",
      "www.gravatar.com",
      "developers.google.com",
      "discord.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
