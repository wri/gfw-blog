import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect, styled, css } from 'frontity';
import { SearchIcon } from './components';
import SearchExpanded from './expanded';
import { MEDIUM_ENDPOINT, SMALL_ENDPOINT } from '../heplers/css-endpoints';
import CloseIcon from '../../assets/icons/close.svg';

const Search = ({
  libraries,
  actions,
  state,
  title = 'Search th GFW blog',
  ready,
  fullWidth,
  mobile = false,
  ...props
}) => {
  const ref = useRef();

  const handler = () => {
    actions.theme.toggleSearch();
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
  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    display:none;
  };
  width: 100%;
  justify-content: flex-end;
  `
    : `${wrapCss}
    @media screen and (max-width: ${SMALL_ENDPOINT}) {
      display:none;
    };
  `;

  if (state.theme.searchIsActive) {
    return <SearchExpanded mobile={mobile} />;
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
              <RemoveIcon onClick={handler}>
                <img alt="" src={CloseIcon} />
              </RemoveIcon>
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
  actions: PropTypes.object,
  title: PropTypes.string,
  ready: PropTypes.bool,
  fullWidth: PropTypes.bool,
  mobile: PropTypes.bool,
};

const RemoveIcon = styled.div`
  cursor: pointer;
  margin-left: 1rem;
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
  align-items: center;
  height: 3.75rem;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;
`;
