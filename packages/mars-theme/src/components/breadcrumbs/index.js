import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled, decode } from 'frontity';
import Link from '../link';
import Item from './item';
import Divider from './divider';
import CategoryItem from './category-item';

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

export default connect(Breadcrumbs);

const Wrapper = styled.div`
  width: 100%;
  font-size: 0.75rem;
  line-height: 1.3125rem;
  margin-bottom: 20px;
  a {
    &:hover {
      color: #658022;
    }
  }
`;

Breadcrumbs.propTypes = {
  state: PropTypes.object,
};
