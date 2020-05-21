import React from 'react';
import PropTypes from 'prop-types';
import { decode } from 'frontity';
import { Button } from 'gfw-components';

import Link from '../link';

import { Wrapper, buttonStyles } from './styles';

const CategoryList = ({
  categories = [],
  ...props
}) => (
  <Wrapper {...props}>
    {categories.map(({ name, link } = {}) => (
      <Link
        key={name + link}
        link={link}
      >
        <Button
          theme="square theme-dark"
          css={buttonStyles}
        >
          {decode(name)}
        </Button>
      </Link>
    ))}
  </Wrapper>
);

export default CategoryList;

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  styles: PropTypes.string,
  itemStyles: PropTypes.string,
  title: PropTypes.string,
};
