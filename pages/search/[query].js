import Head from 'next/head';

import { getPostsByType } from 'lib/api';

import dynamic from 'next/dynamic';

import ArchivePage from 'layouts/archive';

import { getPublishedNotifications } from 'utils/notifications';

const Layout = dynamic(() => import('layouts/layout'), {
  ssr: false,
});

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
      <ArchivePage {...props} isSearch />
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

  return {
    props: {
      posts: postsResponse?.posts || [],
      totalPages: postsResponse?.totalPages || 1,
      totalPosts: postsResponse?.total || 0,
      searchQuery: params?.query,
      notifications: notifications || [],
    },
  };
}
