import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: let the dev server accept requests from 127.0.0.1 / LAN, not just "localhost".
  allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.*.*"],
  // The homepage and /lifecycle are the Claude Design redesign: self-contained
  // static pages in public/redesign. beforeFiles so they win over src/app/page.tsx.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/redesign/index.html" },
        { source: "/lifecycle", destination: "/redesign/lifecycle.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
