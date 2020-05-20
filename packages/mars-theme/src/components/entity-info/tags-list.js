import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';
import { Item } from './components';
import Link from '../link';

const TagList = ({ state, handler }) => {
  const data = state.source.get(state.router.link);
  const currentTag = state.source.tag[data.id];
  const { tags: topTags } = state.source.data['top-tags/'];
  const tags = topTags.find((t) => t.slug === currentTag.slug)
    ? topTags
    : [currentTag, ...topTags];

  return tags.map((tag) => (
    <Item
      key={tag.name + tag.id}
      className={data.id === tag.id ? `current` : ``}
      onClick={handler}
    >
      <Link link={tag.link}>
        {tag.name}
        &nbsp; (
        {tag.count}
        )
      </Link>
    </Item>
  ));
};

export default connect(TagList);

TagList.propTypes = {
  state: PropTypes.object,
  libraries: PropTypes.object,
  handler: PropTypes.func,
};
