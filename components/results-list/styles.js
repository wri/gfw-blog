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
  padding: 0 1rem;
  background-color: ${theme.colors.white};
  overflow-y: scroll;

  ${theme.mediaQueries.small} {
    padding: 0 1rem;
  }
`;

export const ListItem = styled.li`
  width: 100%;

  button {
    color: ${theme.colors.grey};
    padding: 0.75rem 0;
    width: 100%;
    display: block;
    font-size: 1rem;
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
