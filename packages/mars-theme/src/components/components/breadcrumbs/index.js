import React from 'react';
import PropTypes from 'prop-types';
import { connect, decode } from 'frontity';
import Link from '../link';
import Item from './item';
import Divider from './divider';
import { isSearchLink } from '../../helpers/content';
import CategoryItem from './category-item';

import { Wrapper } from './styles';

const Breadcrumbs = ({ state }) => {
  const data = state.source.get(state.router.link);
  if (state.router.link === '/') {
    return null;
  }

  return (
    <Wrapper className="breadcrumbs-wrapper">
      <Item clickable>
        <Link link="/">Blog Home</Link>
      </Item>
      {isSearchLink(state.router.link) && (
        <>
          <Divider />
          <Item>Search results</Item>
        </>
      )}
      {data.isAuthor && (
        <>
          <Divider />
          <Item>{decode(state.source.author[data.id].name)}</Item>
        </>
      )}
      {data.isCategory && (
        <>
          <Divider />
          <Item>{decode(state.source[data.taxonomy][data.id].name)}</Item>
        </>
      )}
      {data.isTag && (
        <>
          <Divider />
          <Item>Tags</Item>
        </>
      )}
      {data.isPostType && (
        <>
          <Divider />
          <CategoryItem />
          <Divider />
          <Item>{decode(state.source[data.type][data.id].title.rendered)}</Item>
        </>
      )}
    </Wrapper>
  );
};

Breadcrumbs.propTypes = {
  state: PropTypes.object,
};

export default connect(Breadcrumbs);
