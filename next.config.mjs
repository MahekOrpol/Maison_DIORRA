/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.1.5', // for Local testing
        pathname: '/images/**'
      },
      {
        protocol: 'https',
        hostname: 'dev.cloudbusiness.cloud', // live backend
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
