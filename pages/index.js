import sortBy from 'lodash/sortBy';
import Head from 'next/head';

import { getPostByType, getPostsByType, getCategories } from 'lib/api';

import HomePage from 'layouts/home';

import Layout from 'layouts/layout';

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
      <Head>
        <title>
          Forest News, Research & Monitoring | Global Forest Watch Blog
        </title>
        <meta
          name="description"
          content="Read about data-backed topics critical to the future of forests, including rainforests, deforestation, fires, sustainable agriculture, forest monitoring and management."
        />
      </Head>
      <HomePage {...props} />
    </Layout>
  );
}

export async function getStaticProps() {
  const homepage = await getPostByType({
    type: 'pages',
    slug: 'global-forest-watch-blog',
  });

  const stickyPosts = await getPostsByType({
    type: 'posts',
    params: {
      per_page: 3,
      sticky: true,
    },
  });

  const stickyPostsIds = stickyPosts?.posts?.map((s) => s.id);

  const posts = await getPostsByType({
    type: 'posts',
    params: {
      per_page: 6,
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
    },
    revalidate: 10,
  };
}
