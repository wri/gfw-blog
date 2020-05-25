import { styled } from 'frontity';

import theme from '../../app/theme';
import Search from '../../components/search';

export const Wrapper = styled.div`
  width: 100%;

  ${theme.mediaQueries.small} {
    padding: 50px 0;
  }
`;

export const SearchMobile = styled(Search)`
  display: block;

  ${theme.mediaQueries.small} {
    display: none;
  }
`;

export const SearchDesktop = styled(Search)`
  display: none;
  margin-top: -28px;

  ${theme.mediaQueries.small} {
    display: block;
  }

  ${({ open }) =>
    open &&
    `
    position: absolute;
    left: 0;
    right: 0;
    top: -28px;
    max-width: 1120px;
    padding: 0 16px;
    margin: 0 auto;

    ${theme.mediaQueries.small} {
      padding: 0 20px;
    }
  `}
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
  margin-top: 20px;
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
  display: none;

  ${theme.mediaQueries.small} {
    display: block;
  }
`;

export const LoadMoreWrapper = styled.div`
  margin-top: 20px;

  ${theme.mediaQueries.small} {
    margin-top: 60px;
  }
`;
