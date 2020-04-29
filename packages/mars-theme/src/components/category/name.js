import React from 'react';
import PropTypes from 'prop-types';
import { styled, decode } from 'frontity';

const CategoryName = ({ children, styles = '' }) => {
  const Wrapper = styled.span`
    background-color: rgba(51, 51, 51, 1);
    color: #fff;
    padding: 0.1rem 1rem;
    font-size: 0.9em;
    font-weight: 200;
    text-transform: uppercase;
    display: inline-flex;
    margin-right: 1.25rem;
    margin-bottom: 1.25rem;
    margin-top: 1rem;
    height: 1.5rem;
    :hover {
      background-color: var(--color-primary);
    }
    ${styles}
  `;
  return (
    <Wrapper>
      <b>{decode(children)}</b>
    </Wrapper>
  );
};

export default CategoryName;

CategoryName.propTypes = {
  styles: PropTypes.string,
  children: PropTypes.node,
};
