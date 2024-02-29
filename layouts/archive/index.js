import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import { Row, Column, Loader, Paginator } from '@worldresources/gfw-components';

import { getPostsByTaxonomy } from 'lib/api';
import { translateText } from 'utils/lang';

import Card from 'components/card';
import BackButton from 'components/back-button';
import Filter from 'components/filter';
import qs from 'qs';
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
  posts: firstPagePosts,
  totalPages: totalFirstPages,
  totalPosts: totalFirstPosts,
  categories,
  topics,
}) => {
  const router = useRouter();
  const [posts, setPosts] = useState(firstPagePosts || []);
  const [loading, setLoading] = useState(false);
  const [totalPosts, setTotalPosts] = useState(totalFirstPosts || 0);
  const [totalPages, setTotalPages] = useState(totalFirstPages || 0);

  const page = Number(router.query.page) || 1;
  const postsQuantity = totalPosts < 6 ? totalPosts : posts?.length; // 6 per page
  const taxStatementTemplate = `Showing ${postsQuantity} of ${totalPosts} posts`;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const firstRender = useRef(true);

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
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const setRoute = () => {
      router.push({
        pathname: '/category-and-topics/',
        query: {
          ...(selectedCategories.length > 0 && {
            category: selectedCategories.join(','),
          }),
          ...(selectedTopics.length > 0 && { topic: selectedTopics.join(',') }),
          ...(page > 1 && { page }),
        },
      });
    };

    const fetchPostsByTaxonomy = async () => {
      setLoading(true);
      const postsByTaxonomy = await getPostsByTaxonomy({
        params: {
          per_page: 6,
          page,
          topic: selectedTopics.join(','),
          category: selectedCategories.join(','),
        },
      });

      setPosts(postsByTaxonomy?.posts);
      setTotalPosts(postsByTaxonomy?.totalPosts);
      setTotalPages(postsByTaxonomy?.totalPages);
      setLoading(false);
    };

    setRoute();
    fetchPostsByTaxonomy();
  }, [selectedCategories, selectedTopics, page]);

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
            <Column>
              <ResultsTitle>Filter by category and topics</ResultsTitle>
            </Column>
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

          {!loading && totalPosts <= 0 && (
            <Row>No articles found for this filter</Row>
          )}
        </Row>
      </Wrapper>
    </>
  );
};

ArchivePage.propTypes = {
  taxType: PropTypes.string,
  tax: PropTypes.object,
  posts: PropTypes.array,
  totalPosts: PropTypes.number,
  totalPages: PropTypes.number,
  categories: PropTypes.array,
  topics: PropTypes.array,
};

export default ArchivePage;
