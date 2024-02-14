import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import {
  Row,
  Column,
  Loader,
  Paginator,
  theme,
} from '@worldresources/gfw-components';

import { getPostsByType } from 'lib/api';
import { translateText } from 'utils/lang';

import Card from 'components/card';
import Dropdown from 'components/dropdown';
import BackButton from 'components/back-button';
import Filter from 'components/filter';
import { SearchDesktop, SearchMobile } from '../home/styles';

import {
  Wrapper,
  BackButtonRow,
  ResultsStatement,
  CategoryDescription,
  PaginationColumn,
} from './styles';

const ArchivePage = ({
  taxType,
  tax,
  allTax,
  posts: firstPagePosts,
  totalPages,
  totalPosts,
  searchQuery,
  categories,
  topics,
}) => {
  const router = useRouter();

  const [posts, setPosts] = useState(firstPagePosts || []);
  const [loading, setLoading] = useState(false);

  const page = Number(router.query.page) || 1;
  const postsQuantity = totalPosts < 6 ? totalPosts : 6; // 6 per page
  const taxStatementTemplate = `Showing ${postsQuantity} of ${totalPosts} posts`;
  const taxFromList = allTax?.find((t) => t.id === tax?.id);
  const allTaxOptions =
    allTax &&
    (taxFromList ? allTax : [{ ...tax, count: totalPosts }, ...allTax]);

  useEffect(() => {
    setPosts(firstPagePosts);
  }, [tax?.id, searchQuery]);

  useEffect(() => {
    const fetchNextPosts = async () => {
      setLoading(true);
      const nextPosts = await getPostsByType({
        type: 'posts',
        params: {
          per_page: 6,
          page,
          ...(taxType && {
            [taxType]: tax?.id,
          }),
        },
      });

      setPosts([...nextPosts?.posts]);
      setLoading(false);
    };

    fetchNextPosts();
  }, [page]);

  const selectPage = (selectedPage) => {
    location.assign(`${location.pathname}?page=${selectedPage}`);
  };

  return (
    <>
      <Wrapper>
        <Row
          css={css`
            width: 100%;
            max-width: 90rem !important;
            position: fixed;
            z-index: 10;

            ${theme.mediaQueries.small} {
              margin-top: 3.1rem;
            }
          `}
        >
          <Column
            css={css`
              display: block;
              height: 12rem;
              background-color: #f7f7f7;
              padding: 2rem 0;
              ${theme.mediaQueries.small} {
                display: none;
              }
            `}
          >
            <SearchMobile categories={categories} topics={topics} />
          </Column>
          <Column
            css={css`
              margin-top: -1.35rem;
              padding: 0 !important;
              position: fixed;
            `}
          >
            <SearchDesktop categories={categories} topics={topics} />
          </Column>
        </Row>
        <BackButtonRow>
          <BackButton
            handleClick={() => router.push('/')}
            title="back to all articles"
          />
        </BackButtonRow>

        <Row>
          <Row>
            <Column width={[1, 2 / 3]}>
              <Dropdown items={allTaxOptions} selected={tax?.id} />
            </Column>
            {tax?.description && (
              <Column
                width={[1, 3 / 4]}
                css={css`
                  margin-bottom: 1.25rem !important;
                `}
              >
                <CategoryDescription>{tax.description}</CategoryDescription>
              </Column>
            )}
          </Row>

          <Filter>
            <ResultsStatement>
              {translateText(taxStatementTemplate.toUpperCase(), {
                totalPosts,
              })}
            </ResultsStatement>
          </Filter>

          {loading && (
            <div
              style={{
                width: '3.125rem',
                height: '3.125rem',
              }}
            >
              <Loader />
            </div>
          )}

          {!loading && totalPosts > 0 && (
            <Row>
              {posts?.map(({ id, ...rest }) => (
                <Column
                  css={css`
                    margin-bottom: 2.5rem !important;
                  `}
                  key={id}
                >
                  <Card {...rest} />
                </Column>
              ))}

              <PaginationColumn>
                <Row nested>
                  <Paginator
                    currentPage={page}
                    totalPages={totalPages}
                    handleSelectPage={selectPage}
                  />
                </Row>
              </PaginationColumn>
            </Row>
          )}
        </Row>
      </Wrapper>
    </>
  );
};

ArchivePage.propTypes = {
  taxType: PropTypes.string,
  tax: PropTypes.object,
  allTax: PropTypes.array,
  posts: PropTypes.array,
  totalPosts: PropTypes.number,
  totalPages: PropTypes.number,
  searchQuery: PropTypes.string,
  categories: PropTypes.array,
  topics: PropTypes.array,
};

export default ArchivePage;
