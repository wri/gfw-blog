import sortBy from 'lodash/sortBy';
// import Head from 'next/head';

import { getPostsByType, getCategories, getCategoryBySlug } from 'lib/api';

import ArchivePage from 'layouts/archive';

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
      <ArchivePage {...props} />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { slugs } = params;

  // const isCategory = slugs.length === 1;
  // const slug = slugs[slugs.length - 1];

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

  // const stickyPostsIds = stickyPosts?.posts?.map((s) => s.id);

  // const posts = await getPostsByType({
  //   type: 'posts',
  //   params: {
  //     per_page: 6,
  //     exclude: stickyPostsIds,
  //   },
  // });

  // const categories = await getCategories({
  //   params: {
  //     per_page: 100,
  //   },
  // });

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

export async function getStaticPaths() {
  const categories = await getCategories();
  const categoryPaths = categories?.map((cat) => ({
    params: {
      slugs: [cat.slug],
    },
  }));

  return {
    paths: categoryPaths || [],
    fallback: true,
  };
}
