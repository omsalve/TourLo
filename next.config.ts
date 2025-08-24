import type { NextConfig } from "next";
import { join } from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Force Next.js to treat this folder as the root
  outputFileTracingRoot: __dirname, // __dirname resolves to my-app
};

export default nextConfig;
