import { styled } from 'frontity';

import theme from '../../app/theme';

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 300;
  margin: 0;
  margin-bottom: 20px;

  ${theme.mediaQueries.small} {
    font-size: 48px;
  }
`;

export const Description = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
  line-height: 30px;
  color: ${theme.colors.darkGrey};
`;
