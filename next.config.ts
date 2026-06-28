import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "edmontonsquashclub.ca",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/shop/:path*",
        destination: "https://edmontonsquashclub.ca/shop/",
        permanent: true,
      },
      {
        source: "/cart/:path*",
        destination: "https://edmontonsquashclub.ca/cart/",
        permanent: true,
      },
      {
        source: "/checkout/:path*",
        destination: "https://edmontonsquashclub.ca/checkout/",
        permanent: true,
      },
      {
        source: "/my-account/:path*",
        destination: "https://edmontonsquashclub.ca/my-account/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
