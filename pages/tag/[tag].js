import { getTags, getTagBySlug, getPostsByType } from 'lib/api';

import ArchivePage from 'layouts/archive';

import Layout from 'layouts/layout';

export default function Tag(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <Layout {...props}>
      <ArchivePage {...props} />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const tags = await getTags();
  const tag = await getTagBySlug({ slug: params.tag });

  const postsResponse = await getPostsByType({
    type: 'posts',
    params: {
      tags: tag?.id,
    },
  });

  return {
    props: {
      tag: tag || null,
      tags: tags || [],
      posts: postsResponse?.posts || [],
      totalPages: postsResponse?.totalPages || 1,
      metaTags: tag?.yoast_head || '',
      isError: !tag,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allTags = await getTags();

  const paths = allTags?.map((tag) => `/tag/${tag.slug}/`);

  return {
    paths: paths || [],
    fallback: true,
  };
}
