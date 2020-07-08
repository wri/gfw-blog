import { config } from 'dotenv';

config();

const settings = {
  name: 'gfw-blog',
  state: {
    frontity: {
      url: 'https://blog.globalforestwatch.org',
      title: 'Blog | Global Forest Watch',
      description:
        'Stay atop the latest forest research and news! The Global Forest Watch blog uses data to illuminate the state of forests worldwide and tells the stories of people dedicated to protecting them. Read about rainforests, deforestation, fires, sustainable agriculture, forest management and other topics critical to the future of forests.',
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
