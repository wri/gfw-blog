import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: 2.5rem 2.5rem 2.5rem 2.5rem 2.5rem 2.5rem 2.5rem 2.5rem 2.5rem 2.5rem 2.5rem 2.5rem 2.5rem 2.5rem;
  grid-auto-flow: column;
  text-align: start;

  ${theme.mediaQueries.small} {
    grid-template-columns: repeat(7, minmax(0, 1fr));
    grid-template-rows: 2.5rem 2.5rem 2.5rem 2.5rem;
    grid-auto-flow: column;
  }

  a {
    margin: 0 1.25rem 1.25rem 0;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 0.875rem;
    letter-spacing: 0.016rem;
    text-align: left;
    color: #ffffff;
    text-transform: uppercase;

    ${theme.mediaQueries.small} {
      margin: 0 1rem 1rem 0;
    }

    span:hover {
      padding: 0.25rem;
      background-color: #658022;
      color: #333333;
      border-radius: 9999px;
    }

    .selected {
      padding: 0.25rem;
      background-color: #97bd3d;
      border-radius: 9999px;
    }
  }
`;
