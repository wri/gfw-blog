import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

import GreenLeftArrowSrc from 'assets/icons/green-left-arrow.svg';

export const BackButtonWrapper = styled.div`
  padding: 45px 0;
  width: 100%;

  ${theme.mediaQueries.small} {
    padding: 54px 0;
  }

  button {
    align-items: center;
    display: flex;
    gap: 11px;
  }

  .title {
    color: #97bd3d;
    font-weight: 500;
    letter-spacing: 0.25px;
    line-height: 14px;
    text-transform: uppercase;
    font-size: 12px;

    ${theme.mediaQueries.small} {
      font-size: 14px;
    }
  }
`;

export const GreenLeftArrowIcon = styled(GreenLeftArrowSrc)`
  height: 18px;
  width: 18px;
`;
