/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

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

module.exports = withBundleAnalyzer({
  ...nextConfig,
});

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,

    org: 'gerard-a-hernandez',
    project: 'javascript-nextjs',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
);
