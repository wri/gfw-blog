/* eslint-disable react/prop-types */
import sortBy from 'lodash/sortBy';
// import Head from 'next/head';

import {
  getPostByType,
  getPostsByType,
  getCategories,
  getCategoryBySlug,
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

    const category = await getCategoryBySlug({ slug: slugs[0] });
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
        isError: !category,
      },
      revalidate: 10,
    };
  }

  const slug = slugs[slugs.length - 1];
  const post = await getPostByType({
    slug,
  });

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
      relatedPosts: relatedPosts?.posts || [],
      metaTags: post?.yoast_head || '',
      isError: !post,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  const categoryPaths = categories?.map((cat) => ({
    params: {
      slugs: [cat.slug],
    },
  }));

  const posts = await getPostsByType({ params: { per_page: 100 } });
  const postsPaths = posts?.posts?.map((p) => {
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
