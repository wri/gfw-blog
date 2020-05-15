import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled, css } from 'frontity';
import Input from './input';
import { SearchInputWrapper } from './components';
import { SMALL_ENDPOINT } from '../heplers/css-endpoints';

const SearchExpanded = ({ state, actions, libraries, mobile, ...props }) => {
  const handler = () => {
    actions.theme.toggleSearch();
  };

  const inputClickHandler = (e) => {
    e.stopPropagation();
  };

  const extraCss = mobile
    ? `
  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    display: none;
  }
  `
    : `
    @media screen and (max-width: ${SMALL_ENDPOINT}) {
      display: none;
    }
    `;

  if (!state.theme.searchIsActive) {
    return null;
  }
  return (
    <Wrapper
      {...props}
      css={css`
        ${extraCss}
      `}
    >
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
  mobile: PropTypes.bool,
  state: PropTypes.object,
  actions: PropTypes.object,
  libraries: PropTypes.object,
};

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  position: absolute;
  right: 16px;
  left: 16px;
  margin-bottom: 20px;

  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    right: 20px;
    left: 20px;
  }
`;

const MiddleWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
`;
