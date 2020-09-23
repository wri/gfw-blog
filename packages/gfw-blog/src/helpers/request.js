import { get } from 'axios';
import { stringify } from 'query-string';
import flatMap from 'lodash/flatMap';
import uniq from 'lodash/uniq';
import compact from 'lodash/compact';

// eslint-disable-next-line import/prefer-default-export
export const fetchPostTypeData = async ({
  baseUrl,
  type,
  id,
  params,
  cancelToken,
  authToken,
}) => {
  const { data } = await get(
    `${baseUrl}/wp/v2/${type}${id ? `/${id}` : ''}${
      params ? `?${stringify(params)}` : ''
    }`,
    {
      cancelToken,
      ...(authToken && {
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      }),
    }
  );

  let posts = data;
  let media = null;
  let categories = null;
  let tags = null;

  if (!Array.isArray(posts)) {
    posts = [posts];
  }

  const featuredMedia = compact(posts.map((post) => post.featured_media));
  if (featuredMedia && featuredMedia.length) {
    const mediaResponse = await get(
      `${baseUrl}/wp/v2/media?include=${featuredMedia.join(',')}`,
      { cancelToken }
    );
    media = mediaResponse.data;
  }

  const catIds =
    posts && compact(uniq(flatMap(posts.map((post) => post?.categories))));
  if (catIds && catIds.length) {
    const categoriesResponse = await get(
      `${baseUrl}/wp/v2/categories?include=${catIds.join(',')}`,
      { cancelToken }
    );
    categories = categoriesResponse?.data?.map((cat) => {
      const url = new URL(cat.link);

      return {
        ...cat,
        link: url.pathname,
      };
    });
  }

  const tagIds =
    posts && compact(uniq(flatMap(posts.map((post) => post?.tags))));
  if (tagIds && tagIds.length) {
    const tagsResponse = await get(
      `${baseUrl}/wp/v2/tags?include=${tagIds.join(',')}`,
      { cancelToken }
    );
    tags = tagsResponse?.data?.map((tag) => {
      const url = new URL(tag.link);

      return {
        ...tag,
        link: url.pathname,
      };
    });
  }

  return posts.map((post) => {
    const url = new URL(post.link);

    return {
      ...post,
      ...(media && {
        featured_media: media.find((m) => m.id === post.featured_media),
      }),
      ...(categories && {
        categories: categories.filter((cat) =>
          post.categories.includes(cat.id)
        ),
      }),
      ...(tags && {
        tags: tags.filter((cat) => post.tags.includes(cat.id)),
      }),
      link: url.pathname,
    };
  });
};
