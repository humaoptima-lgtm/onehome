import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@onehome/ui"],
  outputFileTracingRoot: require("path").join(__dirname, "../../"),
};

export default nextConfig;
