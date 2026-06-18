/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
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
        resourceQuery: { not: [/react/] }
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};

export default nextConfig;
