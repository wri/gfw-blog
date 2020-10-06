import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Row, Column, theme, Loader, Button } from 'gfw-components';
import compact from 'lodash/compact';

import { getPostsByType } from 'lib/api';

import Link from 'next/link';
import Card from 'components/card';
import Breadcrumbs from 'components/breadcrumbs';
import Dropdown from 'components/dropdown';

import {
  Wrapper,
  SearchMobile,
  SearchDesktop,
  ResultsStatement,
  LoadMoreWrapper,
} from './styles';

const SearchPage = ({
  tag,
  tags,
  isSearch,
  posts: firstPagePosts,
  totalPages,
  totalPosts,
  searchQuery,
}) => {
  const articleText = totalPosts === 1 ? 'article' : 'articles';

  const searchStatement =
    isSearch &&
    searchQuery &&
    `${totalPosts} ${articleText} with the keyword ${decodeURI(searchQuery)}`;
  const tagStatement =
    !isSearch && `${totalPosts} ${articleText} tagged with ${tag?.name}`;

  const resultsStatement = isSearch ? searchStatement : tagStatement;

  const taxFromList = tags?.find((tax) => tax.id === tag?.id);
  const allTaxOptions =
    tags && (taxFromList ? tags : [{ ...tag, count: totalPosts }, ...tags]);

  const breadCrumbs = compact([
    {
      label: isSearch ? 'Search' : 'Tags',
    },
    searchQuery &&
      isSearch && {
        label: decodeURI(searchQuery),
      },
    !isSearch && {
      label: tag?.name,
    },
  ]);

  const [posts, setPosts] = useState(firstPagePosts || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPosts(firstPagePosts);
  }, [tag?.id, searchQuery]);

  useEffect(() => {
    if (page > 1) {
      const fetchNextPosts = async () => {
        setLoading(true);

        const nextPosts = await getPostsByType({
          type: 'posts',
          params: {
            per_page: 9,
            page,
          },
        });

        setPosts([...posts, ...nextPosts?.posts]);
        setLoading(false);
      };

      fetchNextPosts();
    }
  }, [page]);

  return (
    <Wrapper>
      <Row
        css={css`
          position: relative;
          min-height: 40px;
        `}
      >
        <Column width={[3 / 4]}>
          <Breadcrumbs
            css={css`
              margin-bottom: 25px;
              ${theme.mediaQueries.small} {
                margin-bottom: 40px;
              }
            `}
            links={breadCrumbs}
          />
        </Column>
        {!isSearch && (
          <Column width={[1 / 4]}>
            <SearchMobile expandable />
          </Column>
        )}
        {isSearch && (
          <>
            <Column>
              <SearchDesktop expanded isSearch />
            </Column>
          </>
        )}
      </Row>
      {!isSearch && (
        <Row
          css={css`
            position: relative;
          `}
        >
          <Column width={[1, 2 / 3]}>
            <Dropdown items={allTaxOptions} selected={tag?.id} />
          </Column>
          <Column width={[1, 1 / 3]}>
            <SearchDesktop showTitle expandable />
          </Column>
        </Row>
      )}
      <Row>
        <Column
          css={css`
            margin-bottom: 50px !important;
          `}
        >
          <ResultsStatement>{resultsStatement}</ResultsStatement>
        </Column>
        {posts?.map(({ id, link, ...rest }) => (
          <Column
            width={[1, 1 / 2, 1 / 3]}
            css={css`
              margin-bottom: 40px !important;
            `}
            key={id}
          >
            <Link href={link}>
              <a>
                <Card {...rest} />
              </a>
            </Link>
          </Column>
        ))}
        <Column>
          <Row nested>
            <Column width={[1 / 12, 1 / 3]} />
            <LoadMoreWrapper width={[5 / 6, 1 / 3]}>
              {loading && (
                <div
                  style={{
                    position: 'relative',
                    width: '50px',
                    height: '50px',
                  }}
                >
                  <Loader />
                </div>
              )}
              {!loading && page < totalPages && (
                <Button
                  onClick={() => setPage(page + 1)}
                  css={css`
                    width: 100%;
                  `}
                >
                  Load more articles
                </Button>
              )}
            </LoadMoreWrapper>
          </Row>
        </Column>
      </Row>
    </Wrapper>
  );
};

SearchPage.propTypes = {
  tag: PropTypes.object,
  tags: PropTypes.array,
  posts: PropTypes.array,
  totalPosts: PropTypes.number,
  totalPages: PropTypes.number,
  isSearch: PropTypes.bool,
  searchQuery: PropTypes.string,
};

export default SearchPage;
