/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' vitals.vercel-insights.com;
  img-src 'self' companieslogo.com leafly-public.s3-us-west-2.amazonaws.com s3-us-west-2.amazonaws.com images.leafly.com avatars.githubusercontent.com www.gravatar.com developers.google.com discord.com lh3.googleusercontent.com;
  connect-src 'self' vitals.vercel-insights.com;
`;

async function headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
        },
      ],
    },
  ];
}

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
  headers,
};

module.exports = nextConfig;
