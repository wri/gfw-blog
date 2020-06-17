import image from '@frontity/html2react/processors/image';
import iframe from '@frontity/html2react/processors/iframe';
import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';

import Theme from './app';

const allToolsHandler = {
  name: 'allTools',
  priority: 10,
  pattern: 'all-tools',
  func: async ({ route, state, libraries }) => {
    const { api } = libraries.source;

    // 1. fetch the data you want from the endpoint page
    const response = await api.get({
      endpoint: 'tools',
      params: {
        per_page: 100, // To make sure you get all of them
      },
    });

    // 2. get an array with each item in json format
    const items = await response.json();
    const tools = sortBy(
      items.map((c) => {
        const url = new URL(c.link);
        return {
          ...c,
          link: url?.pathname,
        };
      }),
      'menu_order'
    );

    const toolsGrouped = groupBy(tools, 'parent');

    // 3. add data to source
    const currentPageData = state.source.data[route];

    Object.assign(currentPageData, {
      tools: toolsGrouped,
    });
  },
};

const gfwHelpCenter = {
  name: '@gfw/hel-center-theme',
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
    },
    googleAnalytics: {
      trackingId: process.env.GOOGLE_ANALYTICS,
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
      beforeSSR: ({ actions }) => async () => {
        await actions.source.fetch('all-tools');
      },
    },
  },
  libraries: {
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * inside the content HTML. You can add your own processors too
       */
      processors: [image, iframe],
    },
    source: {
      handlers: [allToolsHandler],
    },
  },
};

export default gfwHelpCenter;
