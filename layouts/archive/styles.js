import styled from '@emotion/styled';
import { Row, theme } from 'gfw-components';

import Search from '../../components/search';

export const Wrapper = styled.div`
  width: 100%;
  padding: 40px 0 50px;
  ${theme.mediaQueries.small} {
    padding-top: 50px;
  }
`;

export const SearchMobile = styled(Search)`
  display: block;
  margin-top: -20px;
  ${theme.mediaQueries.small} {
    display: none;
  }
  ${({ open }) =>
    open &&
    `
    position: absolute;
    left: 0;
    right: 0;
    top: -20px;
    max-width: 1120px;
    padding: 0 16px;
    margin: 0 auto;
    ${theme.mediaQueries.small} {
      padding: 0 20px;
    }
  `}
`;

export const SearchDesktop = styled(Search)`
  ${({ isSearch }) =>
    !isSearch &&
    `
    display: none;
    ${theme.mediaQueries.small} {
      display: block;
    }
  `}
  ${({ open }) =>
    open &&
    `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    max-width: 1120px;
    padding: 0 16px;
    margin: 0 auto;
    ${theme.mediaQueries.small} {
      padding: 0 20px;
    }
  `}
`;

export const CategoryDescription = styled.p`
  margin-top: 15px;
  font-size: 18px;
  line-height: 30px;
  color: ${theme.colors.darkGrey};
`;

export const ResultsStatement = styled.p`
  font-size: 14px;
  line-height: 21px;
  color: ${theme.colors.mediumGrey};
  margin-top: 20px;

  ${theme.mediaQueries.small} {
    margin-top: 75px;
  }
`;

export const LoadMoreWrapper = styled(Row)`
  margin: 20px 0 50px !important;
  ${theme.mediaQueries.small} {
    margin-top: 60px !important;
  }
`;

export const MenuWrapper = styled.div`
  margin-top: 40px;
`;
