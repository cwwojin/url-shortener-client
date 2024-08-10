/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/create-url',
        permanent: true,
      },
      {
        source: '/api',
        destination:
          'http://url-shortener-alb-732016051.ap-northeast-2.elb.amazonaws.com',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'woojin-url-shortener.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
