import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, styled, css } from 'frontity';
import { Button, Loader } from 'gfw-components';

const LoadMore = ({
  actions,
  state,
  setPage,
  page,
  limit,
  isFetching,
  setIsFetching,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (page && page > 1) {
      const fetchLink =
        state.router.link[1] === '?'
          ? `page/${page}${state.router.link}`
          : `${state.router.link}page/${page}`;
      const res = actions.source.fetch(fetchLink);
      res.then(() => {
        setIsFetching(true);
      });
    }
  }, [page, setIsFetching]);

  useEffect(() => {
    if (!isFetching) {
      setIsLoading(false);
    }
  }, [isFetching]);

  const loadHandler = useCallback(() => {
    setIsLoading(true);
    setPage(page + 1);
  }, [page, setPage, setIsLoading]);

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
          onClick={loadHandler}
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
  state: PropTypes.object,
  setPage: PropTypes.func,
  setIsFetching: PropTypes.func,
  page: PropTypes.number,
  limit: PropTypes.number,
  isFetching: PropTypes.bool,
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
