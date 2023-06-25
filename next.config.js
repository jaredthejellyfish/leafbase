/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' va.vercel-scripts.com;
  child-src example.com;
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  connect-src vitals.vercel-insights.com;
`;

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },
  images: {
    domains: [
      "images.birdfact.com",
      "flowbite.com",
      "www.fredmiranda.com",
      "img.freepik.com",
      "www.gravatar.com",
      "petmeshop.com",
      "companieslogo.com",
      "leafly-public.s3-us-west-2.amazonaws.com",
      "s3-us-west-2.amazonaws.com",
      "images.leafly.com",
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = nextConfig;
