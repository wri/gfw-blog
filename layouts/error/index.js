import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styled from '@emotion/styled';
import { Row, Column } from '@worldresources/gfw-components';

import Message from 'components/message';

const Page404 = ({ statusCode }) => {
  const is404 = statusCode === 404;

  const title = "We're sorry, something went wrong.";
  const title404 = 'Page not found';

  const description = 'Try refreshing the page or check your connection.';
  const description404 =
    'You may have mistyped the address or the page may have moved.';

  const errorTitle = is404 ? title404 : title;
  const errorDescription = is404 ? description404 : description;

  return (
    <Container>
      <Head>
        <title>{`${errorTitle} | Global Forest Watch Blog`}</title>
        <meta
          name="description"
          content={`${errorDescription} | Global Forest Watch Blog`}
        />
      </Head>
      <Column>
        <Message error title={errorTitle} description={errorDescription} />
      </Column>
    </Container>
  );
};

Page404.propTypes = {
  statusCode: PropTypes.number,
};

export default Page404;

const Container = styled(Row)`
  padding: 70px 0 100px !important;
`;
