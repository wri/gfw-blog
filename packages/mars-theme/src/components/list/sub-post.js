import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';
import Item from './list-item';
import FeaturedMedia from '../featured-media';
import Excerpt from '../post/excerpt';
import PostTitle from '../post/title';
import { MEDIUM_ENDPOINT, SMALL_ENDPOINT } from '../heplers/css-endpoints';

const SubPost = ({ item }) => {
  const styles = `
    flex-wrap: wrap;
    width: 100%;`;

  const mediaStyles = `
    height: 300px;
    @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
      height: 200px;
  }`;

  const excerptStyles = `
    font-size: 0.875rem;
    @media screen and (min-width: ${SMALL_ENDPOINT}) {
      font-size: 1rem;
  }`;

  const titleStyles = `
    font-size: 1.375rem;
    margin-bottom: 1rem;
    @media screen and (min-width: ${SMALL_ENDPOINT}) {
      font-size: 1.875rem;
  }`;

  return (
    <Item
      styles={styles}
      item={item}
      media={(id) => <FeaturedMedia id={id} styles={mediaStyles} />}
      excerpt={() => (
        <Excerpt styles={excerptStyles}>{item.excerpt.rendered}</Excerpt>
      )}
      title={() => (
        <PostTitle styles={titleStyles}>{item.title.rendered}</PostTitle>
      )}
    />
  );
};

export default connect(SubPost);

SubPost.propTypes = {
  item: PropTypes.object,
};
