// This file is not going through babel transformation.
// So, we write it in vanilla JS.
// (But you could use ES2015 features supported by your Node.js version)

/* eslint-disable global-require */
const { IgnorePlugin } = require('webpack');

require('dotenv').config();

const initExport = {
  webpack: (config, { dev }) => {
    const prod = !dev;

    config.plugins.push(new IgnorePlugin(/^\.\/locale$/, /moment$/));

    if (dev) {
      config.module.rules.push({
        test: /\.(jsx?|gql|graphql)$/,
        loader: 'eslint-loader',
        exclude: ['/node_modules/', '/.next/', '/helper_scripts/'],
        enforce: 'pre',
      });
    }

    if (process.env.ANALYZE_BUILD) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true,
        })
      );
    }

    return config;
  },
};

/* eslint-enable global-require */
module.exports = initExport;
