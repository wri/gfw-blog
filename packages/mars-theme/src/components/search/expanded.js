import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';
import Input from './input';
import { SearchInputWrapper } from './components';

const SearchExpanded = ({ state, actions, libraries, ...props }) => {
  const handler = () => {
    actions.theme.toggleSearch();
  };

  const inputClickHandler = (e) => {
    e.stopPropagation();
  };

  if (!state.theme.searchIsActive) {
    return null;
  }
  return (
    <Wrapper {...props}>
      <MiddleWrapper>
        <SearchInputWrapper>
          <Input inputClickHandler={inputClickHandler} resetHandler={handler} />
        </SearchInputWrapper>
      </MiddleWrapper>
    </Wrapper>
  );
};

export default connect(SearchExpanded);

SearchExpanded.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object,
  libraries: PropTypes.object,
};

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
`;

const MiddleWrapper = styled.div`
  width: 100%;
  position relative;
  display: flex;
  justify-content: center;
`;
