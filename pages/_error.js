import ErrorPage from 'layouts/error';
import Layout from 'layouts/layout';

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
