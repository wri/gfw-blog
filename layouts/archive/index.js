import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Row, Column, theme, Loader, Button } from 'gfw-components';
import compact from 'lodash/compact';

import { getPostsByType } from 'lib/api';
import { trackEvent } from 'utils/analytics';

import Card from 'components/card';
import Breadcrumbs from 'components/breadcrumbs';
import Dropdown from 'components/dropdown';

import {
  Wrapper,
  SearchMobile,
  SearchDesktop,
  ResultsStatement,
  LoadMoreWrapper,
  CategoryDescription,
} from './styles';

const ArchivePage = ({
  taxType,
  tax,
  allTax,
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

  const taxStatement =
    taxType === 'categories'
      ? `${totalPosts} ${articleText} under the ${tax?.name} category`
      : `${totalPosts} ${articleText} tagged with ${tax?.name}`;

  const resultsStatement = isSearch ? searchStatement : taxStatement;

  const taxFromList = allTax?.find((t) => t.id === tax?.id);
  const allTaxOptions =
    allTax &&
    (taxFromList ? allTax : [{ ...tax, count: totalPosts }, ...allTax]);

  const breadCrumbs = compact([
    isSearch && {
      label: 'Search',
    },
    taxType === 'tags' && {
      label: 'Tag',
    },
    searchQuery &&
      isSearch && {
        label: decodeURI(searchQuery),
      },
    !isSearch && {
      label: tax?.name,
    },
  ]);

  const [posts, setPosts] = useState(firstPagePosts || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPosts(firstPagePosts);
  }, [tax?.id, searchQuery]);

  useEffect(() => {
    if (page > 1) {
      const fetchNextPosts = async () => {
        setLoading(true);

        const nextPosts = await getPostsByType({
          type: 'posts',
          params: {
            per_page: 12,
            page,
            ...(isSearch && {
              search: searchQuery,
            }),
            ...(taxType && {
              [taxType]: tax?.id,
            }),
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
            <Dropdown items={allTaxOptions} selected={tax?.id} />
          </Column>
          <Column width={[1, 1 / 3]}>
            <SearchDesktop showTitle expandable />
          </Column>
          {tax?.description && (
            <Column
              width={[1, 3 / 4]}
              css={css`
                margin-bottom: 20px !important;
              `}
            >
              <CategoryDescription>{tax.description}</CategoryDescription>
            </Column>
          )}
        </Row>
      )}
      <Row>
        <Column
          css={css`
            margin-bottom: 20px !important;
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
            <Card {...rest} />
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
                  onClick={() => {
                    setPage(page + 1);
                    trackEvent({
                      category: 'GFW Blog',
                      label: 'User clicks on more articles button',
                      action: 'Load more articles',
                    });
                  }}
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

ArchivePage.propTypes = {
  taxType: PropTypes.string,
  tax: PropTypes.object,
  allTax: PropTypes.array,
  posts: PropTypes.array,
  totalPosts: PropTypes.number,
  totalPages: PropTypes.number,
  isSearch: PropTypes.bool,
  searchQuery: PropTypes.string,
};

export default ArchivePage;
