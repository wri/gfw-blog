import { styled } from 'frontity';

import theme from '../../app/theme';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  width: 100%;

  ${theme.mediaQueries.small} {
    padding: 50px 0;
  }
`;
