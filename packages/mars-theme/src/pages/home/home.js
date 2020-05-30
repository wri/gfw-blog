/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';

import { Row, Column } from 'gfw-components';

import BlogHeader from './intro';
import CategoryList from '../../components/category-list';
import Featured from '../../components/featured';
import Card from '../../components/card';
import LoadMore from '../../components/load-more';

import {
  Wrapper,
  SearchMobile,
  SearchDesktop,
  FeatureWrapper,
  Divider,
  LatestTitle,
  LoadMoreWrapper,
} from './styles';

const POSTS_PER_PAGE = 9;

const HomePage = ({ state }) => {
  const [isFetching, setIsFetching] = useState(false);
  const { link } = state.router;

  const { categories } = state.source.data['all-categories/'];
  const mainCategories = categories.filter(
    (cat) => cat.slug !== 'uncategorized'
  );

  const data = state.source.get(state.router.link);
  const initialPosts = [...data.items];
  const mainPosts = initialPosts.splice(0, 1);
  const subPosts = initialPosts.splice(0, 2);
  const [posts, setPosts] = useState({
    [state.router.link]: initialPosts.map(({ id, type }) => ({ id, type })),
  });
  const { totalPages } = data;
  const [page, setPage] = useState(1);

  useEffect(() => {
    let fetchingAllData = true;
    let lastLoadedPage = 1;
    const loadedPosts = [];
    while (fetchingAllData) {
      const getLink =
        link[1] === '?'
          ? `page/${lastLoadedPage + 1}${link}`
          : `${link}page/${lastLoadedPage + 1}`;
      const pageData = state.source.get(getLink);
      if (pageData && pageData.items) {
        lastLoadedPage++;
        loadedPosts.push(...pageData.items);
      } else {
        fetchingAllData = false;
      }
    }
    const finalPosts = [...initialPosts, ...loadedPosts];
    setPosts({ [link]: finalPosts });
    setPage(lastLoadedPage);
  }, [link, setIsFetching, setPosts, setPage]);

  useEffect(() => {
    if (page && page > 1 && page <= totalPages && isFetching) {
      const pagesNumber = Math.round(
        (posts[state.router.link].length + mainPosts.length + subPosts.length) /
          POSTS_PER_PAGE
      );
      if (pagesNumber < page) {
        for (let i = page - 1; i < page; i++) {
          const nextPage = i + 1;
          const getLink =
            link[1] === '?'
              ? `page/${nextPage}${link}`
              : `${link}page/${nextPage}`;
          const nextData = state.source.get(getLink);
          const accPosts = posts[state.router.link].concat([]);
          if (nextData && nextData.items) {
            accPosts.push(
              ...nextData.items.map(({ id, type }) => ({ id, type }))
            );
            const newPosts = { ...posts };
            newPosts[link] = accPosts;
            setPosts(newPosts);
            setIsFetching(false);
          }
        }
      } else {
        setIsFetching(false);
      }
    }
  }, [page, state, totalPages, posts, setIsFetching, isFetching]);

  return (
    <Wrapper>
      <Row>
        <Column>
          <SearchMobile />
        </Column>
        <Column width={[1, 5 / 6, 2 / 3]}>
          <BlogHeader />
        </Column>
      </Row>
      <Row
        css={css`
          position: relative;
        `}
      >
        <Column width={[1, 3 / 4]}>
          <CategoryList
            title="categories"
            categories={mainCategories}
            css={css`
              margin-bottom: 15px;
              min-height: 80px;
            `}
          />
        </Column>
        <Column width={[1, 1 / 4]}>
          <SearchDesktop showTitle open={state.theme.searchIsActive} />
        </Column>
      </Row>
      <FeatureWrapper
        css={css`
          position: relative;
          z-index: 1;
          margin-bottom: 40px;
        `}
      >
        <Featured {...mainPosts[0]} />
      </FeatureWrapper>
      <Row
        css={css`
          position: relative;
          z-index: 1;
        `}
      >
        {subPosts.map((post) => (
          <Column
            key={post.id}
            width={[1, 1 / 2]}
            css={css`
              margin-bottom: 40px;
            `}
          >
            <Card {...post} large />
          </Column>
        ))}
      </Row>
      <Divider />
      <Row
        css={css`
          margin-bottom: 60px;
        `}
      >
        <Column>
          <LatestTitle>Latest articles</LatestTitle>
        </Column>
        {posts[state.router.link].map((post) => (
          <Column
            key={post.id}
            width={[1, 1 / 2, 1 / 3]}
            css={css`
              margin-bottom: 40px;
            `}
          >
            <Card {...post} />
          </Column>
        ))}
        <LoadMoreWrapper width={[5 / 6, 1 / 3]}>
          <LoadMore
            isFetching={isFetching}
            setIsFetching={setIsFetching}
            setPage={setPage}
            page={page}
            limit={totalPages}
          />
        </LoadMoreWrapper>
      </Row>
    </Wrapper>
  );
};

HomePage.propTypes = {
  state: PropTypes.object,
};

export default connect(HomePage);
