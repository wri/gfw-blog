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
  try {
    const tags = await getTags({
      params: { per_page: 50, orderby: 'count', order: 'desc' },
    });
    const tag = await getTagBySlug({ slug: params.tag });

    const postsResponse = await getPostsByType({
      type: 'posts',
      params: {
        tags: tag?.id,
        per_page: 12,
      },
    });

    return {
      props: {
        taxType: 'tags',
        tax: tag || null,
        allTax: tags || [],
        posts: postsResponse?.posts || [],
        totalPages: postsResponse?.totalPages || 1,
        totalPosts: postsResponse?.total || 0,
        metaTags: tag?.yoast_head || '',
        isError: !tag,
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
  const allTags = await getTags({ params: { _fields: 'slug' } });

  const paths = allTags?.map((tag) => ({
    params: {
      tag: tag.slug,
    },
  }));

  return {
    paths: paths || [],
    fallback: true,
  };
}
