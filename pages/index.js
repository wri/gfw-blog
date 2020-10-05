import Head from 'next/head';

import { getPostByType } from 'lib/api';

import HomePage from 'layouts/home';

import Layout from 'layouts/layout';

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

  // const tools = await getPostsByType({
  //   type: 'tools',
  //   params: {
  //     per_page: 100,
  //     order: 'asc',
  //     orderby: 'menu_order',
  //     parent: 0,
  //   },
  // });

  // const toolsMapped = tools?.map((tool) => ({
  //   ...convertTool(tool),
  // }));

  return {
    props: {
      homepage: homepage || {},
      // tools: toolsMapped || [],
    },
    revalidate: 10,
  };
}
