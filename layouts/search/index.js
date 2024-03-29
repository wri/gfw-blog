import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import qs from 'qs';
import { theme, Loader, Paginator } from '@worldresources/gfw-components';
import { Row, Column } from 'components/grid';

import { getPostsByType, getTagBySlug, getCategoryBySlug } from 'lib/api';
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
  posts: firstPagePosts,
  totalPages: totalFirstPages,
  totalPosts: totalFirstPosts,
  searchQuery,
  categories,
  topics,
}) => {
  const router = useRouter();

  const [posts, setPosts] = useState(firstPagePosts || []);
  const [moreArticles, setMoreArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [totalPosts, setTotalPosts] = useState(totalFirstPosts || 0);
  const [totalPages, setTotalPages] = useState(totalFirstPages || 0);

  const page = Number(router.query.page) || 1;
  const postsQuantity = totalPosts < 6 ? totalPosts : 6; // 6 per page
  const searchStatementTemplate = `Showing ${postsQuantity} of ${totalPosts} posts`;

  useEffect(() => {
    setPosts(firstPagePosts);
  }, [searchQuery]);

  useEffect(() => {
    if (totalPosts <= 0) {
      const populateExploreMoreArticles = async () => {
        const articles = await getPostsByType({
          params: {
            per_page: 3, // To show only 3 items at the carousel
          },
        });

        setMoreArticles(articles.posts);
      };

      populateExploreMoreArticles();
    }
  }, []);

  useEffect(() => {
    const parsed = qs.parse(location.search, {
      comma: true,
      ignoreQueryPrefix: true,
    });
    const categoriesList =
      (parsed?.category && parsed.category?.split(',')) || [];
    const topicsList = (parsed?.topic && parsed.topic?.split(',')) || [];

    setSelectedCategories(categoriesList);
    setSelectedTopics(topicsList);
  }, []);

  useEffect(() => {
    router.push({
      pathname: `/search/${router.query.query}`,
      query: {
        ...(selectedCategories.length > 0 && {
          category: selectedCategories.join(','),
        }),
        ...(selectedTopics.length > 0 && { topic: selectedTopics.join(',') }),
        ...(page > 1 && { page }),
      },
    });

    const fetchNextPosts = async () => {
      setLoading(true);

      let topicsIds = '';
      let categoryId = '';

      if (selectedTopics.length > 0) {
        await Promise.all(
          selectedTopics.map(async (topic) => {
            const topicItem = await getTagBySlug({ slug: topic });

            topicsIds = topicsIds.concat(', ', String(topicItem.id));
          })
        );
      }

      if (selectedCategories.length > 0) {
        const categoryItem = await getCategoryBySlug({
          slug: selectedCategories[0],
        });

        categoryId = categoryId.concat(', ', String(categoryItem.id));
      }

      try {
        const nextPosts = await getPostsByType({
          params: {
            ...(topicsIds && {
              'tags[terms]': topicsIds,
              'tags[operator]': 'AND',
            }),
            ...(categoryId && { categories: categoryId }),
            per_page: 6,
            page,
            search: searchQuery,
          },
        });

        setPosts([...nextPosts?.posts]);
        setTotalPosts(nextPosts?.total);
        setTotalPages(nextPosts?.totalPages);
      } catch (err) {
        setTotalPosts(0);
      }

      setLoading(false);
    };

    fetchNextPosts();
  }, [page, selectedTopics, selectedCategories]);

  const selectPage = (selectedPage) => {
    const url = new URL(window.location);
    url.searchParams.set('page', selectedPage);

    location.assign(url);
  };

  const selectCategory = (slug) => {
    const copy = [...selectedCategories];
    if (copy.includes(slug)) {
      const index = copy.findIndex((item) => item === slug);

      copy.splice(index, 1);
    } else {
      copy[0] = slug; // just 1 category allowed to be checked at a time
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
            {totalPosts <= 0 && !loading && (
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

            {totalPosts > 0 && !loading && (
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
  searchQuery: PropTypes.string,
  categories: PropTypes.array,
  topics: PropTypes.array,
};

export default SearchPage;
