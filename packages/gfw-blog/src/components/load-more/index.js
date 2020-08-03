import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, styled, css } from 'frontity';
import { Button, Loader } from 'gfw-components';

const LoadMore = ({ actions, page, link, limit, setPage, isSearch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLoadMore = async () => {
    setIsLoading(true);

    try {
      actions.googleAnalytics.event({
        payload: {
          category: 'GFW Blog',
          label: 'User clicks on more articles button',
        },
        name: 'Load more articles',
      });
      await actions.source.fetch(
        isSearch ? `/page/${page + 1}${link}` : `${link}page/${page + 1}`
      );
      setPage(page + 1);
    } catch (err) {
      setIsLoading(false);
      setError(true);
    }

    setIsLoading(false);
  };

  if (error) {
    return 'We are having trouble getting more posts. Please try again later.';
  }

  if (limit <= page && !isLoading) {
    return null;
  }

  return (
    <Wrapper>
      {isLoading && (
        <div style={{ position: 'relative', width: '50px', height: '50px' }}>
          <Loader />
        </div>
      )}
      {!isLoading && (
        <Button
          onClick={handleLoadMore}
          css={css`
            width: 100%;
          `}
        >
          Load more articles
        </Button>
      )}
    </Wrapper>
  );
};

export default connect(LoadMore);

LoadMore.propTypes = {
  actions: PropTypes.object,
  page: PropTypes.number,
  limit: PropTypes.number,
  link: PropTypes.string,
  setPage: PropTypes.func,
  isSearch: PropTypes.bool,
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
