import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/edson-veiculos",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
