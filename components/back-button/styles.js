import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

import GreenLeftArrowSrc from 'assets/icons/green-left-arrow.svg';

export const BackButtonWrapper = styled.div`
  padding: 1.5625rem 1rem;
  width: 100%;
  max-width: 85rem;

  ${theme.mediaQueries.small} {
    padding: 1.75rem 0;
    padding-left: 1.25rem;
    margin: 0 auto;
  }

  button {
    align-items: center;
    display: flex;
    gap: 0.6875rem;
  }

  .title {
    color: #97bd3d;
    font-weight: 500;
    letter-spacing: 0.015625rem;
    line-height: 0.875rem;
    text-transform: uppercase;
    font-size: 0.75rem;

    ${theme.mediaQueries.small} {
      font-size: 0.875rem;
    }
  }
`;

export const GreenLeftArrowIcon = styled(GreenLeftArrowSrc)`
  height: 1.125rem;
  width: 1.125rem;
`;
