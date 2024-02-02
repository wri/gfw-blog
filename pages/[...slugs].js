/* eslint-disable react/prop-types */
import sortBy from 'lodash/sortBy';

import {
  getPostById,
  getPostByType,
  getPostsByType,
  getCategories,
  getAllPostsByType,
  getRedirectionData,
} from 'lib/api';

import ArchivePage from 'layouts/archive';
import PostPage from 'layouts/post';
import Layout from 'layouts/layout';

import { getPublishedNotifications } from 'utils/notifications';

import { MAIN_CATEGORIES } from 'utils/constants';

export default function Index(props) {
  return (
    <Layout {...props}>
      {props?.post ? <PostPage {...props} /> : <ArchivePage {...props} />}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { slugs } = params;

  const isCategory = slugs.length === 1;
  const notifications = await getPublishedNotifications();

  const sortedCategories = sortBy(MAIN_CATEGORIES, (cat) =>
    MAIN_CATEGORIES.indexOf(cat.slug)
  );

  try {
    if (isCategory) {
      const category = MAIN_CATEGORIES?.find((cat) => cat.slug === slugs[0]);

      if (!category) {
        return {
          props: {
            isError: true,
            notifications: notifications || [],
          },
          revalidate: 10,
        };
      }

      const categoryPostsResponse = await getPostsByType({
        type: 'posts',
        params: {
          per_page: 12,
          categories: [category?.id],
        },
      });

      return {
        props: {
          taxType: 'categories',
          tax: category || {},
          allTax: sortedCategories || [],
          categories: sortedCategories || [],
          posts: categoryPostsResponse?.posts || [],
          totalPages: categoryPostsResponse?.totalPages || 1,
          totalPosts: categoryPostsResponse?.total || 0,
          metaTags: category?.yoast_head || '',
          notifications: notifications || [],
        },
        revalidate: 10,
      };
    }

    const slug = slugs[slugs.length - 1];

    /*
     * Verify if the URL is a WordPress redirection
     * and gets the right slug to fetch the post
     */
    const redirectionData = await getRedirectionData(slug);
    const hasRedirection = Object.keys(redirectionData).length > 0;

    let targetURL;

    if (hasRedirection) {
      const urlArray = redirectionData?.match_url.split('/');

      targetURL = urlArray[urlArray.length - 1]; // separate category from slug
    } else {
      targetURL = slug;
    }

    const post = await getPostByType({
      slug: targetURL,
    });

    if (!post) {
      return {
        props: {
          isError: true,
          notifications: notifications || [],
        },
        revalidate: 10,
      };
    }

    const originalPostId = post?.translations_posts.find(
      (translation) => translation?.acf?.guest_authors
    )?.id;

    const originalPost =
      originalPostId &&
      (await getPostById({
        id: originalPostId,
      }));

    const originalPostGuestAuthors = originalPost?.acf?.guest_authors || [];

    const relatedPosts = await getPostsByType({
      type: 'posts',
      params: {
        orderby: 'date',
        exclude: post.id,
        categories: post?.category_ids,
        per_page: 3,
      },
    });

    return {
      props: {
        post: post || {},
        slugs: slugs || [],
        relatedPosts: relatedPosts?.posts || [],
        metaTags: post?.yoast_head || '',
        guestAuthors: originalPostGuestAuthors,
        notifications: notifications || [],
        categories: sortedCategories || [],
      },
      revalidate: 10,
    };
  } catch (err) {
    return {
      props: {
        isError: true,
        notifications: notifications || [],
      },
      revalidate: 10,
    };
  }
}

export async function getStaticPaths() {
  const categories = await getCategories({ params: { _fields: 'slug' } });
  const categoryPaths = categories?.map((cat) => ({
    params: {
      slugs: [cat.slug],
    },
  }));
  const allPosts = await getAllPostsByType({
    params: { _fields: 'link' },
  });
  const postsPaths = allPosts?.map((p) => {
    const slugs = p.link.split('/').filter((o) => o);

    return {
      params: {
        slugs,
      },
    };
  });

  return {
    paths: [...categoryPaths, ...postsPaths] || [],
    fallback: true,
  };
}
