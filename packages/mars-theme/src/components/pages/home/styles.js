import { styled } from 'frontity';

import theme from '../../theme';

export const Wrapper = styled.div`
  width: 100%;
  padding: 20px 0;

  ${theme.mediaQueries.small} {
    padding: 50px 0;
  }
`;