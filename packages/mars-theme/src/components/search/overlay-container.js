import React, { useContext } from 'react';
import { connect, styled } from 'frontity';
import TopEntitiesContext from '../heplers/context';
import { OverlayWrapper } from './components';

const SearchOverlayContainer = () => {
  const context = useContext(TopEntitiesContext);
  const handler = () => {
    context.search.toggleSearch();
  };

  if (!context.search.active) {
    return null;
  }
  return (
    <Wrapper onClick={handler}>
      <OverlayWrapper />
    </Wrapper>
  );
};

export default connect(SearchOverlayContainer);

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
`;
