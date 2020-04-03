import { WORDPRESS_GFW_API } from './constants';

const settings = {
  name: 'gfw-blog',
  state: {
    frontity: {
      url: 'https://blog.globalforestwatch.org',
      title: 'Global Forest Watch Blog',
      description:
        'The GFW blog catalyzes conversations around improved forest management by providing timely, credible analysis on threats to global forests.',
    },
  },
  packages: [
    {
      name: '@frontity/mars-theme',
      state: {
        theme: {
          featured: {
            showOnList: false,
            showOnPost: false,
          },
        },
      },
    },
    {
      name: '@frontity/wp-source',
      state: {
        source: {
          api: WORDPRESS_GFW_API,
        },
      },
    },
    '@frontity/tiny-router',
    '@frontity/html2react',
  ],
};

export default settings;
