import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

const CategoryList = ({
  categories = [],
  onSelectCategory = () => {},
  selectedCategories = [],
  ...props
}) => {
  const handleClick = (category) => {
    onSelectCategory(category.slug);
  };

  return (
    <Wrapper {...props}>
      {categories.map((c) => (
        <button key={c.name + c.link} onClick={() => handleClick(c)}>
          <span
            className={
              selectedCategories.includes(c.slug) ? 'selected' : 'span'
            }
          >
            {c.name}
          </span>
        </button>
      ))}
    </Wrapper>
  );
};

export default CategoryList;

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  onSelectCategory: PropTypes.func,
  selectedCategories: PropTypes.array,
};
