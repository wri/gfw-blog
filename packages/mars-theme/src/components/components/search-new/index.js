import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import OutsideClickHandler from 'react-outside-click-handler';
import { SearchIcon } from 'gfw-components';
import { rgba } from 'emotion-rgba';
import theme from '../../theme';

import {
  Wrapper,
  Container,
  SearchOpen,
  SearchClosed,
  OpenMessage,
  Input,
} from './styles';

// import { SearchIcon } from './components';
// import SearchExpanded from './expanded';
// import { MEDIUM_ENDPOINT, SMALL_ENDPOINT } from '../../heplers/css-endpoints';
// import CloseIcon from '../../../assets/icons/close.svg';

const Search = ({ libraries, actions, state, ...props }) => {
  const open = state.theme.searchIsActive;

  const inputRef = React.createRef();

  useEffect(() => {
    if (open) inputRef.current.focus();
  }, [open]);

  return (
    <>
      {open && (
        <div
          css={css`
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            background-color: ${rgba(theme.colors.white, 0.8)};
          `}
        />
      )}
      <OutsideClickHandler
        onOutsideClick={() => actions.theme.setSearchOpen(false)}
      >
        <Wrapper
          onClick={() => actions.theme.setSearchOpen(true)}
          {...props}
          open={open}
        >
          <Container open={open}>
            {open && (
              <SearchOpen>
                <Input
                  ref={inputRef}
                  placeholder="Search the GFW blog  (eg. fires, Brazil, palm oil)"
                />
              </SearchOpen>
            )}
            {!open && (
              <SearchClosed>
                <OpenMessage>search the GFW blog</OpenMessage>
              </SearchClosed>
            )}
            <SearchIcon
              css={css`
                min-width: 32px;
                min-height: 32px;
                height: 32px;
              `}
            />
          </Container>
          {/* <SearchBox
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
          </SearchBox> */}
        </Wrapper>
      </OutsideClickHandler>
    </>
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
