import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import {
  Row,
  Column,
  theme,
  Loader,
  Button,
  ContactUsModal,
} from '@worldresources/gfw-components';

import { getPostsByType } from 'lib/api';
import { trackEvent } from 'utils/analytics';
import { translateText } from 'utils/lang';

import Card, { CARD_MEDIA_SIZE } from 'components/card';
import Dropdown from 'components/dropdown';
import Slider from 'components/slider';
import BackButton from 'components/back-button';

import FilterArrowIcon from 'assets/icons/filter-arrow.svg';

import {
  Wrapper,
  ResultsStatement,
  LoadMoreWrapper,
  CategoryDescription,
  MoreArticlesWrapper,
  LatestTitle,
  NoResultsTitle,
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
  const postsQuantity = totalPosts <= 0 ? 0 : 12; // 12 per page

  const searchStatementTemplate =
    isSearch && searchQuery && `Showing ${postsQuantity} of ${totalPosts}`;

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
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setPosts(firstPagePosts);
  }, [tax?.id, searchQuery]);

  useEffect(() => {
    if (isSearch && totalPosts <= 0) {
      const populateExploreMoreArticles = async () => {
        const articles = await getPostsByType({});

        setMoreArticles(articles.posts);
      };

      populateExploreMoreArticles();
    }
  }, []);

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
                <NoResultsTitle css={css``}>
                  No Results for &ldquo;
                  {searchQuery}
                  &rdquo;
                </NoResultsTitle>
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
            <ResultsStatement
              css={css`
                text-align: right;
              `}
            >
              {translateText(resultsStatement.toUpperCase(), { totalPosts })}
            </ResultsStatement>
          </Column>
        </FilterByWrapper>

        {totalPosts > 0 && (
          <Row>
            {posts?.map(({ id, ...rest }) => (
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
                moreArticles.slice(0, 3).map((p) => (
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
              Not Finding What You&apos;re Looking For?
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
