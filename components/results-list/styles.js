import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

export const ListWrapper = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 22.5rem;
  border: solid 0.0625rem ${theme.colors.grey};
  border-top: none;
  padding: 0.9375rem 1.875rem;
  background-color: ${theme.colors.white};
  overflow-y: scroll;

  ${theme.mediaQueries.small} {
    padding: 1.5625rem 2.5rem;
  }
`;

export const ListItem = styled.li`
  width: 100%;

  button {
    color: ${theme.colors.grey};
    padding: 1.25rem 0;
    width: 100%;
    display: block;
    font-size: 1.375rem;
    text-align: left;

    &:hover {
      color: ${theme.colors.darkGrey};
    }

    ${({ selected }) =>
      selected &&
      `
      color: ${theme.colors.darkestGrey};
    `}
  }

  b {
    color: ${theme.colors.darkestGrey};
  }
`;

export const Divider = styled.div`
  width: 4.0625rem;
  height: 0.125rem;
  background-color: ${theme.colors.lightGrey};
  margin: 0.9375rem 0;
`;
