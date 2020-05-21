import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';

import FeaturedMedia from '../featured-media';
import CategoryList from '../category-list';
import Link from '../link';
import { clearExcerptHellip } from '../../helpers/content';

import { CardWrapper, Media, PostTitle, PostExcerpt } from './styles';

const Card = ({ libraries, state, id, type, large }) => {
  const Html2React = libraries.html2react.Component;
  const { link, featured_media: featuredMediaId, categories, title, excerpt } =
    state.source[type][id] || {};
  const postCategories = categories.map((cat) => state.source.category[cat]);

  return (
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
      <Media large={large}>
        <FeaturedMedia id={featuredMediaId} />
      </Media>
      <CategoryList
        categories={postCategories}
        css={css`
          z-index: 2;
          position: relative;
        `}
      />
      {title && (
        <PostTitle large={large}>
          <Html2React html={title.rendered} />
        </PostTitle>
      )}
      {excerpt && (
        <PostExcerpt large={large}>
          <Html2React html={clearExcerptHellip(excerpt.rendered)} />
        </PostExcerpt>
      )}
    </CardWrapper>
  );
};

export default connect(Card);

Card.propTypes = {
  state: PropTypes.object,
  id: PropTypes.number,
  libraries: PropTypes.object,
  type: PropTypes.string,
  large: PropTypes.bool,
};
