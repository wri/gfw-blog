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
      {categories.map((category) => (
        <a
          key={category.name + category.link}
          onClick={() => handleClick(category)}
          href={`/blog/category-and-topics/?category=${category.slug}`}
        >
          <span
            className={
              selectedCategories.includes(category.slug) ? 'selected' : 'span'
            }
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: category.name }}
          />
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
