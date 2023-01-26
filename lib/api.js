import apiFetch from '@wordpress/api-fetch';
import axios from 'axios';
import decode from 'simple-entity-decode';
import btoa from 'btoa';

const serializeTaxonomy = (taxonomy) =>
  taxonomy?.map((tax) => {
    const url = tax?.link && new URL(tax.link);

    return {
      ...tax,
      link: url?.pathname,
    };
  });

const serializePosts = (posts) =>
  posts?.map((p = {}) => {
    const url = p?.link && new URL(p?.link);

    return {
      ...p,
      ...(p?.title && {
        title: decode(p.title?.rendered),
      }),
      ...(p?.excerpt && {
        excerpt: decode(p.excerpt?.rendered),
      }),
      ...(p?.content && {
        content: decode(p.content?.rendered),
      }),
      ...(p.featured_media && {
        featured_media_id: p.featured_media,
        featured_media: p._embedded?.['wp:featuredmedia']?.[0],
      }),
      ...((p.categories && {
        category_ids: p.categories,
        categories: serializeTaxonomy(p._embedded?.['wp:term']?.[0]),
      }) ||
        null),
      ...((p.tags && {
        tag_ids: p.tags,
        tags: serializeTaxonomy(p._embedded?.['wp:term']?.[1]),
      }) ||
        null),
      ...(p?.link && {
        link: url?.pathname,
      }),
      ...(p?.acf?.alt_link && {
        extLink: p.acf.alt_link,
      }),
      ...(p?.acf?.post_link && {
        extLink: p.acf.post_link,
      }),
      ...(p?.translations_posts && {
        translations_posts: p.translations_posts?.map((t) => {
          const tUrl = t?.link && new URL(t?.link);

          return {
            ...t,
            link: tUrl?.pathname,
            ...(t?.acf?.alt_link && {
              extLink: t.acf.alt_link,
            }),
            ...(t?.acf?.post_link && {
              extLink: t.acf.post_link,
            }),
          };
        }),
      }),
    };
  });

apiFetch.setFetchHandler(async (options) => {
  const headers = { 'Content-Type': 'application/json' };

  if (process.env.NEXT_PUBLIC_AUTH_USER && process.env.NEXT_PUBLIC_AUTH_TOKEN) {
    const userPassword = btoa(
      `${process.env.NEXT_PUBLIC_AUTH_USER}:${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
    );
    headers.Authorization = `Basic ${userPassword}`;
  }

  const { url, path, data, method, params } = options;

  return axios({
    headers,
    url: url || path,
    method,
    data,
    params,
  });
});

export async function getPostsByType({
  type,
  params,
  cancelToken,
  allLanguages,
} = {}) {
  const postsResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/${type || 'posts'}`,
    params: {
      ...params,
      _embed: true,
      ...(!allLanguages && {
        lang: 'en',
      }),
    },
    cancelToken,
  });

  return {
    page: params?.page || 1,
    posts: serializePosts(postsResponse?.data),
    total: parseInt(postsResponse.headers['x-wp-total'], 10),
    totalPages: parseInt(postsResponse.headers['x-wp-totalpages'], 10),
  };
}

export async function getPostByType({
  type,
  slug,
  id,
  params,
  cancelToken,
} = {}) {
  const postResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/${type || 'posts'}${
      id ? `/${id}` : ''
    }`,
    params: {
      ...params,
      slug,
      _embed: true,
    },
    cancelToken,
  });

  const post = Array.isArray(postResponse?.data)
    ? postResponse?.data
    : [postResponse?.data];

  return serializePosts(post)[0];
}

export async function getAllPostsByType({ type, params } = {}) {
  const postsResponse = await getPostsByType({
    type,
    params: { per_page: 50, ...params },
  });
  const { totalPages } = postsResponse || {};
  const pages = await Promise.all(
    Array.from(Array(totalPages).keys()).map((page) =>
      getPostsByType({
        params: { per_page: 50, page: page + 1 },
        allLanguages: true,
      })
    )
  );
  const allPosts = pages.reduce((arr, next) => [...arr, ...next?.posts], []);

  return allPosts;
}

export async function getCategories({ params } = {}) {
  const categoriesResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/categories`,
    params: {
      ...params,
      _embed: true,
    },
  });

  return serializeTaxonomy(categoriesResponse?.data);
}

export async function getCategoryBySlug({ slug, params } = {}) {
  const categoriesResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/categories`,
    params: {
      ...params,
      slug,
      _embed: true,
    },
  });

  return serializeTaxonomy(categoriesResponse?.data)[0];
}

export async function getTags({ params } = {}) {
  const tagsResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/tags`,
    params: {
      ...params,
      _embed: true,
    },
  });

  return serializeTaxonomy(tagsResponse?.data, 'tag');
}

export async function getTagBySlug({ slug, params }) {
  const tagResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/tags`,
    params: {
      ...params,
      slug,
      _embed: true,
    },
  });

  return serializeTaxonomy(tagResponse?.data, 'tag')[0];
}

export async function getPostById({ id } = {}) {
  const postResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/posts/${id}`,
  });

  const post = Array.isArray(postResponse?.data)
    ? postResponse?.data
    : [postResponse?.data];

  return serializePosts(post)[0];
}
