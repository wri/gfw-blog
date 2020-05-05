import React from 'react';
import { styled } from 'frontity';

const Divider = () => {
  const Wrapper = styled.span`
    display: inline-block;
    margin: 0 0.3rem;
  `;
  return <Wrapper>/</Wrapper>;
};

export default Divider;
