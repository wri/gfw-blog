import React from 'react';
import PropTypes from 'prop-types';
import { styled, connect } from 'frontity';
import { Row, Column } from 'gfw-components';

import theme from '../../app/theme';
import treeErrorIcon from '../../assets/icons/error.svg';

const Page404 = ({ state }) => {
  const data = state.source.get(state.router.link);

  const title = "We're sorry, something went wrong.";
  const title404 = 'Page not found';

  const description = 'Try refreshing the page or check your connection.';
  const description404 =
    'You may have mistyped the address or the page may have moved.';

  return (
    <Container>
      <Column>
        <ErrorImage src={treeErrorIcon} alt="error tree" />
        <Title>{data.is404 ? title404 : title}</Title>
        <Description>{data.is404 ? description404 : description}</Description>
      </Column>
    </Container>
  );
};

Page404.propTypes = {
  state: PropTypes.object,
};

export default connect(Page404);

const Container = styled(Row)`
  padding: 70px 0 100px !important;
`;

const ErrorImage = styled.img`
  /* max-width: 100%; */
  height: 200px;
  margin: auto;
  margin-bottom: 10px;
  width: 100%;

  ${theme.mediaQueries.small} {
    margin-bottom: 20px;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${theme.colors.darkestGrey};
  margin-bottom: 30px;
  text-align: center;
  font-weight: 400;

  ${theme.mediaQueries.small} {
    font-size: 60px;
    margin-bottom: 30px;
  }
`;

const Description = styled.div`
  font-size: 18px;
  line-height: 30px;
  color: ${theme.colors.darkestGrey};
  text-align: center;
`;
