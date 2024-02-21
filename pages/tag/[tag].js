import { getTags, getTagBySlug, getPostsByTaxonomy } from 'lib/api';

import ArchivePage from 'layouts/archive';
import Layout from 'layouts/layout';

import { getPublishedNotifications } from 'utils/notifications';

import { MAIN_CATEGORIES, MAIN_TOPICS } from 'utils/constants';

import sortBy from 'lodash/sortBy';

export default function Tag(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <Layout {...props}>
      <ArchivePage {...props} />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const page = params?.page || 1;
  try {
    const tags = await getTags({
      params: { per_page: 50, orderby: 'count', order: 'desc' },
    });

    const tag = await getTagBySlug({ slug: params.tag });
    const postsResponse = await getPostsByTaxonomy({
      params: {
        per_page: 6,
        page,
        topic: params.tag,
      },
    });

    const sortedCategories = sortBy(MAIN_CATEGORIES, (cat) =>
      MAIN_CATEGORIES.indexOf(cat.slug)
    );

    const notifications = await getPublishedNotifications();

    return {
      props: {
        taxType: 'tags',
        tax: tag || null,
        allTax: tags || [],
        topics: MAIN_TOPICS || [],
        categories: sortedCategories || [],
        posts: postsResponse?.posts || [],
        totalPages: postsResponse?.totalPages || 1,
        totalPosts: postsResponse?.totalPosts || 0,
        metaTags: tag?.yoast_head || '',
        isError: !tag,
        notifications: notifications || [],
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
