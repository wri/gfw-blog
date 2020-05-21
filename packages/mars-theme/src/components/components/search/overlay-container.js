import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';
import { OverlayWrapper } from './components';

const SearchOverlayContainer = ({ state, actions }) => {
  const handler = () => {
    actions.theme.toggleSearch();
  };

  if (!state.theme.searchIsActive) {
    return null;
  }
  return (
    <Wrapper onClick={handler}>
      <OverlayWrapper />
    </Wrapper>
  );
};

export default connect(SearchOverlayContainer);

SearchOverlayContainer.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object,
};

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
`;
