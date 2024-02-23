import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import { Row, Column, Loader, Paginator } from '@worldresources/gfw-components';

import { getPostsByType } from 'lib/api';
import { translateText } from 'utils/lang';

import Card from 'components/card';
import BackButton from 'components/back-button';
import Filter from 'components/filter';
import { SearchDesktop, SearchMobile } from '../home/styles';

import {
  Wrapper,
  SearchRow,
  SearchMobileColumn,
  SearchDesktopColumn,
  BackButtonRow,
  TitleRow,
  ResultsStatement,
  ResultsTitle,
  PaginationColumn,
} from '../search/styles';

const ArchivePage = ({
  taxType,
  tax,
  // eslint-disable-next-line no-unused-vars
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

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

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

  const selectCategory = (slug) => {
    const copy = [...selectedCategories];
    if (copy.includes(slug)) {
      const index = copy.findIndex((item) => item === slug);

      copy.splice(index, 1);
    } else {
      copy.push(slug);
    }

    setSelectedCategories(copy);
  };

  const selectTopic = (slug) => {
    const copy = [...selectedTopics];
    if (copy.includes(slug)) {
      const index = copy.findIndex((item) => item === slug);

      copy.splice(index, 1);
    } else {
      copy.push(slug);
    }

    setSelectedTopics(copy);
  };

  return (
    <>
      <Wrapper>
        <Row
          css={css`
            max-width: 90rem;
          `}
        >
          <SearchRow>
            <SearchMobileColumn>
              <SearchMobile categories={categories} topics={topics} />
            </SearchMobileColumn>
            <SearchDesktopColumn>
              <SearchDesktop categories={categories} topics={topics} />
            </SearchDesktopColumn>
          </SearchRow>
        </Row>

        <BackButtonRow>
          <BackButton
            handleClick={() => router.push('/')}
            title="back to all articles"
          />
        </BackButtonRow>

        <Row>
          <TitleRow>
            {totalPosts <= 0 && (
              <>
                <Column>
                  <ResultsTitle>
                    No results for &ldquo;
                    {searchQuery}
                    &rdquo;
                  </ResultsTitle>
                </Column>
              </>
            )}
          </TitleRow>

          <Filter
            categories={categories}
            topics={topics}
            selectedCategories={selectedCategories}
            selectedTopics={selectedTopics}
            handleSelectedCategory={selectCategory}
            handleSelectedTopic={selectTopic}
          >
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
