import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link';

import { Row, Column, theme, Loader, Button } from 'gfw-components';
import { getPostsByType } from 'lib/api';

import Card from 'components/card';
import CategoryList from 'components/category-list';
import Featured from 'components/featured';
import Intro from 'components/intro';

import {
  Wrapper,
  SearchMobile,
  SearchDesktop,
  FeatureWrapper,
  Divider,
  LatestTitle,
  LoadMoreWrapper,
} from './styles';

const HomePage = ({
  homepage,
  stickyPosts,
  posts: firstPagePosts,
  totalPages,
  categories,
}) => {
  const mainPost = stickyPosts[0];
  const subPosts = stickyPosts.slice(1, 3);

  const [posts, setPosts] = useState(firstPagePosts || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (page > 1) {
      const fetchNextPosts = async () => {
        setLoading(true);

        const nextPosts = await getPostsByType({
          type: 'posts',
          params: {
            per_page: 6,
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
          margin-bottom: 20px;
          ${theme.mediaQueries.small} {
            margin-bottom: 50px;
          }
        `}
      >
        <Column>
          <SearchMobile />
        </Column>
        <Column width={[1, 5 / 6, 2 / 3]}>
          <Intro
            title={homepage?.title}
            description={ReactHtmlParser(homepage?.excerpt)}
          />
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
        <Column width={[1, 1 / 4]}>
          <SearchDesktop showTitle expandable />
        </Column>
      </Row>
      <FeatureWrapper
        css={css`
          position: relative;
          z-index: 1;
          margin-bottom: 40px;
        `}
      >
        <Link href={mainPost?.link}>
          <a>
            <Featured {...mainPost} />
          </a>
        </Link>
      </FeatureWrapper>
      <Row
        css={css`
          position: relative;
          z-index: 1;
        `}
      >
        {subPosts?.map((post) => (
          <Column
            key={post.id}
            width={[1, 1 / 2]}
            css={css`
              margin-bottom: 40px !important;
            `}
          >
            <Link href={post?.link}>
              <a>
                <Card {...post} large />
              </a>
            </Link>
          </Column>
        ))}
      </Row>
      <Divider />
      <Row>
        <Column>
          <LatestTitle>Latest articles</LatestTitle>
        </Column>
        {posts?.map((post) => (
          <Column
            key={post.id}
            width={[1, 1 / 2, 1 / 3]}
            css={css`
              margin-bottom: 40px !important;
            `}
          >
            <Link href={post?.link}>
              <a>
                <Card {...post} />
              </a>
            </Link>
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
                  onClick={() => setPage(page + 1)}
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
