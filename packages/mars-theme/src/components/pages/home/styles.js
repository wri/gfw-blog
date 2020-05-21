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

export const Divider = styled.div`
  border-top: 1px solid ${theme.colors.lightGrey};
  margin-top: 60px;
  margin-bottom: 60px;
  display: none;

  ${theme.mediaQueries.small} {
    display: block;
  }
`;

export const LatestTitle = styled.h2`
  font-size: 18px;
  color: ${theme.colors.darkestGrey};
  margin-bottom: 50px;
  text-transform: uppercase;
  font-weight: 500;

  ${theme.mediaQueries.small} {
    display: block;
  }
`;
