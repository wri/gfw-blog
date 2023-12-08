import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import {
  Row,
  Column,
  theme,
  Loader,
  Button,
  ContactUsModal,
} from '@worldresources/gfw-components';
import compact from 'lodash/compact';

import { getPostsByType } from 'lib/api';
import { trackEvent } from 'utils/analytics';
import { translateText } from 'utils/lang';

import Card from 'components/card';
import Breadcrumbs from 'components/breadcrumbs';
import Dropdown from 'components/dropdown';
// import Slider from 'components/slider'

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

  const searchStatementTemplate =
    isSearch &&
    searchQuery &&
    `{totalPosts} ${articleText} with the keyword ${decodeURI(searchQuery)}`;

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
  const [open, setOpen] = useState(false);

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
    <>
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
                <h1
                  css={css`
                    font-size: 3.75rem;
                  `}
                >
                  No Results for Lorem Ipsum
                </h1>
                {/* <SearchDesktop expanded isSearch /> */}
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
            <ResultsStatement>
              {translateText(resultsStatement, { totalPosts })}
            </ResultsStatement>
          </Column>
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

        <Row>
          {/* <Slider cards={[mainPost, ...subPosts]} title="Featured Articles" /> */}
        </Row>
        {/* <Row
          css={css`
            ${theme.mediaQueries.small} {
              display: none;
            }
          `}
        >
          <Slider
            cards={relatedPosts}
            title='Explore More Articles'
            backgroundImageUrl='../../images/prefooter-mobile.png'
          />
        </Row> */}
      </Wrapper>
      <Row
        css={css`
          background-size: cover;
          background-image: url('images/hero-bg-mobile.png');
          max-width: 100%;
          width: 100%;
          height: 20.5625rem;
          ${theme.mediaQueries.small} {
            background-image: url('images/hero-bg-desktop.png');
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
              font-size: 2.5rem;
              color: #fff;
              margin-bottom: 2.25rem;
              font-family: Fira Sans;
              font-style: normal;
              font-weight: 400;
              line-height: 3rem;
              letter-spacing: 0.01563rem;
              text-align: center;
            `}
          >
            Not Finding What You&apos;re Looking For?
          </h2>
          <Button
            css={css`
              color: rgb(151, 190, 50);
              font-size: 1rem;
            `}
            onClick={() => setOpen(!open)}
            light
            size="large"
          >
            Contact Us
          </Button>
        </Column>
      </Row>
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
