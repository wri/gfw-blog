import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled, css } from 'frontity';
import Search from './index';
import { MEDIUM_ENDPOINT } from '../heplers/css-endpoints';

const SearchResults = ({ state }) => {
  const { link } = state.router;
  const { total, searchQuery } = state.source.get(link);

  return (
    <>
      <Search
        fullWidth
        ready
        css={css`
          width: 100%;
          border-bottom: 1px solid #aaa;
          @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
            margin: 0 1rem;
          }
        `}
        title={searchQuery}
      />
      {!total && (
        <ResultsTite>{`No results for keyword ${searchQuery}`}</ResultsTite>
      )}
      <ResultsTite>
        {`${total} article${total > 1 ? 's' : ''} with keyword ${searchQuery}`}
      </ResultsTite>
    </>
  );
};

export default connect(SearchResults);

SearchResults.propTypes = {
  state: PropTypes.object,
};

const ResultsTite = styled.div`
  width: 100%;
  margin-top: 4.5rem;
  font-size: 0.875rem;
  @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
    margin: 3rem 1rem 0;
  }
`;
