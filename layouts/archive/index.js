import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import {
  Row,
  Column,
  theme,
  ContactUsModal,
  Paginator,
} from '@worldresources/gfw-components';

import { getPostsByType } from 'lib/api';
// import { trackEvent } from 'utils/analytics'
import { translateText } from 'utils/lang';

import Card, { CARD_MEDIA_SIZE } from 'components/card';
import Dropdown from 'components/dropdown';
import Slider from 'components/slider';
import BackButton from 'components/back-button';

import FilterArrowIcon from 'assets/icons/filter-arrow.svg';

import {
  Wrapper,
  ResultsStatement,
  CategoryDescription,
  MoreArticlesWrapper,
  LatestTitle,
  ResultsTitle,
  NotFindWhatYoureLookingForWrapper,
  NotFindWhatYoureLookingForColumn,
  NotFindWhatYoureLookingForTitle,
  FilterByWrapper,
  FilterByColumn,
  FilterByTopic,
  FilterByCategory,
  ContactUs,
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
  const router = useRouter();
  const articleText = totalPosts === 1 ? 'article' : 'articles';
  const postsQuantity = totalPosts < 12 ? totalPosts : 12; // 12 per page

  const searchStatementTemplate =
    isSearch &&
    searchQuery &&
    `Showing ${postsQuantity} of ${totalPosts} posts`;

  const taxStatementTemplate =
    taxType === 'categories'
      ? `{totalPosts} ${articleText} under the ${tax?.name} category`
      : `{totalPosts} ${articleText} tagged with ${tax?.name}`;

  const resultsStatement = isSearch
    ? searchStatementTemplate
    : taxStatementTemplate;

  const taxFromList = allTax?.find((t) => t.id === tax?.id);
  const allTaxOptions =
    allTax &&
    (taxFromList ? allTax : [{ ...tax, count: totalPosts }, ...allTax]);

  const [posts, setPosts] = useState(firstPagePosts || []);
  const [moreArticles, setMoreArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setPosts(firstPagePosts);
  }, [tax?.id, searchQuery]);

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
    if (page > 1) {
      const fetchNextPosts = async () => {
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
      };

      fetchNextPosts();
    }
  }, [page]);

  const selectPage = (selectedPage) => {
    location.assign(`${location.pathname}?page=${selectedPage}`);

    setPage(selectedPage);
  };

  return (
    <>
      <Wrapper>
        <Row>
          <BackButton
            handleClick={() => router.push('/')}
            title="back to all articles"
          />

          {isSearch && totalPosts <= 0 && (
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

          {isSearch && totalPosts > 0 && (
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
        </Row>

        {!isSearch && (
          <Row>
            <Column width={[1, 2 / 3]}>
              <Dropdown items={allTaxOptions} selected={tax?.id} />
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

        <FilterByWrapper>
          <Column
            css={css`
              display: flex;
            `}
          >
            <FilterByColumn>
              <FilterByCategory>FILTER BY CATEGORY</FilterByCategory>
              <FilterArrowIcon />
            </FilterByColumn>
            <FilterByColumn>
              <FilterByTopic>FILTER BY TOPIC</FilterByTopic>
              <FilterArrowIcon />
            </FilterByColumn>
          </Column>
          <Column>
            <ResultsStatement>
              {translateText(resultsStatement.toUpperCase(), { totalPosts })}
            </ResultsStatement>
          </Column>
        </FilterByWrapper>

        {totalPosts > 0 && (
          <Row>
            {posts?.map(({ id, ...rest }) => (
              <Column
                css={css`
                  margin-bottom: 40px !important;
                `}
                key={id}
              >
                <Card {...rest} />
              </Column>
            ))}

            <Row nested>
              <Column width={[1 / 12, 1 / 3]} />
              <Paginator
                currentPage={page}
                totalPages={totalPages}
                handleSelectPage={selectPage}
              />
            </Row>
          </Row>
        )}

        {totalPosts <= 0 && (
          <MoreArticlesWrapper>
            <Row
              css={css`
                padding: 20px 0;
              `}
            >
              <Column>
                <LatestTitle>Explore More Articles</LatestTitle>
              </Column>
              {moreArticles &&
                moreArticles.map((p) => (
                  <Column
                    width={[1, 1 / 2, 1 / 3]}
                    css={css`
                      margin-bottom: 40px !important;
                    `}
                    key={p?.id}
                  >
                    <Card
                      {...p}
                      large
                      textColor="black"
                      imageSize={`
                        height: ${CARD_MEDIA_SIZE.MOBILE.height};

                        ${theme.mediaQueries.small} {
                          height: ${CARD_MEDIA_SIZE.MEDIUM.height};
                        }
                      `}
                    />
                  </Column>
                ))}
            </Row>
          </MoreArticlesWrapper>
        )}

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
      </Wrapper>

      {totalPosts <= 0 && (
        <NotFindWhatYoureLookingForWrapper>
          <NotFindWhatYoureLookingForColumn>
            <NotFindWhatYoureLookingForTitle>
              Not finding what you&apos;re looking for?
            </NotFindWhatYoureLookingForTitle>
            <ContactUs onClick={() => setOpen(!open)} light size="large">
              Contact Us
            </ContactUs>
          </NotFindWhatYoureLookingForColumn>
        </NotFindWhatYoureLookingForWrapper>
      )}

      <ContactUsModal open={open} onRequestClose={() => setOpen(false)} />
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
  isSearch: PropTypes.bool,
  searchQuery: PropTypes.string,
};

export default ArchivePage;
