import React from 'react';
import PropTypes from 'prop-types';
import { decode } from 'frontity';

import Link from '../link';

import { Wrapper, CategoryPill, H5 } from './styles';

const CategoryList = ({ categories = [], light, title, ...props }) => (
  <Wrapper {...props}>
    {title && <H5>{title}</H5>}
    {categories.map(({ name, link } = {}) => (
      <Link key={name + link} link={link}>
        <CategoryPill light={light}>{decode(name)}</CategoryPill>
      </Link>
    ))}
  </Wrapper>
);

export default CategoryList;

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  light: PropTypes.bool,
  title: PropTypes.string,
};
