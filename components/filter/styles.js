import styled from '@emotion/styled';
import { theme, Row } from '@worldresources/gfw-components';

export const FilterByWrapper = styled(Row)`
  display: flex;
  flex-flow: column-reverse;
  justify-content: space-between;
  align-items: center;
  margin: 2rem auto;
  height: 3.75rem;
  padding: 0 1rem;
  width: 100%;

  ${theme.mediaQueries.small} {
    margin: 3.875rem auto;
    flex-flow: row;
    height: 1.25rem;
    justify-content: space-between;
  }
`;

export const FilterByColumn = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: start;
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
