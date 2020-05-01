import React from 'react';
import { styled } from 'frontity';
// eslint-disable-next-line import/prefer-default-export
export const Item = (props) => {
  return <ItemElement {...props} />;
};

const ItemElement = styled.div`
  width: 100%;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  font-size: 1.375rem;
  line-height: 1.875rem;
  &.current {
    font-weight: bold;
  }
`;
