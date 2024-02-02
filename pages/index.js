/* eslint-disable react/prop-types */
import sortBy from 'lodash/sortBy';

import { getPostById, getPostByType, getPostsByType } from 'lib/api';

import HomePage from 'layouts/home';
import PostPage from 'layouts/post';
import Layout from 'layouts/layout';

import { getPublishedNotifications } from 'utils/notifications';

import { MAIN_CATEGORIES } from '../utils/constants';

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

  const sortedCategories = sortBy(MAIN_CATEGORIES, (cat) =>
    MAIN_CATEGORIES.indexOf(cat.slug)
  );

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
