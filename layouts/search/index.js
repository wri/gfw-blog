import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import {
  Row,
  Column,
  theme,
  Loader,
  Paginator,
} from '@worldresources/gfw-components';

import { getPostsByType } from 'lib/api';
import { translateText } from 'utils/lang';

import Card from 'components/card';
import Slider from 'components/slider';
import BackButton from 'components/back-button';
import ExploreMore from 'components/explore-more';
import Filter from 'components/filter';
import NotFindWhatYoureLookingFor from 'components/not-find-what-youre-looking-for';

import { SearchMobile, SearchDesktop } from '../home/styles';

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
} from './styles';

const SearchPage = ({
  isSearch,
  posts: firstPagePosts,
  totalPages,
  totalPosts,
  searchQuery,
  categories,
  topics,
}) => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const postsQuantity = totalPosts < 6 ? totalPosts : 6; // 6 per page
  const searchStatementTemplate = `Showing ${postsQuantity} of ${totalPosts} posts`;

  const [posts, setPosts] = useState(firstPagePosts || []);
  const [moreArticles, setMoreArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

  useEffect(() => {
    setPosts(firstPagePosts);
  }, [searchQuery]);

  useEffect(() => {
    if (isSearch && totalPosts <= 0) {
      const populateExploreMoreArticles = async () => {
        const articles = await getPostsByType({});

        // To show only 3 items at the carousel
        const slicedArticleList = articles.posts.slice(0, 3);

        setMoreArticles(slicedArticleList);
      };

      populateExploreMoreArticles();
    }
  }, []);

  useEffect(() => {
    const fetchNextPosts = async () => {
      setLoading(true);
      const nextPosts = await getPostsByType({
        type: 'posts',
        params: {
          per_page: 6,
          page,
          search: searchQuery,
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

            {totalPosts > 0 && (
              <>
                <Column>
                  <ResultsTitle>
                    Results for &ldquo;
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
              {translateText(searchStatementTemplate.toUpperCase(), {
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

          {totalPosts <= 0 && <ExploreMore moreArticles={moreArticles} />}

          {totalPosts <= 0 && (
            <Row
              css={css`
                ${theme.mediaQueries.small} {
                  display: none;
                }
              `}
            >
              <Slider cards={moreArticles} title="Explore More Articles" />
            </Row>
          )}
        </Row>
      </Wrapper>

      {totalPosts <= 0 && (
        <NotFindWhatYoureLookingFor setOpen={setOpen} open={open} />
      )}
    </>
  );
};

SearchPage.propTypes = {
  posts: PropTypes.array,
  totalPosts: PropTypes.number,
  totalPages: PropTypes.number,
  isSearch: PropTypes.bool,
  searchQuery: PropTypes.string,
  categories: PropTypes.array,
  topics: PropTypes.array,
};

export default SearchPage;
