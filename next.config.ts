import type { NextConfig } from "next";
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'
const nextConfig: NextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Match any path starting with /api
        destination: 'http://localhost:3002/:path*', // Proxy to backend with dynamic paths
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
