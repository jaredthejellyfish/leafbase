/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.birdfact.com",
      "flowbite.com",
      "www.fredmiranda.com",
      "img.freepik.com",
      "www.gravatar.com",
      "petmeshop.com"
    ],
  },
};

module.exports = nextConfig;
