import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Turbopack minification emits invalid octal escapes in Cesium's embedded WASM.
    turbopackMinify: false,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home', // The page to redirect to
        permanent: true, // true = 308 permanent redirect, false = 307 temporary
      },
    ]
  },
   images: {
    remotePatterns: process.env.IMAGE_UPLOAD_BASE_PATH ? [new URL(process.env.IMAGE_UPLOAD_BASE_PATH + '/images/**')] : [],
  },
}


export default nextConfig;
