import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled, css } from 'frontity';
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
    height: 440px;
    @media screen and (max-width: ${SMALL_ENDPOINT}) {
      height: 420px;
    }
    @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
      height: 400px;
    }
  `;

  const Wrapper = styled.article`
    margin-bottom: 40px;
    ${styles}
  `;

  const ContentWrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    top: 0;
    padding: 30px 16px;
    @media screen and (min-width: ${SMALL_ENDPOINT}) {
      padding: 40px 50px;
    }
    @media screen and (min-width: ${MEDIUM_ENDPOINT}) {
      padding: 50px 70px;
      width: 67%;
    }
    ${mediaStyles}
  `;

  const TitleStyles = `
    @media screen and (min-width: ${SMALL_ENDPOINT}) {
      font-size: 2rem;
    }
    font-size: 1.875rem;
    line-height: 1.25;
    color: var(--color-white);
    margin-bottom: 20px;
  `;

  const ExcerptStyles = `
    @media screen and (min-width: ${SMALL_ENDPOINT}) {
      font-size: 1rem;
    }
    color: var(--color-white);
    font-size: 0.875rem;
  `;

  const CategoriesStyles = `
    position: relative;
    z-index: 2;
  `;

  return (
    <Wrapper>
      <Link
        link={item.link}
        css={css`
          width: 100%;
          height: 100%;
          z-index: 1;
        `}
      >
        <FeaturedMedia id={item.featured_media} styles={mediaStyles} />
        <ContentWrapper>
          <CategoryNameList categories={categories} styles={CategoriesStyles} />
          <PostTitle styles={TitleStyles}>{item.title.rendered}</PostTitle>
          <PostExcerpt styles={ExcerptStyles} noHellip>
            {item.excerpt.rendered}
          </PostExcerpt>
        </ContentWrapper>
      </Link>
    </Wrapper>
  );
};

export default connect(MainPost);

MainPost.propTypes = {
  post: PropTypes.object,
  state: PropTypes.object,
};
