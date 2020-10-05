import { getPostsByType, getPostByType } from 'lib/api';

import WebinarPage from 'layouts/webinar';

import Layout from 'layouts/layout';

export default function Webinar(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <Layout {...props}>
      <WebinarPage {...props} />
    </Layout>
  );
}

export async function getStaticProps({ params, preview, previewData }) {
  const isPreview = !!preview && previewData?.slug === params.slug;
  const webinar = await getPostByType({
    type: 'webinars',
    ...(isPreview && {
      id: previewData?.id,
      params: {
        status: 'any',
      },
    }),
    slug: params.slug,
  });

  return {
    props: {
      webinar: webinar || null,
      metaTags: webinar?.yoast_head || '',
      isError: !webinar,
      preview: isPreview,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allWebinars = await getPostsByType({
    type: 'webinars',
    params: { per_page: 100 },
  });

  const webinarsWithTax = allWebinars.filter((a) => a?.help_tools?.length);

  const paths = webinarsWithTax?.map((webinar) => {
    const taxonomy = webinar?._embedded?.['wp:term']?.[1]?.[0]?.slug;

    return `/${taxonomy}/webinars/${webinar.slug}/`;
  });

  return {
    paths: paths || [],
    fallback: true,
  };
}
