import styled from '@emotion/styled';
import { theme, Row, Column } from '@worldresources/gfw-components';

export const Wrapper = styled.div`
  width: 100%;
`;

export const BackButtonRow = styled(Row)`
  display: flex;
  position: fixed;
  margin-top: 12rem;
  max-width: 90rem;
  width: 100%;
  z-index: 1;
  background: white;

  ${theme.mediaQueries.small} {
    margin-top: 5.625rem;
  }
`;

export const CategoryDescription = styled.p`
  margin-top: 0.9375rem;
  font-size: 1.125rem;
  line-height: 1.875rem;
  color: ${theme.colors.darkGrey};
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
  padding: 0 1rem;

  ${theme.mediaQueries.small} {
    font-size: 3rem;
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
