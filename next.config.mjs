import NextBundleAnalyzer from '@next/bundle-analyzer';



/** @type {import('next').NextConfig} */
const withBundleAnalyzer = NextBundleAnalyzer({
  // enabled: process.env.ANALYZE === 'true',
  enabled: true,
});
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
