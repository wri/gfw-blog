/* eslint-disable react/prop-types */
import sortBy from 'lodash/sortBy';

import {
  getPostById,
  getPostByType,
  getPostsByType,
  getCategories,
} from 'lib/api';

import HomePage from 'layouts/home';
import PostPage from 'layouts/post';
import Layout from 'layouts/layout';

import { getPublishedNotifications } from 'utils/notifications';

const MAIN_CATEGORIES = [
  'data-and-research',
  'people',
  'commodities',
  'fires',
  'climate',
  'places-to-watch',
];

export default function Index(props) {
  return (
    <Layout {...props}>
      {props?.post ? <PostPage {...props} /> : <HomePage {...props} />}
    </Layout>
  );
}

export async function getServerSideProps({ query: { p: postId } }) {
  const notifications = await getPublishedNotifications();

  if (postId) {
    try {
      const post = await getPostByType({ type: 'posts', id: postId });

      if (!post) {
        return {
          props: {
            isError: true,
            notifications: notifications || [],
          },
        };
      }

      const relatedPosts = await getPostsByType({
        type: 'posts',
        params: {
          orderby: 'date',
          exclude: postId,
          categories: post?.category_ids,
          per_page: 3,
        },
      });

      const originalPostId = post?.translations_posts.find(
        (translation) => translation?.acf?.guest_authors
      )?.id;

      const originalPost =
        originalPostId &&
        (await getPostById({
          id: originalPostId,
        }));

      const originalPostGuestAuthors = originalPost?.acf?.guest_authors || [];

      return {
        props: {
          post: post || {},
          relatedPosts: relatedPosts?.posts || [],
          metaTags: post?.yoast_head || '',
          preview: true,
          guestAuthors: originalPostGuestAuthors,
          notifications: notifications || [],
        },
      };
    } catch (err) {
      return {
        props: {
          isError: true,
          notifications: notifications || [],
        },
      };
    }
  }

  const homepage = await getPostByType({
    type: 'pages',
    slug: 'global-forest-watch-blog',
  });

  const stickyPosts = await getPostsByType({
    type: 'posts',
    params: {
      per_page: 4,
      sticky: true,
    },
  });

  const stickyPostsIds = stickyPosts?.posts?.map((s) => s.id);

  const posts = await getPostsByType({
    type: 'posts',
    params: {
      per_page: 9,
      exclude: stickyPostsIds,
    },
  });

  const categories = await getCategories({
    params: {
      per_page: 100,
    },
  });

  const filteredCategories = categories
    ?.filter((c) => MAIN_CATEGORIES.includes(c.slug))
    ?.map((c) => ({
      ...c,
      link: `/${c.slug}`,
    }));

  const sortedCategories = sortBy(filteredCategories, (cat) =>
    MAIN_CATEGORIES.indexOf(cat.slug)
  );

  return {
    props: {
      homepage: homepage || {},
      stickyPosts: stickyPosts?.posts || [],
      posts: posts?.posts || [],
      totalPages: posts?.totalPages || 1,
      categories: sortedCategories || [],
      metaTags: homepage?.yoast_head || '',
      notifications: notifications || [],
    },
  };
}
