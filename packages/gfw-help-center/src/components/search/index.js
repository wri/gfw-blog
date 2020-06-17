import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import deburr from 'lodash/deburr';
import toUpper from 'lodash/toUpper';
import { SearchIcon, CloseIcon, Button } from 'gfw-components';

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

  const re = new RegExp(`(${search})`, 'i');

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      actions.router.set(`/?s=${search}`);
      actions.theme.setSearchOpen(false);
    }
  };

  const filteredMeta = [].filter((meta) =>
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
    <Wrapper {...props} open={open}>
      <Container
        open={open}
        expanded={expanded}
        onClick={() => actions.theme.setSearchOpen(true)}
      >
        {(open || expanded) && (
          <SearchOpen>
            <Input
              ref={inputRef}
              value={search}
              expanded={expanded}
              placeholder="Search the GFW help center"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={keyDownHandler}
            />
            {search && (
              <Button clear round onClick={() => setSearch('')}>
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
            <OpenMessage>Search the GFW help center</OpenMessage>
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
