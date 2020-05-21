import { styled } from 'frontity';

import theme from '../../theme';

export const Wrapper = styled.div`
  width: 100%;
  padding: 20px 0;

  ${theme.mediaQueries.small} {
    padding: 50px 0;
  }
`;

export const FeatureWrapper = styled.div`
  max-width: 1120px;
  margin: auto;

  ${theme.mediaQueries.small} {
    padding: 0 20px;
  }
`;
