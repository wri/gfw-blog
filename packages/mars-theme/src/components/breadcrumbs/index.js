import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled, decode } from 'frontity';
import Link from '../link';
import Item from './item';
import Divider from './divider';
import List from './list';

const Breadcrumbs = ({ state }) => {
  const data = state.source.get(state.router.link);
  if (state.router.link === '/') {
    return null;
  }

  return (
    <Wrapper className="breadcrumbs-wrapper">
      <Item clickable>
        <Link link="/">Blog home</Link>
      </Item>
      {data.isCategory && (
        <>
          <Divider />
          <Item>{decode(state.source[data.taxonomy][data.id].name)}</Item>
        </>
      )}
      {data.isPostType && (
        <>
          <Divider />
          <List />
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
  margin-top: 3em;
  margin-bottom: 2em;
  font-size: 0.75rem;
  line-height: 0.75rem;
`;

Breadcrumbs.propTypes = {
  state: PropTypes.object,
};
