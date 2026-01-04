/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for development
  reactStrictMode: true,

  // TypeScript configuration
  typescript: {
    // Set to false if you want to allow TypeScript errors during build
    tsconfigPath: './tsconfig.json',
  },

  // Compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Image optimization
  images: {
    remotePatterns: [
      // Add your remote image sources here
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      // },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // Internationalization (optional)
  // i18n: {
  //   locales: ['en', 'es', 'fr'],
  //   defaultLocale: 'en',
  // },

  // Headers configuration
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Environment variables
  env: {
    // Add environment variables here
  },

  // Webpack configuration (if needed)
  webpack: (config, { isServer }) => {
    // Customize webpack config here
    return config;
  },

  // Redirects (optional)
  async redirects() {
    return [];
  },

  // Rewrites (optional)
  async rewrites() {
    return {
      beforeFiles: [
        // Add rewrites here
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  // Experimental features for Next.js 14
  experimental: {
    // Enable App Router if not already enabled
    // appDir: true,
  },

  // Production source maps (optional - set to false to reduce bundle size)
  productionBrowserSourceMaps: false,

  // SWC minification (enabled by default in Next.js 14)
  swcMinify: true,

  // PoweredBy header (security - disables Next.js powered by header)
  poweredByHeader: false,

  // Enable compression
  compress: true,

  // Generate ETags for responses
  generateEtags: true,
};

module.exports = nextConfig;
