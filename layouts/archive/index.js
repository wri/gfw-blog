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

import {
  Wrapper,
  ResultsStatement,
  LoadMoreWrapper,
  CategoryDescription,
  MoreArticlesWrapper,
  LatestTitle,
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
                <h1
                  css={css`
                    font-family: Fira Sans;

                    font-size: 1.625rem;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 3.75rem;
                    letter-spacing: 0.01563rem;
                    ${theme.mediaQueries.small} {
                      font-size: 3.75rem;
                    }
                  `}
                >
                  No Results for &ldquo;
                  {searchQuery}
                  &rdquo;
                </h1>
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
        <Row
          css={css`
            display: flex;
            flex-flow: column;
            justify-content: space-between;
            align-items: center;
            margin: 2rem auto;
            height: 6.25rem;

            ${theme.mediaQueries.small} {
              margin: 3.875rem auto;
              flex-flow: row;
              justify-content: space-between;
            }
          `}
        >
          <Column
            css={css`
              display: flex;
            `}
          >
            <div
              css={css`
                margin-right: 1rem;
                display: flex;
                align-items: start;
              `}
            >
              <span
                css={css`
                  font-size: 14px;
                  line-height: 21px;
                  color: #777;
                  text-align: right;
                  margin-right: 0.3125rem;
                `}
              >
                FILTER BY CATEGORY
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M8.95703 17.6644L1.59581 4.91443L16.3182 4.91443L8.95703 17.6644Z"
                  fill="#AAAAAA"
                />
              </svg>
            </div>
            <div
              css={css`
                margin-right: 0.625rem;
                display: flex;
                align-items: start;
              `}
            >
              <span
                css={css`
                  font-size: 14px;
                  line-height: 21px;
                  color: #777;
                  margin-right: 0.3125rem;

                  ${theme.mediaQueries.small} {
                    text-align: right;
                  }
                `}
              >
                FILTER BY TOPIC
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M8.95703 17.6644L1.59581 4.91443L16.3182 4.91443L8.95703 17.6644Z"
                  fill="#AAAAAA"
                />
              </svg>
            </div>
          </Column>
          <Column>
            <ResultsStatement
              css={css`
                text-align: right;

                ${theme.mediaQueries.small} {
                  text-align: right;
                }
              `}
            >
              {translateText(resultsStatement.toUpperCase(), { totalPosts })}
            </ResultsStatement>
          </Column>
        </Row>

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
                <LatestTitle
                  css={css`
                    font-size: 3rem;
                    font-weight: 400;
                    line-height: 3rem;
                    letter-spacing: 0.25px;
                    text-align: center;
                    text-transform: capitalize;
                    padding-top: 30px;
                  `}
                >
                  Explore More Articles
                </LatestTitle>
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
        <Row
          css={css`
            background-size: cover;
            background-image: url('images/hero-bg-mobile.png');
            max-width: 100%;
            width: 100%;
            height: 15.625rem;

            ${theme.mediaQueries.small} {
              background-image: url('images/hero-bg-desktop.png');
              height: 20.5625rem;
            }
          `}
        >
          <Column
            css={css`
              display: flex;
              flex-flow: column;
              justify-content: center;
              align-items: center;
              background-size: cover;
              background-position: center;
              background-image: url('../../images/no-results-bg.png');
            `}
          >
            <h2
              css={css`
                color: rgb(255, 255, 255);
                font-size: 1.25rem;
                margin-bottom: 2.25rem;
                font-family: Fira Sans;
                font-style: normal;
                font-weight: 400;
                line-height: 3rem;
                letter-spacing: 0.01563rem;
                text-align: center;

                ${theme.mediaQueries.small} {
                  font-size: 2.5rem;
                }
              `}
            >
              Not Finding What You&apos;re Looking For?
            </h2>
            <Button
              css={css`
                color: rgb(151, 190, 50);
                font-size: 0.875rem;

                ${theme.mediaQueries.small} {
                  font-size: 1rem;
                }
              `}
              onClick={() => setOpen(!open)}
              light
              size="large"
            >
              Contact Us
            </Button>
          </Column>
        </Row>
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
