import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import OutsideClickHandler from 'react-outside-click-handler';
import { SearchIcon } from 'gfw-components';
import { rgba } from 'emotion-rgba';
import deburr from 'lodash/deburr';
import toUpper from 'lodash/toUpper';

import theme from '../../theme';
import ResultsList from '../results-list';

import {
  Wrapper,
  Container,
  SearchOpen,
  SearchClosed,
  OpenMessage,
  Input,
} from './styles';

const deburrUpper = (string) => toUpper(deburr(string));

const Search = ({ actions, state, showTitle, ...props }) => {
  const [search, setSearch] = useState('');

  const open = state.theme.searchIsActive;

  const inputRef = React.createRef();

  const { categories } = state.source.data['all-categories/'];
  const { tags } = state.source.data['top-tags/'];

  const allMeta = [...categories, ...tags];

  const re = new RegExp(`(${search})`, 'i');

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      actions.router.set(`/search?s=${search}`);
    }
  };

  const filteredMeta = allMeta.filter((meta) =>
    deburrUpper(meta.name).includes(deburrUpper(search))
  ) || [{ name: search, link: `/search?s=${search}` }];

  const filteredResults = filteredMeta?.length
    ? filteredMeta
    : [{ name: search, link: `/search?s=${search}` }];

  const searchResults = filteredResults.map((meta) => ({
    ...meta,
    name: meta.name.replace(re, `<b>$1</b>`),
  }));

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
                  value={search}
                  placeholder="Search the GFW blog  (eg. fires, Brazil, palm oil)"
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={keyDownHandler}
                />
              </SearchOpen>
            )}
            {!open && showTitle && (
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
          {open && <ResultsList items={searchResults} />}
        </Wrapper>
      </OutsideClickHandler>
    </>
  );
};

export default connect(Search);

Search.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object,
  showTitle: PropTypes.bool,
};
