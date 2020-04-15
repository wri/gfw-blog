import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'frontity';
import CategoryName from './name';

const CategoryNameList = ({ categories, styles = '' }) => {
  const Wrapper = styled.p`
      padding: 1rem 0;
      ${styles}
    `;
  return (
    <Wrapper>
      {categories.map(name => {
        return <CategoryName key={name}>{name}</CategoryName>
      })}
    </Wrapper>
  )
}

export default CategoryNameList

CategoryNameList.propTypes = {
  categories: PropTypes.array,
  styles: PropTypes.string,
}