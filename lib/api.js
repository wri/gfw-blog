import apiFetch from '@wordpress/api-fetch';
import axios from 'axios';
import decode from 'simple-entity-decode';
import btoa from 'btoa';

const serializePosts = (posts) =>
  posts.map((p) => {
    return {
      ...p,
      title: decode(p.title?.rendered),
      ...(p.featured_media && {
        featured_media_id: p.featured_media,
        featured_media: p._embedded?.['wp:featuredmedia']?.[0],
      }),
      ...(p.help_tags && {
        tag_ids: p.help_tags,
        tags: p._embedded?.['wp:term']?.[0]?.map((tag) => ({
          ...tag,
          link: `/tag/${tag.slug}`,
        })),
      }),
      ...(p.help_tools && {
        tool_ids: p.help_tools,
        tools: p._embedded?.['wp:term']?.[1]?.map((tool) => ({
          ...tool,
          link: `/${tool.slug}`,
        })),
      }),
      ...(p.categories && {
        category_ids: p.categories,
        categories: p._embedded?.['wp:term']?.[0],
      }),
    };
  });

const serializeTaxonomy = (taxonomy) =>
  taxonomy.map((tax) => ({
    ...tax,
    link: `/tag/${tax.slug}`,
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

  return serializePosts(postsResponse?.data);
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

export async function getTags({ params } = {}) {
  const tagsResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/help_tags`,
    params: {
      ...params,
      _embed: true,
    },
  });

  return serializeTaxonomy(tagsResponse?.data);
}

export async function getTagBySlug({ slug, params }) {
  const tagResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/help_tags`,
    params: {
      ...params,
      slug,
      _embed: true,
    },
  });

  return serializeTaxonomy(tagResponse?.data)[0];
}
