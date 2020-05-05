import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';
import Link from '../link';

const List = ({ state }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];

  const categories = post.categories.map((id) => {
    return state.source.category[id];
  });

  return (
    <Wrapper>
      {categories.map((item) => {
        return (
          <li key={item.name}>
            <Link link={item.link}>{item.name}</Link>
          </li>
        );
      })}
    </Wrapper>
  );
};

export default connect(List);

List.propTypes = {
  state: PropTypes.object,
};

const Wrapper = styled.ul`
  display: inline-block;
  color: #97bd3d;
`;
