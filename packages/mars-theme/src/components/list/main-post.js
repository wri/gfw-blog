import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';
import FeaturedMedia from '../featured-media';
import {
  LARGE_ENDPOINT,
  MEDIUM_ENDPOINT,
  SMALL_ENDPOINT,
} from '../heplers/css-endpoints';
import CategoryNameList from '../category/list-name';
import PostTitle from '../post/title';
import PostExcerpt from '../post/excerpt';

const MainPost = ({ item, state }) => {
  const categories = item.categories.map((id) => {
    return state.source.category[id].name;
  });

  const styles = `
    width: 100%;
    flex-wrap: wrap;
    position: relative;
    z-index: -1;
    @media screen and (max-width: ${LARGE_ENDPOINT}) {
        width: 100%;
    }
    @media screen and (max-width: ${SMALL_ENDPOINT}) {
        width: 100%;
    }`;

  const mediaStyles = `
    height: 400px;
    @media screen and (max-width: ${LARGE_ENDPOINT}) {
        height: 300px;
    }
    @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
      height: 500px;
    }`;

  const Wrapper = styled.article`
    ${styles}
  `;

  const ContentWrapper = styled.div`
    height: 100%;
    position: absolute;
    display: flex;
    align-items: flex-end;
    flex-flow: wrap;
    top: 0;
    padding: 0 4rem;
    @media screen and (min-width: ${MEDIUM_ENDPOINT}) {
      width: 67%;
      align-items: center;
    }
  `;
  const TitleStyles = `
    @media screen and (min-width: ${MEDIUM_ENDPOINT}) {
      padding-bottom: 2rem;
    }
    @media screen and (min-width: ${SMALL_ENDPOINT}) {
      font-size: 2rem;
    }
    font-size: 1.875rem;
    padding-top: 0;
    padding-bottom: 1.875rem;
    line-height: 1.25;
    color: #fff
  `;

  const ExcerptStyles = `
    @media screen and (min-width: ${SMALL_ENDPOINT}) {
      font-size: 1rem;
    }
    color: #fff;
    font-size: 0.875rem;
  `;

  return (
    <Wrapper>
      <FeaturedMedia id={item.featured_media} styles={mediaStyles} />
      <ContentWrapper>
        <div>
          <CategoryNameList categories={categories} />
          <PostTitle styles={TitleStyles}>{item.title.rendered}</PostTitle>
          <PostExcerpt styles={ExcerptStyles}>
            {item.excerpt.rendered}
          </PostExcerpt>
        </div>
      </ContentWrapper>
    </Wrapper>
  );
};

export default connect(MainPost);

MainPost.propTypes = {
  item: PropTypes.object,
  state: PropTypes.object,
};
