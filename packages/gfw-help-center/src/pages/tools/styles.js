import { styled } from 'frontity';

import theme from '../../app/theme';

export const Wrapper = styled.div`
  width: 100%;

  ${theme.mediaQueries.small} {
    padding: 50px 0;
  }
`;

export const ContentWrapper = styled.div`
  margin-bottom: 40px;
`;
