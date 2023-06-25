/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
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
      "avatars.githubusercontent.com"
    ],
  },
};

module.exports = nextConfig;
