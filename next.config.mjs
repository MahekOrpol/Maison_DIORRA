/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/images/**'
      },
      {
        protocol: 'https',
        hostname: 'dev.cloudbusiness.cloud', // for LAN testing
        pathname: '/images/**'
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'your-cdn.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
