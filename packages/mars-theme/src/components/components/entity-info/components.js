import React from 'react';
import PropTypes from 'prop-types';
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

export const Title = (props) => {
  return <TitleItem {...props} />;
};

const TitleItem = styled.div`
  font-size: 1.125rem;
  line-height: 1.875rem;
  color: var(--color-dark-grey);
  padding-top: 1.625rem;
`;

export const NumberInfo = ({ styles, ...props }) => {
  const NumberInfoItem = styled.div`
    font-size: 0.875rem;
    line-height: 1.3125rem;
    margin-top: 4.625rem;
    color: var(--color-medium-grey);
    ${styles}
  `;
  return <NumberInfoItem {...props} />;
};

NumberInfo.propTypes = {
  styles: PropTypes.object,
};
