import { config } from 'dotenv';
import { WORDPRESS_GFW_API, POSTS_PER_PAGE } from './constants';

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
    {
      name: '@frontity/mars-theme',
      state: {
        theme: {
          featured: {
            showOnList: true,
            showOnPost: true,
          },
        },
      },
    },
    {
      name: '@frontity/wp-source',
      state: {
        source: {
          api: WORDPRESS_GFW_API,
          params: {
            per_page: POSTS_PER_PAGE,
            type: ['post'],
          },
          categoryBase: 'category',
          tagBase: 'tag',
        },
      },
    },
    '@frontity/tiny-router',
    '@frontity/html2react',
    '@frontity/head-tags',
    '@frontity/google-analytics',
  ],
};

export default settings;
