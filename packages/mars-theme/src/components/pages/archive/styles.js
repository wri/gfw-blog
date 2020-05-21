import { styled } from 'frontity';

import theme from '../../theme';
import Search from '../../components/search';

export const Wrapper = styled.div`
  width: 100%;
  padding: 20px 0;
`;

export const SearchMobile = styled(Search)`
  display: block;
  margin-top: -20px;

  ${theme.mediaQueries.small} {
    display: none;
  }
`;

export const SearchDesktop = styled(Search)`
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
