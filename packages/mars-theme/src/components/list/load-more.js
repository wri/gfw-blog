import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connect, styled, css } from 'frontity';
import { Button, Loader } from 'gfw-components';
import { SMALL_ENDPOINT, MEDIUM_ENDPOINT } from '../heplers/css-endpoints';

const LoadMore = ({
  actions,
  state,
  setPage,
  page,
  isFetching,
  setIsFetching,
}) => {
  const buttonCss = `
    @media screen and (max-width: ${SMALL_ENDPOINT}) {
      width: 100% !important;
      margin: 0 1rem;
    }
    width: 31.532% !important;
  `;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (page && page > 1) {
      const fetchLink = state.router.link[1] === '?' ? `page/${page}${state.router.link}` : `${state.router.link}page/${page}`
      const res = actions.source.fetch(fetchLink);
      res.then(() => {
        setIsFetching(true);
      });
    }
  }, [page]);

  useLayoutEffect(() => {
    if (!isFetching) {
      setIsLoading(false);
    }
  }, [isFetching]);

  const loadHandler = useCallback(() => {
    setIsLoading(true);
    setPage(page + 1);
  }, [page]);

  return (
    <Wrapper>
      {isLoading && (
        <div style={{ position: 'relative', width: '50px', height: '50px' }}>
          <Loader />
        </div>
      )}
      {!isLoading && (
        <Button
          css={css`
            ${buttonCss}
          `}
          onClick={loadHandler}
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
  isFetching: PropTypes.bool,
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 0.75rem 0 0 0;
  @media screen and (min-width: ${MEDIUM_ENDPOINT}) {
    margin: 3.5rem 0 0 0;
  }
`;
