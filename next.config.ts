import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/edson-veiculos",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: "/edson-veiculos",
  },
};

export default nextConfig;
