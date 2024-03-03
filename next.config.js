// import MillionLint from '@million/lint';

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

// export default MillionLint.next()(nextConfig);
export default nextConfig;
