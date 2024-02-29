import styled from '@emotion/styled';
import { theme, Row } from '@worldresources/gfw-components';

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
  padding: 0 1rem;
  width: 100%;

  ${theme.mediaQueries.small} {
    margin: 3.875rem auto;
    flex-flow: row;
    height: 1.25rem;
    justify-content: space-between;

    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-columns: 30rem 30rem;
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

export const PillContainerWrapper = styled(Row)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 1rem 2rem;
  width: 100%;

  ${theme.mediaQueries.small} {
    padding-left: 2.4rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-columns: 12rem 30rem;
  }

  .category {
    padding: 0.25rem;
    background-color: #95bc3b;
    color: #ffffff;
    border-radius: 0.125rem;
    padding: 0.1rem 0.45rem;
    text-transform: uppercase;
    font-size: 0.875rem;
    line-height: 1.3125rem;
    font-weight: 500;
    text-align: left;
    margin-right: 0.5rem;
  }

  .topic {
    padding: 0.25rem;
    background-color: #333333;
    color: #ffffff;
    border-radius: 0.125rem;
    padding: 0.1rem 0.45rem;
    text-transform: uppercase;
    font-size: 0.875rem;
    line-height: 1.3125rem;
    font-weight: 500;
    text-align: left;
    margin-right: 0.5rem;
  }
`;
