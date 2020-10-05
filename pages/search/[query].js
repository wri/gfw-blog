import Head from 'next/head';

import { getPostsByType } from 'lib/api';

import ArchivePage from 'layouts/archive';

import Layout from 'layouts/layout';

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
  const articles = await getPostsByType({
    type: 'articles',
    params: {
      search: params?.query,
    },
  });

  const webinars = await getPostsByType({
    type: 'webinars',
    params: {
      search: params?.query,
    },
  });

  const additionalMaterials = await getPostsByType({
    type: 'additional_materials',
    params: {
      search: params?.query,
    },
  });

  return {
    props: {
      articles: articles || [],
      webinars: webinars || [],
      additionalMaterials: additionalMaterials || [],
    },
  };
}
