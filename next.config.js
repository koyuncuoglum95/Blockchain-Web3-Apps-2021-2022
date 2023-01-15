/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com','gateway.ipfscdn.io','assets.vercel.com'],
    formats: ['image/avif', 'image/webp'],
  }
}

module.exports = nextConfig
