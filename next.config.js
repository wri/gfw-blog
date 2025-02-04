const fetch = require('node-fetch');
const btoa = require('btoa');

const redirects = require('./redirects.json');

module.exports = {
  basePath: '/blog',
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
    const fetchConfig = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${userPassword}`,
      },
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/redirection/v1/redirect?per_page=5&filterBy[status]=enabled`,
      fetchConfig
    );
    const json = await response.json();
    const totalPages = Math.ceil(parseInt(json.total, 10) / 50);
    const redirectPages = await Promise.all(
      Array.from(Array(totalPages).keys()).map((i) =>
        fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/redirection/v1/redirect?filterBy[status]=enabled&page=${i}&per_page=50`,
          fetchConfig
        )
      )
    );
    const allWordpressResponses = await Promise.all(
      redirectPages.map((res) => res.json())
    );

    const allWordpressRedirects = allWordpressResponses.reduce(
      (arr, res) => [...arr, ...res.items],
      []
    );

    const formattedRedirects = allWordpressRedirects.map((r) => ({
      source: `${r.url}${!r.url.endsWith('/') ? '/' : ''}`,
      destination: `${r.action_data.url}${
        !r.action_data.url.endsWith('/') ? '/' : ''
      }`,
      permanent: true,
    }));

    return [...formattedRedirects, ...redirects];
  },
};
