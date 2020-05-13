import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect, styled, css } from 'frontity';
import { SearchIcon } from './components';
import TopEntitiesContext from '../heplers/context';
import { MEDIUM_ENDPOINT } from '../heplers/css-endpoints';

const Search = ({
  libraries,
  state,
  title = 'Search th GFW blog',
  ready,
  fullWidth,
  mobile = false,
  ...props
}) => {
  const ref = useRef();
  const context = useContext(TopEntitiesContext);

  const handler = () => {
    context.search.setElementRects(ref.current.getClientRects()[0]);
    context.search.toggleSearch();
  };

  const parentHandler = () => {
    if (!ready) {
      handler();
    }
  };

  const wrapCss = fullWidth ? `width: 100%; height: auto;` : '';
  const baseCss = mobile
    ? `
  ${wrapCss}
  @media screen and (min-width: ${MEDIUM_ENDPOINT}) {
    display:none;
  };
  width: 100%;
  justify-content: flex-end;
  `
    : `${wrapCss}
    @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
      display:none;
    };
  `;

  if (context.search.active) {
    return null;
  }
  return (
    <Wrapper
      css={css`
        ${baseCss}
      `}
      ref={ref}
      onClick={parentHandler}
      {...props}
    >
      <SearchBox
        css={css`
          ${wrapCss}
        `}
      >
        {title && !ready && <Title>{title}</Title>}
        {title && ready && (
          <ReadyTitle>
            <ReadyContent>
              {title}
              <RemoveIcon onClick={handler} />
            </ReadyContent>
          </ReadyTitle>
        )}
        <SearchIcon />
      </SearchBox>
    </Wrapper>
  );
};

export default connect(Search);

Search.propTypes = {
  libraries: PropTypes.object,
  state: PropTypes.object,
  title: PropTypes.string,
  ready: PropTypes.bool,
  fullWidth: PropTypes.bool,
  mobile: PropTypes.bool,
};

const RemoveIcon = styled.div`
  position: relative;
  cursor: pointer;
  right: 0;
  width: 12px;
  height: 12px;
  margin-left: 1rem;
  &:before,
  &:after {
    position: absolute;
    right: 5px;
    content: ' ';
    height: 12px;
    width: 2px;
    background-color: #333;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

const Title = styled.div`
  text-transform: uppercase;
  color: #777;
  font-size: 0.75rem;
  line-height: 1.5rem;
  height: 1.5rem;
  min-width: 130px;
  max-width: 150px;
`;

const ReadyContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const ReadyTitle = styled.div`
  width: 100%;
  font-size: 3rem;
  line-height: 3.75rem;
  font-weight: 200;
  color: #333;
  @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
    margin: 0 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;
`;
