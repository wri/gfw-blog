import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'frontity';
import CategoryName from './name';

const CategoryNameList = ({ categories }) => {
  const Wrapper = styled.p`
      padding: 1em 0;
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
  categories: PropTypes.array
}