/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.redd.it' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'preview.redd.it' },
      { protocol: 'https', hostname: 'external-preview.redd.it' },
      { protocol: 'https', hostname: 'b.thumbs.redditmedia.com' },
      { protocol: 'https', hostname: 'a.thumbs.redditmedia.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // keep static where possible, ISR for the dynamic feed
  },
};

export default nextConfig;
