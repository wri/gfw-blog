import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';

import Media from '../media';
import CategoryList from '../category-list';
import Link from '../link';

import { CardWrapper, MediaWrapper, PostTitle, PostExcerpt } from './styles';

const Card = ({ link, title, excerpt, media, categories, large }) => (
  <CardWrapper>
    <Link
      link={link}
      css={css`
        z-index: 1;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      `}
    />
    {!!media && (
      <MediaWrapper large={large}>
        <Media {...media} />
      </MediaWrapper>
    )}
    {categories && (
      <CategoryList
        categories={categories}
        css={css`
          z-index: 2;
          position: relative;
        `}
      />
    )}
    {title && <PostTitle large={large}>{title}</PostTitle>}
    {excerpt && <PostExcerpt large={large}>{excerpt}</PostExcerpt>}
  </CardWrapper>
);

Card.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
  excerpt: PropTypes.string,
  media: PropTypes.object,
  categories: PropTypes.object,
  large: PropTypes.bool,
};

export default connect(Card);
