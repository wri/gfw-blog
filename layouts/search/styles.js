import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';
import { Row, Column } from 'components/grid';

export const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 4rem;
`;

export const BackButtonRow = styled(Row)`
  display: flex;
  width: 100%;
  max-width: 100%;
  margin-top: 1.5rem;
  background: white;

  @media (min-width: 1350px) {
    padding-left: 3.75rem !important;
  }
`;

export const TitleRow = styled(Row)`
  margin-top: 1.5rem;
  width: 100%;
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
