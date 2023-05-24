/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      // Required:
      appDir: true
    }
    // output: 'export',
  }
  
  module.exports = nextConfig
  