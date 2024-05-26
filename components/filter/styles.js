import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';
import { Row } from 'components/grid';

export const Wrapper = styled.div`
  width: 100%;
`;

export const FilterByWrapper = styled(Row)`
  display: flex;
  flex-flow: column-reverse;
  justify-content: space-between;
  align-items: center;
  margin: 2rem auto;
  height: 3.75rem;
  width: 100%;
  
  ${theme.mediaQueries.small} {
    margin: 3.875rem auto 1.25rem;
    flex-flow: row;
    height: 1.25rem;
    justify-content: space-between;

    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-columns: 25rem 20rem;
  }
  
  ${theme.mediaQueries.medium} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-columns: 30rem 30rem;
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

export const PillContainerWrapper = styled(Row)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 1rem 1.25rem;
  width: 100%;
  margin-bottom: 4rem;

  ${theme.mediaQueries.small} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-columns: 11rem 30rem;
  }

  .category {
    background-color: #95bc3b;
    color: #ffffff;
    border-radius: 0.125rem;
    padding: 0.1rem 0.45rem;
    text-transform: uppercase;
    font-size: 0.875rem;
    line-height: 1.3125rem;
    text-align: left;
    margin-right: 0.5rem;
  }

  .topic {
    background-color: #333333;
    color: #ffffff;
    border-radius: 0.125rem;
    padding: 0.1rem 0.45rem;
    text-transform: uppercase;
    font-size: 0.875rem;
    line-height: 1.3125rem;
    text-align: left;
    margin-right: 0.5rem;

    ${theme.mediaQueries.small} {
      white-space: nowrap;
    }
  }
`;
