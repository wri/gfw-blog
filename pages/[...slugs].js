/* eslint-disable react/prop-types */
import sortBy from 'lodash/sortBy';

import {
  getPostByType,
  getPostsByType,
  getCategories,
  getAllPostsByType,
} from 'lib/api';

import ArchivePage from 'layouts/archive';
import PostPage from 'layouts/post';

import Layout from 'layouts/layout';

const MAIN_CATEGORIES = [
  'data-and-research',
  'people',
  'commodities',
  'fires',
  'climate',
  'places-to-watch',
  'uncategorized',
];

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

  try {
    if (isCategory) {
      const categories = await getCategories();
      const filteredCategories = categories
        ?.filter((c) => MAIN_CATEGORIES.includes(c.slug))
        ?.map((c) => ({
          ...c,
          link: `/${c.slug}`,
        }));
      const sortedCategories = sortBy(filteredCategories, (cat) =>
        MAIN_CATEGORIES.indexOf(cat.slug)
      );

      const category = categories?.find((cat) => cat.slug === slugs[0]);

      if (!category) {
        return {
          props: {
            isError: true,
          },
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
          posts: categoryPostsResponse?.posts || [],
          totalPages: categoryPostsResponse?.totalPages || 1,
          totalPosts: categoryPostsResponse?.total || 0,
          metaTags: category?.yoast_head || '',
        },
        revalidate: 10,
      };
    }

    const slug = slugs[slugs.length - 1];
    const post = await getPostByType({
      slug,
    });

    if (!post || post?.link !== `/${slugs?.join('/')}`) {
      return {
        props: {
          isError: true,
        },
      };
    }

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
      },
      revalidate: 10,
    };
  } catch (err) {
    return {
      props: {
        isError: true,
      },
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
