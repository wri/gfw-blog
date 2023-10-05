import dynamic from 'next/dynamic';
import ErrorPage from 'layouts/error';

const Layout = dynamic(() => import('layouts/layout'), {
  ssr: false,
});

export default function Custom404() {
  return (
    <Layout isError noIndex>
      <ErrorPage statusCode={404} />
    </Layout>
  );
}
