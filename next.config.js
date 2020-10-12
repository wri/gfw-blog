const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const fetch = require('node-fetch');
const btoa = require('btoa');

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
    async redirects() {
      const userPassword = btoa(
        `${process.env.NEXT_PUBLIC_AUTH_USER}:${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
      );
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/redirection/v1/redirect?per_page=200&filterBy[status]=enabled`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${userPassword}`,
          },
        }
      );
      const json = await response.json();

      return json.items.map((r) => ({
        source: `${r.url}/`,
        destination: `${r.action_data.url}/`,
        permanent: true,
      }));
    },
  }
);
