
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true, // Enable Server Actions feature
  },  
  images: { unoptimized: true }
};

module.exports = nextConfig;