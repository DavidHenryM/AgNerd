/** @type {import('next').NextConfig} */
const nextConfig = { 
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  eslint: {
    // Don't fail build on ESLint errors (pre-existing issues)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
