import { config } from 'dotenv';

config();

const settings = {
  name: 'gfw-blog',
  state: {
    frontity: {
      url: 'https://blog.globalforestwatch.org',
    },
  },
  packages: [
    { name: '@gfw/blog-theme' },
    {
      name: '@frontity/wp-source',
      state: {
        source: {
          api: `${process.env.WORDPRESS_API_URL}/wp-json`,
          params: {
            per_page: 9,
            type: ['post'],
            lang: 'en',
          },
          categoryBase: 'category',
          tagBase: 'tag',
        },
      },
    },
    '@frontity/tiny-router',
    '@frontity/html2react',
    '@frontity/google-analytics',
  ],
};

export default settings;
