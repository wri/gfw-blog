import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import debounce from 'lodash/debounce';
import compact from 'lodash/compact';
import { CancelToken } from 'axios';
import { useRouter } from 'next/router';

import { SearchIcon, CloseIcon, Button } from '@worldresources/gfw-components';

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
  const searchQuery = query?.query ? decodeURI(query?.query) : '';

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(searchQuery);
  const [results, setResults] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const inputRef = React.createRef();

  const re = new RegExp(`(${search})`, 'i');

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      push('/search/[query]', `/search/${search}/`);
      setOpen(false);
    }
  };

  const filteredResults = results?.length
    ? results
    : [{ name: search, link: `/search/${search}/` }];

  const searchResults = compact([
    ...filteredResults,
    tags?.length ? { name: 'divider', id: 'divider' } : null,
    ...tags,
  ]).map((meta) => ({
    ...meta,
    name:
      meta.name !== 'divider'
        ? meta?.name?.replace(re, `<b>$1</b>`)
        : meta.name,
  }));

  useEffect(() => {
    if (open) inputRef.current.focus();
  }, [open]);

  let postsRequest = null;
  let tagsRequest = null;

  useEffect(
    debounce(() => {
      const fetchSearchContent = async () => {
        setLoading(true);

        if (postsRequest) {
          postsRequest.cancel();
        }
        if (tagsRequest) {
          tagsRequest.cancel();
        }

        postsRequest = CancelToken.source();
        tagsRequest = CancelToken.source();

        const postsResponse = await getPostsByType({
          type: 'posts',
          params: {
            search,
            per_page: search ? 3 : 6,
          },
          cancelToken: postsRequest.token,
          allLanguages: true,
        });

        const tagsResponse = await getTags({
          params: {
            search,
            per_page: search ? 6 : 50,
            ...(!search && {
              orderby: 'count',
              order: 'desc',
            }),
          },
          cancelToken: tagsRequest.token,
        });

        const allResults = postsResponse?.posts?.map((r) => {
          return {
            ...r,
            name: r.title,
          };
        });

        setResults(allResults);
        setTags(tagsResponse);
        setLoading(false);
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
      <Wrapper
        className="notranslate"
        {...props}
        open={open}
        expandable={expandable}
      >
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
                      height: 0.625rem;
                      width: 0.625rem;
                      max-height: 0.625rem;
                      max-width: 0.625rem;
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
              min-width: 2rem;
              min-height: 2rem;
              height: 2rem;
            `}
          />
        </Container>
        {open && (
          <ResultsList
            items={searchResults}
            onClickResult={() => setOpen(false)}
            loading={loading}
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
