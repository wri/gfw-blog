import sortBy from 'lodash/sortBy';
import axios from 'axios';
import { parse } from 'query-string';
import btoa from 'btoa';

import { fetchPostTypeData } from './helpers/request';

const MAIN_CATEGORIES = [
  'data-and-research',
  'people',
  'commodities',
  'fires',
  'climate',
  'places-to-watch',
  'uncategorized',
];

const userPassword = btoa(
  `${process.env.NEXT_PUBLIC_AUTH_USER}:${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
);

export const stickyPostsHandler = {
  priority: 10,
  pattern: 'sticky-posts',
  func: async ({ route, state, libraries }) => {
    const { api } = libraries.source;
    // 1. fetch the posts you want
    const response = await api.get({
      endpoint: 'posts',
      params: {
        sticky: true,
        lang: 'en',
      },
    });

    // 2. populate response
    const stickyPosts = await response.json();

    // 3. add data to source
    const currentPageData = state.source.data[route];

    Object.assign(currentPageData, {
      stickyPosts: stickyPosts.map((post) => ({
        ...post,
      })),
    });
  },
};

export const allCategoriesHandler = {
  name: 'allCategories',
  priority: 10,
  pattern: 'all-categories',
  func: async ({ route, state, libraries }) => {
    const { api } = libraries.source;

    // 1. fetch the data you want from the endpoint page
    const response = await api.get({
      endpoint: 'categories',
      params: {
        per_page: 100, // To make sure you get all of them
      },
    });

    // 2. get an array with each item in json format
    const items = await response.json();
    const categories = items
      .filter((c) => MAIN_CATEGORIES.includes(c.slug))
      .map((c) => ({
        ...c,
        link: `/${c.slug}`,
      }));
    const sortedCategories = sortBy(categories, (cat) =>
      MAIN_CATEGORIES.indexOf(cat.slug)
    );
    // 3. add data to source
    const currentPageData = state.source.data[route];

    Object.assign(currentPageData, {
      categories: sortedCategories,
    });
  },
};

export const topTagsHandler = {
  name: 'topTags',
  priority: 1,
  pattern: 'top-tags',
  func: async ({ route, state, libraries }) => {
    const { api } = libraries.source;

    // 1. fetch the data you want from the endpoint page
    const response = await api.get({
      endpoint: 'tags',
      params: {
        per_page: 100, // To make sure you get all of them
        orderby: 'count',
        order: 'desc',
      },
    });

    // 2. get an array with each item in json format
    const items = await response.json();

    const tags = items.map((tag) => ({
      ...tag,
      link: `/tag/${tag.slug}`,
    }));
    // 3. add data to source
    const currentPageData = state.source.data[route];

    Object.assign(currentPageData, {
      tags,
    });
  },
};

export const categoryOrPostHandler = {
  name: 'categoryOrPostType',
  priority: 30,
  pattern: '/(.*)?/:slug',
  func: async ({ route, params, state, libraries, link }) => {
    // 1. try with category.
    try {
      const category = libraries.source.handlers.find(
        (handler) => handler.name === 'category'
      );
      const stateWithParams = {
        ...state,
        source: {
          ...state.source,
          params: {
            ...state.source.params,
            lang: 'en',
          },
        },
      };

      await category.func({
        link,
        route,
        params,
        state: stateWithParams,
        libraries,
      });
    } catch (e) {
      // It's not a category
      const postType = libraries.source.handlers.find(
        (handler) => handler.name === 'post type'
      );

      try {
        // 1. fetch the data you want from the endpoint page
        await postType.func({
          link,
          route,
          params,
          state,
          libraries,
          force: true,
        });
      } catch (err) {
        const regexLink = link.replace(/.$/, '');

        const checkRedirection = await axios.get(
          `${process.env.WORDPRESS_API_URL}/wp-json/redirection/v1/redirect?filterBy[url]=${regexLink}`,
          {
            headers: {
              Authorization: `Basic ${userPassword}`,
            },
          }
        );

        const currentPageData = state.source.data[route];

        const { action_data: actionData } =
          checkRedirection?.data?.items?.[0] || {};
        const redirection = actionData?.url;

        Object.assign(currentPageData, {
          redirection,
          is404: !redirection,
        });
      }
    }
  },
};

export const postsHandler = {
  name: 'postsHandler',
  priority: 19,
  pattern: '/',
  func: async ({ route, params, state, libraries, link }) => {
    const query = route.includes('/?p=') ? parse(route) : {};
    const { '/?p': postId } = query;

    if (postId) {
      const [post] = await fetchPostTypeData({
        baseUrl: `${process.env.WORDPRESS_API_URL}/wp-json`,
        type: 'posts',
        id: postId,
        authToken: userPassword,
      });

      const currentPageData = state.source.data[route];

      Object.assign(currentPageData, {
        post,
        isPreview: true,
      });
    } else {
      const stateWithParams = !link.includes('?s=')
        ? {
            ...state,
            source: {
              ...state.source,
              params: {
                ...state.source.params,
                lang: 'en',
              },
            },
          }
        : state;

      try {
        const posts = libraries.source.handlers.find(
          (handler) => handler.name === 'post archive'
        );
        await posts.func({
          link,
          route,
          params,
          state: stateWithParams,
          libraries,
        });
      } catch (err) {
        console.error(err);
      }
    }
  },
};

export default {
  stickyPostsHandler,
  allCategoriesHandler,
  topTagsHandler,
  categoryOrPostHandler,
  postsHandler,
};
