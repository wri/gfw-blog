import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'frontity';

const Item = ({ clickable = false, children }) => {
  const styles = clickable ? `color: #97BD3D` : 'color: #777777';
  const ItemWrapper = styled.span`
    ${styles}
  `;
  return <ItemWrapper>{children}</ItemWrapper>;
};

Item.propTypes = {
  clickable: PropTypes.bool,
  children: PropTypes.node,
};

export default Item;
