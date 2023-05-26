import styled from '@emotion/styled';

import { theme } from '@worldresources/gfw-components';

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 300;
  margin: 0;
  margin-bottom: 20px;

  ${theme.mediaQueries.small} {
    font-size: 48px;
  }
`;

export const Description = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
  line-height: 30px;
  color: ${theme.colors.darkGrey};
`;
