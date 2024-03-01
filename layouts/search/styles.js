import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';
import { Row, Column } from 'components/grid';

export const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 4rem;
`;

export const SearchRow = styled(Row)`
  width: 100%;
  position: fixed;
  z-index: 10;
  max-width: 90rem;

  ${theme.mediaQueries.small} {
    margin-top: 3.1rem;
  }
`;

export const SearchMobileColumn = styled(Column)`
  display: block;
  height: 12rem;
  background-color: #f7f7f7;
  padding: 2rem 0;

  ${theme.mediaQueries.small} {
    display: none;
  }
`;

export const SearchDesktopColumn = styled(Column)`
  margin-top: -1.35rem;
  padding: 0 !important;
`;

export const BackButtonRow = styled(Row)`
  display: flex;
  position: fixed;
  margin-top: 12rem;
  width: 100%;
  z-index: 2;
  background: white;
  max-width: 100%;

  ${theme.mediaQueries.small} {
    margin-top: 5.625rem;
    padding-left: 3.75rem !important;
  }
`;
export const TitleRow = styled(Row)`
  margin-top: 16rem;
  width: 100%;

  ${theme.mediaQueries.small} {
    margin-top: 11rem;
  }
`;

export const MoreArticlesWrapper = styled.div`
  display: none;
  min-height: 49.0625rem;
  margin: 3.125rem 0;

  ${theme.mediaQueries.small} {
    display: flex;
  }
`;

export const LatestTitle = styled.h2`
  color: ${theme.colors.darkestGrey};
  margin-bottom: 3.125rem;
  text-transform: uppercase;
  font-size: 2.125rem;
  font-weight: 400;
  line-height: 3rem;
  letter-spacing: 0.1.5625rem;
  text-align: center;
  text-transform: capitalize;
  padding-top: 1.875rem;
`;

export const ResultsStatement = styled.p`
  font-size: 0.875rem;
  line-height: 1.3125rem;
  color: ${theme.colors.darkGrey};

  ${theme.mediaQueries.small} {
    text-align: right;
  }
`;

export const ResultsTitle = styled.h1`
  font-family: Fira Sans;
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 500;
  line-height: 3.75rem;
  letter-spacing: 0.01563rem;

  ${theme.mediaQueries.small} {
    font-size: 3rem;
  }
`;

export const FilterByCategory = styled.div`
  font-size: 0.875rem;
  line-height: 1.3125rem;
  color: ${theme.colors.darkGrey};
  text-align: right;
  margin-right: 0.3125rem;
`;

export const FilterByTopic = styled.div`
  font-size: 0.875rem;
  line-height: 1.3125rem;
  color: ${theme.colors.darkGrey};
  margin-right: 0.3125rem;

  ${theme.mediaQueries.small} {
    text-align: right;
  }
`;

export const PaginationColumn = styled(Column)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  ${theme.mediaQueries.small} {
    justify-content: end;
  }
`;
