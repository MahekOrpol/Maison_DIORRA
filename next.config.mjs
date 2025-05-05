/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Catch potential bugs early
  images: {
    domains: [
      'picsum.photos', // example: for demo images
      'res.cloudinary.com', // add your image CDN or asset host
      'your-cdn.com',
      'randomuser.me',
      'cdn.shopify.com'
    ]
  }
};
export default nextConfig;
