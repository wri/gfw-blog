import image from '@frontity/html2react/processors/image';
import iframe from '@frontity/html2react/processors/iframe';

import Theme from './app';

import {
  stickyPostsHandler,
  allCategoriesHandler,
  topTagsHandler,
  categoryOrPostHandler,
  postsHandler,
} from './handlers';

import { gutenbergGallery, blockquote } from './processors';

const marsTheme = {
  name: '@gfw/blog-theme',
  roots: {
    theme: Theme,
  },
  state: {
    theme: {
      title: 'Global Forest Watch Blog',
      description:
        'Stay atop the latest forest research and news! The Global Forest Watch blog uses data to illuminate the state of forests worldwide and tells the stories of people dedicated to protecting them. Read about rainforests, deforestation, fires, sustainable agriculture, forest management and other topics critical to the future of forests.',
      metaTitle:
        'Forest News, Research & Monitoring | Global Forest Watch Blog',
      metaDescription:
        'Read about data-backed topics critical to the future of forests, including rainforests, deforestation, fires, sustainable agriculture, forest monitoring and management.',
      isContactUsOpen: false,
      searchIsActive: false,
      lang: 'en_US',
    },
    googleAnalytics: {
      trackingId: 'UA-48182293-1',
    },
  },
  actions: {
    theme: {
      toggleContactUsModal: ({ state }) => {
        state.theme.isContactUsOpen = !state.theme.isContactUsOpen;
      },
      setSearchOpen: ({ state }) => (open) => {
        state.theme.searchIsActive = open;
      },
      changeLanguage: ({ state }) => (value) => {
        state.theme.lang = value;
      },
      beforeSSR: ({ actions }) => async () => {
        await actions.source.fetch('all-categories');
        await actions.source.fetch('top-tags');
        await actions.source.fetch('sticky-posts');
      },
    },
  },
  libraries: {
    html2react: {
      processors: [image, iframe, gutenbergGallery, blockquote],
    },
    source: {
      handlers: [
        stickyPostsHandler,
        allCategoriesHandler,
        topTagsHandler,
        categoryOrPostHandler,
        postsHandler,
      ],
    },
  },
};

export default marsTheme;
