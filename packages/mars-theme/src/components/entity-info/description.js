import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';
import CategoryDescription from './category-description';
import AuthorDescription from './authors-description';
import TagDescription from './tag-description';

const EntityDescription = ({ state }) => {
  const data = state.source.get(state.router.link);
  if (data.isAuthor) {
    return <AuthorDescription />;
  }
  if (data.isCategory) {
    return <CategoryDescription />;
  }
  if (data.isTag) {
    return <TagDescription />;
  }
  return null;
};

export default connect(EntityDescription);

EntityDescription.propTypes = {
  state: PropTypes.object,
};
