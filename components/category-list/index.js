import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

const CategoryList = ({
  categories = [],
  onSelectCategory = () => {},
  selectedCategories = [],
  children,
  ...props
}) => {
  const handleClick = (category) => {
    onSelectCategory(category.slug);
  };

  return (
    <Wrapper {...props}>
      {categories.map((c) => (
        <a
          key={c.name + c.link}
          onClick={() => handleClick(c)}
          href={`/blog/category/${c.slug}/`}
        >
          <span
            className={
              selectedCategories.includes(c.slug) ? 'selected' : 'span'
            }
          >
            {c.name}
          </span>
        </a>
      ))}
      {children}
    </Wrapper>
  );
};

export default CategoryList;

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  onSelectCategory: PropTypes.func,
  selectedCategories: PropTypes.array,
  children: PropTypes.node,
};
