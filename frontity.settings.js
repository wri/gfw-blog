import { config } from 'dotenv';
import { WORDPRESS_GFW_API, POSTS_PER_PAGE } from './constants';

config();

const settings = [
  {
    name: 'gfw-blog',
    match: ['https://blog.globalforestwatch.org', 'localhost:3000'],
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
        name: '@gfw/blog-theme',
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
            tagBase: 'tag'
          },
        },
      },
      '@frontity/tiny-router',
      '@frontity/html2react',
      '@frontity/google-analytics',
      '@frontity/head-tags',
    ]
  },
  {
    name: 'gfw-help-center',
    match: ['https://www.globalforestwatch.org/help-center', 'localhost:3001'],
    state: {
      frontity: {
        url: 'https://www.globalforestwatch.org/help-center',
        title: 'Help Center | Global Forest Watch',
        description:
          'Learn how to better manage, protect and restore forest landscapes. The Global Forest Watch help center offers resources to help guide you through its forest monitoring data, technology and tools.',
      },
    },
    packages: [
      {
        name: '@gfw/help-center-theme',
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
            postEndpoint: 'tools',
            postTypes: [
              {
                type: "tools", // type slug
                endpoint: "tools", // REST API endpoint
                archive: "/tools" // link where this custom posts are listed
              }
            ],
          },
        },
      },
      '@frontity/tiny-router',
      '@frontity/html2react',
      '@frontity/google-analytics',
      '@frontity/head-tags',
    ]
  }
];

export default settings;
