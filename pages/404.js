import ErrorPage from 'layouts/error';
import Layout from 'layouts/layout';

export default function Custom404() {
  return (
    <Layout isError noIndex>
      <ErrorPage statusCode={404} />
    </Layout>
  );
}
