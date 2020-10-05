import styled from '@emotion/styled';
import { H3, Column, theme } from 'gfw-components';

import Search from 'components/search';

export const Wrapper = styled.div`
  width: 100%;
  padding: 40px 0;
  ${theme.mediaQueries.small} {
    padding: 50px 0;
  }
`;

export const ContentWrapper = styled.div`
  margin-bottom: 40px;
`;

export const MenuWrapper = styled.div`
  margin-bottom: 40px;
`;

export const Title = styled(H3)`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;

  ${theme.mediaQueries.small} {
    margin-bottom: 25px;
    font-size: 28px;
    font-weight: 300;
  }
`;

export const HeaderWrapper = styled(Column)`
  margin-bottom: 45px;

  ${theme.mediaQueries.small} {
    margin-bottom: 90px;
  }
`;

export const BreadcrumbsWrapper = styled.div`
  margin-bottom: 25px;

  ${theme.mediaQueries.small} {
    margin-bottom: 40px;
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
  `}
`;

export const Divider = styled.div`
  border-top: 1px solid ${theme.colors.lightGrey};
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  ${theme.mediaQueries.small} {
    margin-top: 5rem;
    margin-bottom: 5rem;
  }
`;
