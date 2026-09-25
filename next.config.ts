import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: let the dev server accept requests from 127.0.0.1 / LAN, not just "localhost".
  allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.*.*"],
};

export default nextConfig;
