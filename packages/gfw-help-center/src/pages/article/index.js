import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';

import { Row, Column, Loader } from 'gfw-components';

import Breadcrumbs from '../../components/breadcrumbs';

import { PostContainer, Search, BreadCrumbsWrapper } from './styles';

const Post = ({ state }) => {
  const data = state.source.get(state.router.link);

  return (
    <PostContainer>
      {data.isReady ? (
        <>
          <Row
            css={css`
              position: relative;
              min-height: 40px;
            `}
          >
            <BreadCrumbsWrapper width={[5 / 6, 3 / 4]}>
              <Breadcrumbs />
            </BreadCrumbsWrapper>
            <Column width={[1 / 6, 1 / 4]}>
              <Search open={state.theme.searchIsActive} />
            </Column>
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </PostContainer>
  );
};

Post.propTypes = {
  state: PropTypes.object,
};

export default connect(Post);
