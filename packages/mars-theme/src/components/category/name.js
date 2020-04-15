import React from "react";
import { styled, decode } from "frontity";

const CategoryName = ({ children }) => {
  const Wrapper = styled.span`
    background-color: rgba(51, 51, 51, 1);;
    color: #fff;
    padding: 0.5em 1em;
    font-size: 0.9em;
    font-weight: 200;
    margin-right: 0.5em;
    text-transform: uppercase;
  `;
  return (
    <Wrapper>
      <b>{decode(children)}</b>
    </Wrapper>
  )
}

export default CategoryName