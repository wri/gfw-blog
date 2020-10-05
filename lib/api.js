import apiFetch from '@wordpress/api-fetch';
import axios from 'axios';
import decode from 'simple-entity-decode';
import btoa from 'btoa';

const serializePosts = (posts) =>
  posts.map((p) => {
    const url = new URL(p.link);

    return {
      ...p,
      title: decode(p.title?.rendered),
      excerpt: decode(p.excerpt?.rendered),
      ...(p.featured_media && {
        featured_media_id: p.featured_media,
        featured_media: p._embedded?.['wp:featuredmedia']?.[0],
      }),
      ...(p.categories && {
        category_ids: p.categories,
        categories: p._embedded?.['wp:term']?.[0],
      }),
      link: url?.pathname,
    };
  });

const serializeTaxonomy = (taxonomy, type) =>
  taxonomy.map((tax) => ({
    ...tax,
    link: `/${type}/${tax.slug}`,
  }));

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

export async function getPostsByType({ type, params, cancelToken } = {}) {
  const postsResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/${type || 'posts'}`,
    params: {
      ...params,
      _embed: true,
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
