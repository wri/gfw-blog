import React from "react";
import PropTypes from "prop-types";
import { styled, decode } from "frontity";

const CategoryName = ({ children, styles='' }) => {
  const Wrapper = styled.span`
    background-color: rgba(51, 51, 51, 1);
    color: #fff;
    padding: 0.5rem 1rem;
    font-size: 0.9em;
    font-weight: 200;
    margin-right: 0.5em;
    text-transform: uppercase;
    ${styles}
  `;
  return (
    <Wrapper>
      <b>{decode(children)}</b>
    </Wrapper>
  )
}

export default CategoryName

CategoryName.propTypes = {
  styles: PropTypes.string,
}