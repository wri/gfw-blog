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
import Link from '../link';

const MainPost = ({ post, state }) => {
  const { type, id } = post;
  const item = state.source[type][id];
  // eslint-disable-next-line no-shadow
  const categories = item.categories.map((id) => {
    const { link, name } = state.source.category[id];
    return { link, name };
  });

  const styles = `
    width: 100%;
    flex-wrap: wrap;
    position: relative;
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
    margin-bottom: 1.5rem;
    ${styles}
  `;

  const ContentWrapper = styled.div`
    height: 100%;
    position: absolute;
    display: flex;
    align-items: flex-end;
    flex-flow: wrap;
    top: 0;
    padding: 0 1rem;
    @media screen and (min-width: ${MEDIUM_ENDPOINT}) {
      padding: 0 4.375rem;
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
          <Link link={item.link}>
            <PostTitle styles={TitleStyles}>{item.title.rendered}</PostTitle>
          </Link>
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
  post: PropTypes.object,
  state: PropTypes.object,
};
