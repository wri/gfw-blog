import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

// eslint-disable-next-line import/prefer-default-export
export const FilterDropDownWrapper = styled.div`
  position: absolute;
  background: #333333;
  min-height: 8.5rem;
  max-height: 16rem;
  overflow-y: scroll;
  z-index: 10;
  width: 100%;

  ${theme.mediaQueries.small} {
    min-width: 17rem;
    width: auto;

    ${({ margin }) =>
      `
        margin-left: ${margin};
      `}
  }
`;

export const FilterDropDownContainer = styled.div`
  margin-top: 1rem;
  padding: 0 2rem 1rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-columns: 12rem 3rem;
  justify-content: center;

  span {
    color: #ffffff;
    text-transform: uppercase;
  }

  .title {
    padding-top: 0.3125rem;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.875rem;
    letter-spacing: 0.016rem;
    text-align: left;
  }

  .container {
    padding-top: 0.3125rem;
    display: block;
    position: relative;
    padding-left: 2.188rem;
    margin-bottom: 0.75rem;
    cursor: pointer;
    font-size: 1.375rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0.6875rem;
    left: 0;
    height: 1rem;
    width: 1rem;
    background-color: #333333;
    border: solid #97bd3d;
    border-width: 0.1rem;
    border-radius: 0.125rem;
  }

  .checkmark.radio {
    border-radius: 50% !important;
  }

  .container input:checked ~ .checkmark {
    background-color: #97bd3d;
  }
`;
