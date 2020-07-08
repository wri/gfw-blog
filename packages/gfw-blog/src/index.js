import image from '@frontity/html2react/processors/image';
import iframe from '@frontity/html2react/processors/iframe';
import { Carousel } from 'gfw-components';

import Blockquote from './components/blockquote';
import Theme from './app';

import {
  stickyPostsHandler,
  allCategoriesHandler,
  topTagsHandler,
  categoryOrPostHandler,
  postsHandler,
} from './handlers';

const gutenbergGallery = {
  test: ({ component, props }) =>
    component === 'ul' && props.className === 'blocks-gallery-grid',
  processor: () => {
    return {
      component: Carousel,
      props: {
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          lazyLoad: false,
          infinite: true,
          focusOnSelect: true,
        },
      },
    };
  },
};

const blockquote = {
  test: ({ component }) => component === 'blockquote',
  processor: () => {
    return {
      component: Blockquote,
    };
  },
};

const marsTheme = {
  name: '@gfw/blog-theme',
  roots: {
    /**
     *  In Frontity, any package can add React components to the site.
     *  We use roots for that, scoped to the `theme` namespace.
     */
    theme: Theme,
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      isContactUsOpen: false,
      featured: {
        showOnList: false,
        showOnPost: true,
      },
      searchIsActive: false,
      searchQuery: '',
      tags: [],
      categories: [],
      lang: 'en_US',
    },
    googleAnalytics: {
      trackingId: 'UA-48182293-1',
    },
  },
  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      toggleContactUsModal: ({ state }) => {
        state.theme.isContactUsOpen = !state.theme.isContactUsOpen;
      },
      setSearchOpen: ({ state }) => (open) => {
        state.theme.searchIsActive = open;
      },
      setSearchQuery: ({ state }) => (value) => {
        state.theme.searchQuery = value;
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
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * inside the content HTML. You can add your own processors too
       */
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
