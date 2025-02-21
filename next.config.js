module.exports = {
    reactStrictMode: true,
    images: {
      domains: ['your-supabase-bucket.com'], // If using Supabase storage for images
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: '/api/:path*', // Proxy for API routes
        },
      ];
    },
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            { key: 'X-Frame-Options', value: 'DENY' }, // Security header
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-XSS-Protection', value: '1; mode=block' },
          ],
        },
      ];
    },
  };