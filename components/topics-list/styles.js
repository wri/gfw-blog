import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

// eslint-disable-next-line import/prefer-default-export
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
    color: #ffffff;
    text-transform: uppercase;

    ${theme.mediaQueries.small} {
      margin-top: 1rem;
    }

    .selected {
      padding: 0.25rem;
      background-color: #658022;
      border-radius: 9999px;
    }

    .span {
      padding: 0.25rem;
    }
  }
`;