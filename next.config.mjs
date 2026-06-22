/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/shared/config/i18n/request.ts');

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
    config.module.rules.push(
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: /react/,
        use: ['@svgr/webpack'],
      },
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: { not: [/react/] },
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};

export default withNextIntl(nextConfig);
