const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins(
  [[optimizedImages, { handleImages: ['jpeg', 'png', 'webp', 'gif'] }]],
  {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: { svgoConfig: { plugins: { removeViewBox: false } } },
          },
        ],
      });

      return config;
    },
    trailingSlash: true,
  }
);
