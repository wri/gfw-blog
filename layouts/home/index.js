import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import ReactHtmlParser from 'react-html-parser';

import {
  Row,
  Column,
  theme,
  Loader,
  Button,
} from '@worldresources/gfw-components';
import { getPostsByType } from 'lib/api';
import { trackEvent } from 'utils/analytics';

import Card from 'components/card';
import CategoryList from 'components/category-list';
import Intro from 'components/intro';

import {
  Wrapper,
  SearchMobile,
  SearchDesktop,
  Divider,
  LatestTitle,
  LoadMoreWrapper,
  Hero,
} from './styles';

const HomePage = ({
  homepage,
  stickyPosts,
  posts: firstPagePosts,
  totalPages,
  categories,
}) => {
  const mainPost = stickyPosts?.[0] || firstPagePosts?.[0];
  const subPosts = stickyPosts?.length
    ? stickyPosts.slice(1, 4)
    : firstPagePosts?.slice(1, 4);

  const [posts, setPosts] = useState(
    stickyPosts?.length
      ? firstPagePosts
      : firstPagePosts.slice(3, firstPagePosts.length) || []
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (page > 1) {
      const fetchNextPosts = async () => {
        setLoading(true);

        const nextPosts = await getPostsByType({
          type: 'posts',
          params: {
            per_page: 9,
            exclude: stickyPosts.map((s) => s.id),
            page,
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
          background-size: cover;
          background-image: url('images/hero-bg-mobile.png');
          margin-bottom: 20px;
          max-width: 100%;
          padding: 70px 0;
          width: 100%;
          ${theme.mediaQueries.small} {
            margin-bottom: 50px;
            background-image: url('images/hero-bg-desktop.png');
          }
        `}
      >
        <Column
          css={css`
            padding: 0px;
          `}
          width={[1, 5 / 6, 2 / 3]}
        >
          <Hero>
            <Intro
              title={homepage?.title}
              description={ReactHtmlParser(homepage?.excerpt)}
            />
          </Hero>
        </Column>
      </Row>
      <Row>
        <Column width={[1, 3 / 4]}>
          {categories && (
            <CategoryList
              title="categories"
              categories={categories}
              css={css`
                margin-bottom: 15px;

                ${theme.mediaQueries.small} {
                  min-height: 60px;
                }
              `}
            />
          )}
        </Column>
        <Column
          css={css`
            display: block;
            ${theme.mediaQueries.small} {
              display: none;
            }
          `}
        >
          <SearchMobile />
        </Column>
        <Column width={[1, 1 / 4]}>
          <SearchDesktop showTitle expandable />
        </Column>
      </Row>
      <Row
        css={css`
          ${theme.mediaQueries.small} {
            max-width: 100%;
            padding: 0 60px;
          }
        `}
      >
        <Column>
          <LatestTitle>Featured Articles</LatestTitle>
        </Column>
      </Row>
      <Row
        css={css`
          display: none;
          ${theme.mediaQueries.small} {
            display: flex;
            max-width: 100%;
            padding: 0 44px;
          }
        `}
      >
        <Column width={[1, 1 / 2]}>
          <Card {...mainPost} large />
        </Column>
        <Column width={[1, 1 / 2]}>
          {subPosts?.map((post) => (
            <Card key={post.id} {...post} excerpt="" isFeaturedSubPost />
          ))}
        </Column>
      </Row>
      <Divider />
      <Row
        css={css`
          max-width: 100%;
          ${theme.mediaQueries.small} {
            padding: 0 60px;
          }
        `}
      >
        <Column>
          <LatestTitle>All articles</LatestTitle>
        </Column>
        {posts?.map((post) => (
          <Column
            key={post.id}
            width={[1]}
            css={css`
              margin-bottom: 40px !important;
              width: auto;
            `}
          >
            <Card {...post} />
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

HomePage.propTypes = {
  homepage: PropTypes.object,
  stickyPosts: PropTypes.array,
  posts: PropTypes.array,
  totalPages: PropTypes.number,
  categories: PropTypes.array,
};

export default HomePage;
