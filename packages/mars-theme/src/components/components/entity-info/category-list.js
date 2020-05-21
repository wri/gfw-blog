import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';
import { Item } from './components';
import Link from '../link';

const CategoryList = ({ state, handler }) => {
  const data = state.source.get(state.router.link);
  const { categories } = state.source.data['all-categories/'];

  return categories.map((cat) => {
    return (
      <Item
        key={cat.name + cat.id}
        className={data.id === cat.id ? `current` : ``}
        onClick={handler}
      >
        <Link link={cat.link}>
          {cat.name}
          &nbsp; (
          {cat.count}
          )
        </Link>
      </Item>
    );
  });
};

export default connect(CategoryList);

CategoryList.propTypes = {
  state: PropTypes.object,
  libraries: PropTypes.object,
  handler: PropTypes.func,
};
