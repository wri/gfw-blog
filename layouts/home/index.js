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

import Card from 'components/card';
import CategoryList from 'components/category-list';
import Intro from 'components/intro';

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
  const currentPage = Number(router.query.page) || 1;
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
  const [page, setPage] = useState(currentPage);

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
    setPage(selectedPage);

    history.pushState(null, '', `/blog/?page=${selectedPage}`);
  };

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
        {!loading &&
          posts?.map((post) => (
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
        <Column
          css={css`
            padding-bottom: 80px !important;
            padding-top: 60px !important;
            display: flex;
            align-items: center;
            justify-content: center;

            ${theme.mediaQueries.small} {
              padding-bottom: 157px !important;
              padding-top: 100px !important;
              padding-right: 45px !important;
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
