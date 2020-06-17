import React from 'react';
import PropTypes from 'prop-types';
import { connect, decode } from 'frontity';
import Link from '../link';
import Divider from './divider';
import { isSearchLink } from '../../helpers/content';
import CategoryItem from './category-item';

import Wrapper from './styles';

const Breadcrumbs = ({ state }) => {
  const data = state.source.get(state.router.link);

  return (
    <Wrapper>
      <Link link="/">Help center home</Link>
      {isSearchLink(state.router.link) && (
        <>
          <Divider />
          <span>Search results</span>
        </>
      )}
      {data.isAuthor && (
        <>
          <Divider />
          <span>{decode(state.source.author[data.id].name)}</span>
        </>
      )}
      {data.isCategory && (
        <>
          <Divider />
          <span>{decode(state.source[data.taxonomy][data.id].name)}</span>
        </>
      )}
      {data.isTag && (
        <>
          <Divider />
          <span>Tags</span>
        </>
      )}
      {data.isPostType && (
        <>
          <Divider />
          <CategoryItem />
          <Divider />
          <span>{decode(state.source[data.type][data.id].title.rendered)}</span>
        </>
      )}
    </Wrapper>
  );
};

Breadcrumbs.propTypes = {
  state: PropTypes.object,
};

export default connect(Breadcrumbs);
