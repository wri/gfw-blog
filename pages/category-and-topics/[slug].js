import { getTagBySlug, getPostsByTaxonomy } from 'lib/api';

import ArchivePage from 'layouts/archive';
import Layout from 'layouts/layout';

import { getPublishedNotifications } from 'utils/notifications';

import { MAIN_CATEGORIES, MAIN_TOPICS } from 'utils/constants';

import sortBy from 'lodash/sortBy';

export default function CategoryAndTopics(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <Layout {...props}>
      <ArchivePage {...props} />
    </Layout>
  );
}

export async function getServerSideProps({
  params,
  query: { page = 1, topic, category },
}) {
  try {
    const tag = await getTagBySlug({ slug: params.tag });
    const postsResponse = await getPostsByTaxonomy({
      params: {
        per_page: 6,
        page,
        topic,
        category,
      },
    });

    const sortedCategories = sortBy(MAIN_CATEGORIES, (cat) =>
      MAIN_CATEGORIES.indexOf(cat.slug)
    );

    const notifications = await getPublishedNotifications();

    return {
      props: {
        topics: MAIN_TOPICS || [],
        categories: sortedCategories || [],
        posts: postsResponse?.posts || [],
        totalPages: postsResponse?.totalPages || 1,
        totalPosts: postsResponse?.totalPosts || 0,
        metaTags: tag?.yoast_head || '',
        isError: !tag,
        notifications: notifications || [],
      },
    };
  } catch (err) {
    return {
      props: {
        isError: true,
      },
    };
  }
}
