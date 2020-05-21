import { styled } from 'frontity';

import theme from '../../../theme';

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 300;
  margin: 0;
  margin-bottom: 20px;

  ${theme.mediaQueries.small} {
    font-size: 3rem;
  }
`;

export const Description = styled.p`
  margin-bottom: 20px;
  font-size: 1.125rem;
  line-height: 1.875rem;
  font-weight: 300;

  ${theme.mediaQueries.small} {
    margin-bottom: 60px;
  }
`;
