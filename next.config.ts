import type { NextConfig } from "next";
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  reactStrictMode: false,
  output: "standalone",
  async rewrites() {
    const proxyUrl = process.env.NODE_ENV === 'production' ? process.env.BACKEND_URL! : 'http://localhost:3002';
    return [
      {
        source: '/api/:path*', // Match any path starting with /api
        destination: `${proxyUrl}/:path*`, // Proxy to backend with dynamic paths
      },
    ];
  },
  /* config options here */
  webpack(config, { isServer }) {
    if (!isServer) {
      // Monaco Editor requires Web Workers to be configured
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
        process: false,
      }

      // Use MonacoEditorWebpackPlugin to properly bundle Monaco and its workers
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ['javascript', 'typescript'], // List of languages you want to support
          features: ['!gotoSymbol', '!rename', '!suggest'] // Optional: Disable certain features
        })
      )
    }

    return config
  },
};


export default nextConfig;
