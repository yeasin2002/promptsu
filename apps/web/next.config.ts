import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: 'images.unsplash.com' }, { hostname: 'raw.githubusercontent.com' }],
  },
};

export default nextConfig;
