import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  button {
    margin: 0 1.25rem 1.25rem 0;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 0.875rem;
    letter-spacing: 0.016rem;
    text-align: center;
    color: #333333;
    text-transform: uppercase;

    ${theme.mediaQueries.small} {
      margin-top: 2.4rem;
    }

    .selected {
      padding: 0.25rem;
      background-color: #333333;
      color: #ffffff;
    }

    .span {
      padding: 0.25rem;
    }
  }
`;

export const H5 = styled.h5`
  color: ${theme.colors.mediumGrey};
  height: 1.5rem;
  display: flex;
  align-items: center;
  margin: 0 1.25rem 1.25rem 0;
  font-size: 0.75rem;
  width: 100%;
  text-transform: uppercase;

  ${theme.mediaQueries.small} {
    width: auto;
  }
`;

export const CategoryPill = styled.button`
  height: 1.5rem;
  padding: 0 0.75rem;
  font-size: 0.75rem;
  background-color: ${theme.colors.darkestGrey};
  border-radius: 0;
  text-transform: uppercase;
  color: ${theme.colors.white};
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${theme.colors.green};
  }

  ${({ light }) =>
    light &&
    `
    background-color: ${theme.colors.lightGrey};
    color: ${theme.colors.darkestGrey};

    &:hover {
      background-color: ${theme.colors.darkGrey};
      color: ${theme.colors.white};
    }
  `}
`;
