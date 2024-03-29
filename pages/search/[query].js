import Head from 'next/head';

import { getPostsByType } from 'lib/api';

import SearchPage from 'layouts/search';
import Layout from 'layouts/layout';

import { getPublishedNotifications } from 'utils/notifications';

import sortBy from 'lodash/sortBy';
import { MAIN_CATEGORIES, MAIN_TOPICS } from '../../utils/constants';

export default function Search(props) {
  return (
    <Layout {...props} noIndex>
      <Head>
        <title>Search | GFW Blog | Global Forest Watch</title>
        <meta
          name="description"
          content="Find tutorials, webinars and other resources in the GFW Help Center to help guide you through the forest monitoring data, analysis, technology and tools that GFW offers."
        />
      </Head>
      <SearchPage {...props} />
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const postsResponse = await getPostsByType({
    type: 'posts',
    params: {
      search: params?.query,
      per_page: 9,
    },
    allLanguages: true,
  });
  const notifications = await getPublishedNotifications();

  const sortedCategories = sortBy(MAIN_CATEGORIES, (cat) =>
    MAIN_CATEGORIES.indexOf(cat.slug)
  );

  return {
    props: {
      posts: postsResponse?.posts || [],
      totalPages: postsResponse?.totalPages || 1,
      totalPosts: postsResponse?.total || 0,
      searchQuery: params?.query,
      categories: sortedCategories || [],
      topics: MAIN_TOPICS,
      notifications: notifications || [],
    },
  };
}
