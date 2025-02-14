import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  },
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: "./empty-module.js",
      },
    },
  },
  swcMinify: false,
};

export default withNextIntl(nextConfig);
