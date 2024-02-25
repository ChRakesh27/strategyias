/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },

  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "trulyias-image-storage.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
