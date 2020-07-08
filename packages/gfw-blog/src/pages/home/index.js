import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column, theme } from 'gfw-components';
import uniqBy from 'lodash/uniqBy';

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

const HomePage = ({ state }) => {
  const { link } = state.router;
  const { categories } = state.source.data['all-categories/'];
  const { stickyPosts } = state.source.data['sticky-posts/'];
  const [page, setPage] = useState(1);

  const mainCategories = categories.filter(
    (cat) => cat.slug !== 'uncategorized'
  );

  const featuredPosts =
    stickyPosts && stickyPosts.length > 3
      ? stickyPosts.slice(0, 3)
      : stickyPosts;

  const { items, totalPages } = state.source.get(state.router.link);
  const allPosts = Array.from(Array(page).keys()).reduce((arr, pageNum) => {
    if (pageNum > 0) {
      return [
        ...arr,
        ...state.source.get(`${state.router.link}page/${pageNum + 1}`).items,
      ];
    }

    return arr;
  }, items);
  const initialPosts = uniqBy([...featuredPosts, ...allPosts], 'id');
  const mainPosts = initialPosts.slice(0, 1);
  const subPosts = initialPosts.slice(0, 2);
  const posts = initialPosts.slice(3);

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
          {mainCategories && (
            <CategoryList
              title="categories"
              categories={mainCategories}
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
        {subPosts?.map((post) => (
          <Column
            key={post.id}
            width={[1, 1 / 2]}
            css={css`
              margin-bottom: 40px !important;
            `}
          >
            <Card {...post} large />
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
            <Card {...post} />
          </Column>
        ))}
        <Column>
          <Row nested>
            <Column width={[1 / 12, 1 / 3]} />
            <LoadMoreWrapper width={[5 / 6, 1 / 3]}>
              <LoadMore
                setPage={setPage}
                page={page}
                limit={totalPages}
                link={link}
              />
            </LoadMoreWrapper>
          </Row>
        </Column>
      </Row>
    </Wrapper>
  );
};

HomePage.propTypes = {
  state: PropTypes.object,
};

export default connect(HomePage);
