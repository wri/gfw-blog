import dynamic from 'next/dynamic';
import ErrorPage from 'layouts/error';

const Layout = dynamic(() => import('layouts/layout'), {
  ssr: false,
});

export default function Error(props) {
  return (
    <Layout {...props} isError noIndex>
      <ErrorPage {...props} />
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
