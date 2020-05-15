import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled, css } from 'frontity';
import Search from './index';
import { MEDIUM_ENDPOINT } from '../heplers/css-endpoints';

const SearchResults = ({ state }) => {
  const { link } = state.router;
  const { total, searchQuery } = state.source.get(link);
  const decodedQuery = decodeURI(searchQuery);

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
        title={decodedQuery}
      />
      {!total && (
        <ResultsTite>{`No results for keyword ${decodedQuery}`}</ResultsTite>
      )}
      <ResultsTite>
        {`${total} article${total > 1 ? 's' : ''} with keyword ${decodedQuery}`}
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
  color: #777;
  font-size: 0.875rem;
  margin: 3rem 0 1.25rem;
  @media screen and (min-width: ${MEDIUM_ENDPOINT}) {
    margin-top: 4.5rem;
  }
`;
