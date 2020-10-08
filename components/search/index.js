import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import deburr from 'lodash/deburr';
import toUpper from 'lodash/toUpper';
import debounce from 'lodash/debounce';
import { CancelToken } from 'axios';
import { useRouter } from 'next/router';

import { SearchIcon, CloseIcon, Button } from 'gfw-components';

import { getPostsByType, getTags } from 'lib/api';

import ResultsList from 'components/results-list';

import {
  Wrapper,
  Container,
  SearchOpen,
  SearchClosed,
  OpenMessage,
  Input,
  Overlay,
} from './styles';

const deburrUpper = (string) => toUpper(deburr(string));

const Search = ({
  actions,
  libraries,
  state,
  showTitle,
  expanded,
  expandable,
  ...props
}) => {
  const { query, push } = useRouter();
  const searchQuery = query?.q ? decodeURI(query?.q) : '';

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(searchQuery);
  const [results, setResults] = useState([]);
  const [tags, setTags] = useState([]);

  const inputRef = React.createRef();

  const re = new RegExp(`(${search})`, 'i');

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      push('/search/[query]', `/search/${search}/`);
      setOpen(false);
    }
  };

  const filteredMeta = results?.filter((meta) =>
    deburrUpper(meta.name).includes(deburrUpper(search))
  ) || [{ name: search, link: `/search/${search}/` }];

  const filteredResults = filteredMeta?.length
    ? filteredMeta
    : [{ name: search, link: `/search/${search}/` }];

  const searchResults = [
    ...filteredResults,
    { name: 'divider', id: 'divider' },
    ...tags,
  ].map((meta) => ({
    ...meta,
    name:
      meta.name !== 'divider'
        ? meta?.name?.replace(re, `<b>$1</b>`)
        : meta.name,
  }));

  useEffect(() => {
    if (open) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    const fetchTags = async () => {
      const tagsResponse = await getTags({
        params: { per_page: 50, orderby: 'count', order: 'desc' },
      });
      setTags(tagsResponse);
    };

    fetchTags();
  }, []);

  useEffect(
    debounce(() => {
      const fetchSearchContent = async () => {
        const source = CancelToken.source();
        const postsResponse = await getPostsByType({
          type: 'posts',
          params: {
            search,
          },
          cancelToken: source.token,
        });

        const allResults = postsResponse?.posts?.map((r) => {
          return {
            ...r,
            name: r.title,
          };
        });

        setResults(allResults);
      };

      fetchSearchContent();
    }, 500),
    [search]
  );

  return (
    <>
      {open && (
        <Overlay
          role="button"
          aria-label="close search"
          tabIndex={0}
          onClick={() => setOpen(false)}
        />
      )}
      <Wrapper {...props} open={open} expandable={expandable}>
        <Container
          open={open}
          expanded={expanded}
          onClick={() => setOpen(true)}
        >
          {(open || expanded) && (
            <SearchOpen>
              <Input
                ref={inputRef}
                value={search}
                expanded={expanded}
                placeholder="Search the GFW Blog (e.g. fires, Brazil, palm oil)"
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
              <OpenMessage>Search the GFW Blog</OpenMessage>
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
            onClickResult={() => setOpen(false)}
          />
        )}
      </Wrapper>
    </>
  );
};

export default Search;

Search.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object,
  showTitle: PropTypes.bool,
  libraries: PropTypes.object,
  expanded: PropTypes.bool,
  expandable: PropTypes.bool,
};
