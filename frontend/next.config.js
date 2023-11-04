/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://127.0.0.1:8000/:path*',
        },
      ]
    },
    images: {
      formats: ['image/avif', 'image/webp'],
    },
  }
  
  module.exports = nextConfig
  