import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';
import Link from '../link';

const CategoryItem = ({ state }) => {
  const { link } = state.router;
  const data = state.source.get(link);
  const post = state.source[data.type][data.id];
  const categories = post?.categories?.map((id) => {
    return state.source.category[id];
  });

  let item = categories?.[0];
  // eslint-disable-next-line no-restricted-syntax
  for (const i in categories) {
    if (link.indexOf(`/${categories?.[i]?.slug}/`) === 0) {
      item = categories?.[i];
      break;
    }
  }

  return item ? (
    <Wrapper>
      <Link link={item.link}>{item.name}</Link>
    </Wrapper>
  ) : null;
};

export default connect(CategoryItem);

CategoryItem.propTypes = {
  state: PropTypes.object,
};

const Wrapper = styled.ul`
  display: inline-block;
  color: #97bd3d;
`;
