import { styled } from 'frontity';
import { theme } from 'gfw-components';

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
  margin-bottom: 40px;

  ${theme.mediaQueries.small} {
    margin-bottom: 70px;
  }
`;
