import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { rgba } from 'emotion-rgba';
import deburr from 'lodash/deburr';
import toUpper from 'lodash/toUpper';
import { SearchIcon, CloseIcon, Button } from 'gfw-components';

import theme from '../../theme';
import ResultsList from '../results-list';

import {
  Wrapper,
  Container,
  SearchOpen,
  SearchClosed,
  OpenMessage,
  Input,
  OpenPlaceholder,
} from './styles';

const deburrUpper = (string) => toUpper(deburr(string));

const Search = ({
  actions,
  libraries,
  state,
  showTitle,
  expanded,
  ...props
}) => {
  const parse = libraries.source.parse(state.router.link);
  const searchQuery = parse.query.s ? decodeURI(parse.query.s) : '';

  const [search, setSearch] = useState(searchQuery);

  const open = state.theme.searchIsActive;

  const inputRef = React.createRef();

  const { categories } = state.source.data['all-categories/'];
  const { tags } = state.source.data['top-tags/'];

  const allMeta = [...categories, ...tags];

  const re = new RegExp(`(${search})`, 'i');

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      actions.router.set(`/?s=${search}`);
      actions.theme.setSearchOpen(false);
    }
  };

  const filteredMeta = allMeta.filter((meta) =>
    deburrUpper(meta.name).includes(deburrUpper(search))
  ) || [{ name: search, link: `/?s=${search}` }];

  const filteredResults = filteredMeta?.length
    ? filteredMeta
    : [{ name: search, link: `/?s=${search}` }];

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
          role="button"
          aria-label="close search"
          tabIndex={0}
          onClick={() => actions.theme.setSearchOpen(false)}
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
      <Wrapper
        onClick={() => actions.theme.setSearchOpen(true)}
        {...props}
        open={open}
      >
        <Container open={open} expanded={expanded}>
          {(open || expanded) && (
            <SearchOpen>
              <Input
                ref={inputRef}
                value={search}
                expanded={expanded}
                placeholder="Search the GFW blog  (eg. fires, Brazil, palm oil)"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={keyDownHandler}
              />
              {search && (
                <Button
                  theme="button-clear round"
                  onClick={() => setSearch('')}
                >
                  <CloseIcon
                    css={css`
                      height: 10px;
                      width: 10px;
                      max-height: 10px;
                      max-width: 10px;
                    `}
                  />
                </Button>
              )}
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
        {open && (
          <ResultsList
            items={searchResults}
            onClickResult={() => actions.theme.setSearchOpen(false)}
          />
        )}
      </Wrapper>
      {open && <OpenPlaceholder />}
    </>
  );
};

export default connect(Search);

Search.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object,
  showTitle: PropTypes.bool,
  libraries: PropTypes.object,
  expanded: PropTypes.bool,
};
