import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connect, styled, css } from 'frontity';
import { Button, Loader } from 'gfw-components';
import { SMALL_ENDPOINT } from '../heplers/css-endpoints';

const LoadMore = ({ actions, state, setPage, page, length, isFetching }) => {
  const buttonCss = `
    @media screen and (max-width: ${SMALL_ENDPOINT}) {
      width: 100% !important;
      margin: 0 1rem;
    }
    width: 31.82% !important;
  `;
  const [isLoading, setIsLoading] = useState(false);
  const [currentLength, setCurrentLength] = useState(0);
  useEffect(() => {
    if (page && page > 1) {
      actions.source.fetch(`${state.router.link}page/${page}`);
    }
  }, [page]);

  useLayoutEffect(() => {
    if (!isFetching && length > currentLength) {
      setIsLoading(false);
    }
  }, [length, currentLength, isFetching]);

  const loadHandler = useCallback(() => {
    setCurrentLength(length);
    setIsLoading(true);
    setPage(page + 1);
  }, [page, length]);

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
  page: PropTypes.number,
  length: PropTypes.number,
  isFetching: PropTypes.bool,
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 1.5rem 0;
`;
