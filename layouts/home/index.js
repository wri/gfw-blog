import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import ReactHtmlParser from 'react-html-parser';
import { useRouter } from 'next/router';

import {
  Row,
  Column,
  theme,
  Loader,
  Paginator,
} from '@worldresources/gfw-components';
import { getPostsByType } from 'lib/api';

import Card, { CARD_MEDIA_SIZE } from 'components/card';
import Intro from 'components/intro';
import Slider from 'components/slider';

import {
  Wrapper,
  SearchMobile,
  SearchDesktop,
  Divider,
  LatestTitle,
  Hero,
} from './styles';

const HomePage = ({
  homepage,
  stickyPosts,
  posts: firstPagePosts,
  totalPages,
  categories,
}) => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const mainPost = stickyPosts?.[0] || firstPagePosts?.[0];
  const subPosts = stickyPosts?.length
    ? stickyPosts.slice(1, 4)
    : firstPagePosts?.slice(1, 4);

  const [posts, setPosts] = useState(
    stickyPosts?.length
      ? firstPagePosts
      : firstPagePosts.slice(3, firstPagePosts.length) || []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

      setPosts([...nextPosts?.posts]);
      setLoading(false);
    };

    fetchNextPosts();
  }, [page]);

  const selectPage = (selectedPage) => {
    location.assign(`/blog/?page=${selectedPage}`);
  };

  return (
    <Wrapper>
      <Row
        css={css`
          background-size: cover;
          background-image: url('images/hero-bg-mobile.png');
          margin-bottom: 1.25rem;
          max-width: 90rem;
          padding: 4.375rem 0;
          width: 100%;
          ${theme.mediaQueries.small} {
            margin-bottom: 3.125rem;
            background-image: url('images/hero-bg-desktop.png');
          }
        `}
      >
        <Column
          css={css`
            padding: 0;
          `}
          width={[1, 5 / 6]}
        >
          <Hero>
            <Intro
              title={homepage?.title}
              description={ReactHtmlParser(homepage?.excerpt)}
            />
          </Hero>
        </Column>
      </Row>
      <Row
        css={css`
          width: 100%;
          max-width: 90rem;
        `}
      >
        <Column
          css={css`
            display: block;
            height: 12rem;
            background-color: #f7f7f7;
            padding: 2rem 0;
            margin-top: -1.25rem;
            ${theme.mediaQueries.small} {
              display: none;
            }
          `}
        >
          <SearchMobile categories={categories} />
        </Column>
        <Column
          css={css`
            margin-top: -1.35rem;
            padding: 0 !important;
          `}
        >
          <SearchDesktop categories={categories} />
        </Column>
      </Row>
      {/** Desktop  */}
      <Row
        css={css`
          display: none;
          ${theme.mediaQueries.small} {
            margin-top: 3rem;
            display: flex;
            max-width: 90rem;
            padding: 0 3.75rem;
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
            max-width: 90rem;
            padding: 0 2.75rem;
          }
        `}
      >
        <Column
          css={css`
            ${theme.mediaQueries.small} {
              padding: 0;
            }
          `}
          width={[1, 1 / 2]}
        >
          <Card
            {...mainPost}
            large
            imageSize={`
              height: ${CARD_MEDIA_SIZE.MOBILE.height};

              ${theme.mediaQueries.small} {
                height: ${CARD_MEDIA_SIZE.LARGE.height};
              }
            `}
            showExcerpt={false}
          />
        </Column>
        <Column
          css={css`
            ${theme.mediaQueries.small} {
              padding: 0;
            }
          `}
          width={[1, 1 / 2]}
        >
          {subPosts?.map((post) => (
            <Card
              key={post.id}
              {...post}
              showExcerpt={false}
              isFeaturedSubPost
              imageSize={`
                height: ${CARD_MEDIA_SIZE.MOBILE.height};

                ${theme.mediaQueries.small} {
                  height: ${CARD_MEDIA_SIZE.SMALL.height};
                }
              `}
            />
          ))}
        </Column>
      </Row>
      {/** END Desktop  */}
      {/** Mobile  */}
      <Row
        css={css`
          ${theme.mediaQueries.small} {
            display: none;
          }
        `}
      >
        <Slider cards={[mainPost, ...subPosts]} title="Featured Articles" />
      </Row>
      {/** END Mobile  */}
      <Divider />
      <Row
        css={css`
          max-width: 100%;
          ${theme.mediaQueries.small} {
            padding: 0 3.75rem;
            max-width: 90.1875rem;
          }
        `}
      >
        <Column>
          <LatestTitle
            css={css`
              margin-bottom: 1.5625rem;
            `}
          >
            All articles
          </LatestTitle>
        </Column>
        {loading && (
          <div
            style={{
              position: 'relative',
              width: '3.125rem',
              height: '3.125rem',
            }}
          >
            <Loader />
          </div>
        )}
        {!loading &&
          posts?.map((post) => (
            <Column
              key={post.id}
              width={[1]}
              css={css`
                margin-bottom: 2.5rem !important;
                width: auto;
              `}
            >
              <Card
                {...post}
                imageSize={`
                    height: ${CARD_MEDIA_SIZE.MOBILE.height};

                    ${theme.mediaQueries.small} {
                      height: ${CARD_MEDIA_SIZE.MEDIUM.height};
                    }
                `}
              />
            </Column>
          ))}
        <Column
          css={css`
            padding-bottom: 5rem !important;
            padding-top: 3.75rem !important;
            display: flex;
            align-items: center;
            justify-content: center;

            ${theme.mediaQueries.small} {
              padding-bottom: 9.8125rem !important;
              padding-top: 6.25rem !important;
              padding-right: 2.8125rem !important;
              justify-content: end;
            }
          `}
        >
          <Row nested>
            <Column width={[1 / 12, 1 / 3]} />
            <Paginator
              currentPage={page}
              totalPages={totalPages}
              handleSelectPage={selectPage}
            />
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
