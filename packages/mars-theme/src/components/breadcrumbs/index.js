import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled, decode } from 'frontity';
import Link from '../link';
import Item from './item';
import Divider from './divider';
import List from './list';
import { MEDIUM_ENDPOINT } from '../heplers/css-endpoints';

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
  margin-top: 1.25rem;
  font-size: 0.75rem;
  line-height: 1.3125rem;
  padding: 0;
  @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
    padding: 0 1rem;
    margin-top: 0;
  }
`;

Breadcrumbs.propTypes = {
  state: PropTypes.object,
};
